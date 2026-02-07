import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const scheduleReelSchema = z.object({
  reelId: z.string().min(1, 'Reel ID is required'),
  scheduledFor: z.string().datetime('Invalid datetime format'),
  platform: z.enum(['INSTAGRAM', 'FACEBOOK', 'BOTH']).default('INSTAGRAM'),
  timezone: z.string().default('UTC'),
  options: z.object({
    autoOptimize: z.boolean().default(true),
    crossPost: z.boolean().default(false),
    notifyOnPost: z.boolean().default(true)
  }).optional()
})

// Optimal posting times by platform and timezone
const getOptimalPostingTimes = (platform: string, timezone: string) => {
  // This would typically use AI to analyze the user's audience data
  // For now, returning general optimal times
  const baseTimes = {
    INSTAGRAM: [
      { hour: 9, minute: 0 },   // 9 AM
      { hour: 12, minute: 30 }, // 12:30 PM
      { hour: 18, minute: 0 },  // 6 PM
      { hour: 21, minute: 0 }   // 9 PM
    ],
    FACEBOOK: [
      { hour: 9, minute: 0 },   // 9 AM
      { hour: 15, minute: 0 },  // 3 PM
      { hour: 19, minute: 0 }   // 7 PM
    ]
  }
  
  return baseTimes[platform as keyof typeof baseTimes] || baseTimes.INSTAGRAM
}

// Schedule a reel for posting
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = scheduleReelSchema.parse(body)

    // Get the reel from database
    const reel = await db.reel.findUnique({
      where: { id: validatedData.reelId },
      include: {
        user: {
          include: {
            subscription: true,
            socialAccounts: true
          }
        }
      }
    })

    if (!reel) {
      return NextResponse.json(
        { error: 'Reel not found' },
        { status: 404 }
      )
    }

    // Check if user has auto-posting in their subscription
    if (!reel.user.subscription?.autoPosting) {
      return NextResponse.json(
        { error: 'Auto-posting is not included in your subscription plan' },
        { status: 403 }
      )
    }

    // Check if social account is connected
    const socialAccount = reel.user.socialAccounts.find(
      account => account.platform === validatedData.platform || 
                (validatedData.platform === 'BOTH' && ['INSTAGRAM', 'FACEBOOK'].includes(account.platform))
    )

    if (!socialAccount) {
      return NextResponse.json(
        { error: `No ${validatedData.platform} account connected. Please connect your social account first.` },
        { status: 400 }
      )
    }

    // Validate scheduled time is in the future
    const scheduledTime = new Date(validatedData.scheduledFor)
    const now = new Date()
    
    if (scheduledTime <= now) {
      return NextResponse.json(
        { error: 'Scheduled time must be in the future' },
        { status: 400 }
      )
    }

    // Auto-optimize scheduling time if requested
    let finalScheduledTime = scheduledTime
    if (validatedData.options?.autoOptimize) {
      const optimalTimes = getOptimalPostingTimes(validatedData.platform, validatedData.timezone)
      const scheduledHour = scheduledTime.getHours()
      const scheduledMinute = scheduledTime.getMinutes()
      
      // Find closest optimal time
      const closestOptimal = optimalTimes.reduce((closest, current) => {
        const currentDiff = Math.abs(current.hour - scheduledHour) * 60 + Math.abs(current.minute - scheduledMinute)
        const closestDiff = Math.abs(closest.hour - scheduledHour) * 60 + Math.abs(closest.minute - scheduledMinute)
        return currentDiff < closestDiff ? current : closest
      })
      
      // Update scheduled time to optimal time on the same date
      finalScheduledTime = new Date(scheduledTime)
      finalScheduledTime.setHours(closestOptimal.hour, closestOptimal.minute, 0, 0)
    }

    // Update reel with scheduling information
    const updatedReel = await db.reel.update({
      where: { id: validatedData.reelId },
      data: {
        status: 'SCHEDULED',
        scheduledFor: finalScheduledTime
      }
    })

    // Create scheduling task (in a real implementation, this would add to a queue)
    const schedulingTask = {
      id: `task_${Date.now()}`,
      reelId: validatedData.reelId,
      userId: reel.userId,
      platform: validatedData.platform,
      scheduledFor: finalScheduledTime,
      status: 'scheduled',
      createdAt: new Date(),
      options: validatedData.options
    }

    // In a real implementation, you would:
    // 1. Add this to a job queue (like BullMQ or Agenda)
    // 2. Set up a cron job or scheduler
    // 3. Configure webhooks for platform APIs

    return NextResponse.json({
      success: true,
      reel: updatedReel,
      schedulingTask,
      scheduledFor: finalScheduledTime,
      message: validatedData.options?.autoOptimize 
        ? `Reel scheduled for optimal time: ${finalScheduledTime.toLocaleString()}`
        : `Reel scheduled for: ${finalScheduledTime.toLocaleString()}`
    })

  } catch (error) {
    console.error('Scheduling error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to schedule reel' },
      { status: 500 }
    )
  }
}

// Get scheduled reels
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status') // 'scheduled', 'posted', 'failed'

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const whereClause: any = { userId }
    if (status) {
      whereClause.status = status.toUpperCase()
    }

    const scheduledReels = await db.reel.findMany({
      where: whereClause,
      include: {
        contentBatch: true
      },
      orderBy: [
        { scheduledFor: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    // Get upcoming schedule for the next 7 days
    const now = new Date()
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    
    const upcomingReels = scheduledReels.filter(reel => 
      reel.scheduledFor && 
      new Date(reel.scheduledFor) >= now && 
      new Date(reel.scheduledFor) <= weekFromNow
    )

    // Schedule analytics
    const scheduleAnalytics = {
      totalScheduled: scheduledReels.filter(r => r.status === 'SCHEDULED').length,
      totalPosted: scheduledReels.filter(r => r.status === 'POSTED').length,
      totalFailed: scheduledReels.filter(r => r.status === 'FAILED').length,
      upcomingThisWeek: upcomingReels.length,
      nextScheduledPost: scheduledReels
        .filter(r => r.status === 'SCHEDULED' && r.scheduledFor)
        .sort((a, b) => new Date(a.scheduledFor!).getTime() - new Date(b.scheduledFor!).getTime())[0]
    }

    return NextResponse.json({
      success: true,
      scheduledReels,
      upcomingReels,
      analytics: scheduleAnalytics
    })

  } catch (error) {
    console.error('Schedule retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve scheduled reels' },
      { status: 500 }
    )
  }
}

// Update or cancel scheduled reel
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { reelId, action, newScheduledTime } = body

    if (!reelId) {
      return NextResponse.json(
        { error: 'Reel ID is required' },
        { status: 400 }
      )
    }

    let updateData: any = {}

    switch (action) {
      case 'reschedule':
        if (!newScheduledTime) {
          return NextResponse.json(
            { error: 'New scheduled time is required for rescheduling' },
            { status: 400 }
          )
        }
        updateData = {
          scheduledFor: new Date(newScheduledTime),
          status: 'SCHEDULED'
        }
        break

      case 'cancel':
        updateData = {
          scheduledFor: null,
          status: 'DRAFT'
        }
        break

      case 'post_now':
        updateData = {
          scheduledFor: new Date(),
          status: 'POSTED',
          postedAt: new Date()
        }
        break

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    const updatedReel = await db.reel.update({
      where: { id: reelId },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      reel: updatedReel,
      message: `Reel ${action}d successfully`
    })

  } catch (error) {
    console.error('Schedule update error:', error)
    return NextResponse.json(
      { error: 'Failed to update schedule' },
      { status: 500 }
    )
  }
}