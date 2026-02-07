import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const analyticsQuerySchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  dateRange: z.enum(['7d', '30d', '90d', '1y']).default('30d'),
  metrics: z.array(z.enum(['views', 'likes', 'comments', 'shares', 'saves', 'engagement', 'reach'])).default(['views', 'likes', 'comments']),
  granularity: z.enum(['hour', 'day', 'week', 'month']).default('day')
})

// Calculate date range based on period
const getDateRange = (period: string) => {
  const now = new Date()
  const startDate = new Date()
  
  switch (period) {
    case '7d':
      startDate.setDate(now.getDate() - 7)
      break
    case '30d':
      startDate.setDate(now.getDate() - 30)
      break
    case '90d':
      startDate.setDate(now.getDate() - 90)
      break
    case '1y':
      startDate.setFullYear(now.getFullYear() - 1)
      break
    default:
      startDate.setDate(now.getDate() - 30)
  }
  
  return { startDate, endDate: now }
}

// Generate time series data points
const generateTimeSeriesData = (startDate: Date, endDate: Date, granularity: string) => {
  const data = []
  const current = new Date(startDate)
  
  while (current <= endDate) {
    data.push({
      date: new Date(current),
      views: Math.floor(Math.random() * 1000) + 500,
      likes: Math.floor(Math.random() * 100) + 20,
      comments: Math.floor(Math.random() * 30) + 5,
      shares: Math.floor(Math.random() * 20) + 2,
      saves: Math.floor(Math.random() * 50) + 10,
      reach: Math.floor(Math.random() * 2000) + 1000
    })
    
    // Increment based on granularity
    switch (granularity) {
      case 'hour':
        current.setHours(current.getHours() + 1)
        break
      case 'day':
        current.setDate(current.getDate() + 1)
        break
      case 'week':
        current.setDate(current.getDate() + 7)
        break
      case 'month':
        current.setMonth(current.getMonth() + 1)
        break
    }
  }
  
  return data
}

// Calculate aggregate metrics
const calculateAggregates = (data: any[], metrics: string[]) => {
  const aggregates: any = {}
  
  metrics.forEach(metric => {
    const values = data.map(d => d[metric] || 0)
    aggregates[metric] = {
      total: values.reduce((sum, val) => sum + val, 0),
      average: Math.round(values.reduce((sum, val) => sum + val, 0) / values.length),
      min: Math.min(...values),
      max: Math.max(...values)
    }
  })
  
  // Calculate engagement rate
  if (metrics.includes('engagement') || metrics.includes('views')) {
    const totalViews = aggregates.views?.total || 0
    const totalEngagements = (aggregates.likes?.total || 0) + 
                            (aggregates.comments?.total || 0) + 
                            (aggregates.shares?.total || 0) + 
                            (aggregates.saves?.total || 0)
    
    aggregates.engagement = {
      rate: totalViews > 0 ? Number(((totalEngagements / totalViews) * 100).toFixed(2)) : 0,
      total: totalEngagements
    }
  }
  
  return aggregates
}

// Get top performing content
const getTopPerformingContent = async (userId: string, limit: number = 10) => {
  const topReels = await db.reel.findMany({
    where: { userId },
    orderBy: { views: 'desc' },
    take: limit,
    select: {
      id: true,
      title: true,
      views: true,
      likes: true,
      comments: true,
      shares: true,
      saves: true,
      postedAt: true,
      category: true,
      hashtags: true
    }
  })
  
  return topReels.map(reel => ({
    ...reel,
    engagementRate: reel.views > 0 ? 
      Number((((reel.likes + reel.comments + reel.shares + reel.saves) / reel.views) * 100).toFixed(2)) : 0
  }))
}

// Get audience demographics and insights
const getAudienceInsights = async (userId: string) => {
  // Mock data - in a real implementation, this would come from social media APIs
  return {
    demographics: {
      age: {
        '18-24': 15,
        '25-34': 35,
        '35-44': 30,
        '45-54': 15,
        '55+': 5
      },
      gender: {
        'male': 45,
        'female': 52,
        'other': 3
      },
      location: {
        'United States': 40,
        'United Kingdom': 15,
        'Canada': 10,
        'Australia': 8,
        'India': 7,
        'Other': 20
      }
    },
    engagement: {
      bestTime: '18:00',
      bestDay: 'Wednesday',
      avgWatchTime: '12.5s',
      completionRate: 68
    },
    growth: {
      followersGained: 245,
      followerGrowthRate: 12.5,
      reachGrowthRate: 18.2,
      engagementGrowthRate: 8.7
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = analyticsQuerySchema.parse(body)
    
    const { startDate, endDate } = getDateRange(validatedData.dateRange)
    
    // Generate time series data
    const timeSeriesData = generateTimeSeriesData(startDate, endDate, validatedData.granularity)
    
    // Calculate aggregates
    const aggregates = calculateAggregates(timeSeriesData, validatedData.metrics)
    
    // Get top performing content
    const topContent = await getTopPerformingContent(validatedData.userId)
    
    // Get audience insights
    const audienceInsights = await getAudienceInsights(validatedData.userId)
    
    // Get content category performance
    const categoryPerformance = await db.reel.groupBy({
      by: ['category'],
      where: { 
        userId: validatedData.userId,
        postedAt: { gte: startDate }
      },
      _sum: {
        views: true,
        likes: true,
        comments: true,
        shares: true,
        saves: true
      },
      _count: { id: true }
    })
    
    // Calculate performance by category
    const categoryStats = categoryPerformance.map(cat => {
      const totalViews = cat._sum.views || 0
      const totalEngagements = (cat._sum.likes || 0) + (cat._sum.comments || 0) + 
                              (cat._sum.shares || 0) + (cat._sum.saves || 0)
      
      return {
        category: cat.category,
        reelsCount: cat._count.id,
        views: totalViews,
        likes: cat._sum.likes || 0,
        comments: cat._sum.comments || 0,
        shares: cat._sum.shares || 0,
        saves: cat._sum.saves || 0,
        engagementRate: totalViews > 0 ? Number((totalEngagements / totalViews * 100).toFixed(2)) : 0
      }
    })
    
    return NextResponse.json({
      success: true,
      dateRange: { startDate, endDate },
      granularity: validatedData.granularity,
      timeSeries: timeSeriesData,
      aggregates,
      topContent,
      categoryStats,
      audienceInsights,
      summary: {
        totalReels: topContent.length,
        totalViews: aggregates.views?.total || 0,
        avgEngagementRate: aggregates.engagement?.rate || 0,
        bestPerformingCategory: categoryStats.reduce((best, current) => 
          current.engagementRate > best.engagementRate ? current : best
        , categoryStats[0])?.category || 'N/A'
      }
    })
    
  } catch (error) {
    console.error('Analytics error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

// Get quick stats for dashboard
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }
    
    // Get user's reel statistics
    const userStats = await db.reel.aggregate({
      where: { userId },
      _sum: {
        views: true,
        likes: true,
        comments: true,
        shares: true,
        saves: true
      },
      _count: { id: true },
      where: { 
        userId,
        status: 'POSTED'
      }
    })
    
    // Get recent performance (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const recentStats = await db.reel.aggregate({
      where: { 
        userId,
        postedAt: { gte: sevenDaysAgo },
        status: 'POSTED'
      },
      _sum: {
        views: true,
        likes: true,
        comments: true,
        shares: true,
        saves: true
      },
      _count: { id: true }
    })
    
    // Calculate engagement rates
    const totalViews = userStats._sum.views || 0
    const totalEngagements = (userStats._sum.likes || 0) + (userStats._sum.comments || 0) + 
                            (userStats._sum.shares || 0) + (userStats._sum.saves || 0)
    const recentViews = recentStats._sum.views || 0
    const recentEngagements = (recentStats._sum.likes || 0) + (recentStats._sum.comments || 0) + 
                             (recentStats._sum.shares || 0) + (recentStats._sum.saves || 0)
    
    return NextResponse.json({
      success: true,
      quickStats: {
        totalReels: userStats._count.id,
        totalViews: totalViews,
        totalLikes: userStats._sum.likes || 0,
        totalComments: userStats._sum.comments || 0,
        totalShares: userStats._sum.shares || 0,
        totalSaves: userStats._sum.saves || 0,
        overallEngagementRate: totalViews > 0 ? Number((totalEngagements / totalViews * 100).toFixed(2)) : 0
      },
      recentPerformance: {
        reelsPosted: recentStats._count.id,
        views: recentViews,
        likes: recentStats._sum.likes || 0,
        comments: recentStats._sum.comments || 0,
        shares: recentStats._sum.shares || 0,
        saves: recentStats._sum.saves || 0,
        engagementRate: recentViews > 0 ? Number((recentEngagements / recentViews * 100).toFixed(2)) : 0
      }
    })
    
  } catch (error) {
    console.error('Quick stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quick stats' },
      { status: 500 }
    )
  }
}