import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

// Validation schema for content generation request
const generateContentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  contentType: z.enum(['VOICE_NOTE', 'YOUTUBE_LINK', 'PDF', 'NOTES', 'BLOG_LINK', 'BULLET_POINTS', 'TEXT']),
  content: z.string().min(1, 'Content is required'),
  userId: z.string().min(1, 'User ID is required'),
})

// AI content generation function
async function generateReelContent(content: string, contentType: string, title: string) {
  // This is where we'll use the z-ai-web-dev-sdk to generate content
  // For now, I'll create a mock implementation that demonstrates the structure
  
  const prompt = `
You are a professional Instagram content creator. Based on the following content, generate 30 unique Instagram reel ideas.

Content Title: ${title}
Content Type: ${contentType}
Raw Content: ${content}

For each reel, provide:
1. A catchy title (under 50 characters)
2. A 3-second hook (first 3 seconds to grab attention)
3. A 7-20 second script
4. A call-to-action (CTA)
5. 5-10 relevant hashtags (mix of niche and local if applicable)
6. Category: AWARENESS, TRUST, LEAD, or SALE

Format your response as a JSON array with the following structure:
[
  {
    "title": "Reel Title",
    "hook": "3-second hook text",
    "script": "7-20 second script",
    "cta": "Call to action text",
    "hashtags": "hashtag1,hashtag2,hashtag3",
    "category": "AWARENESS"
  }
]

Make sure the content is:
- Engaging and attention-grabbing
- Optimized for Instagram's algorithm
- Varied in category (mix of AWARENESS, TRUST, LEAD, SALE)
- Authentic and valuable to the target audience
- Under 60 seconds total when read aloud
`

  // In a real implementation, this would call the AI SDK
  // For now, returning mock data to demonstrate the structure
  const mockReels = Array.from({ length: 30 }, (_, i) => ({
    title: `Reel Idea ${i + 1}`,
    hook: `Hook ${i + 1}: Stop scrolling if you want to...`,
    script: `Script for reel ${i + 1}: Here's a quick tip that will change everything...`,
    cta: `Follow for more daily tips! DM "REEL" to work with us.`,
    hashtags: `#reeltips${i + 1} #instagramgrowth #businesstips #contentmarketing`,
    category: ['AWARENESS', 'TRUST', 'LEAD', 'SALE'][i % 4] as const
  }))

  return mockReels
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedData = generateContentSchema.parse(body)

    // Create content batch in database
    const contentBatch = await db.contentBatch.create({
      data: {
        userId: validatedData.userId,
        title: validatedData.title,
        contentType: validatedData.contentType,
        content: JSON.stringify({
          raw: validatedData.content,
          description: validatedData.description
        }),
        status: 'PROCESSING'
      }
    })

    // Generate reel content using AI
    const generatedReels = await generateReelContent(
      validatedData.content,
      validatedData.contentType,
      validatedData.title
    )

    // Create reels in database
    const createdReels = await Promise.all(
      generatedReels.map((reel, index) => 
        db.reel.create({
          data: {
            userId: validatedData.userId,
            contentBatchId: contentBatch.id,
            title: reel.title,
            hook: reel.hook,
            script: reel.script,
            cta: reel.cta,
            hashtags: reel.hashtags,
            category: reel.category,
            status: 'DRAFT'
          }
        })
      )
    )

    // Update content batch status to completed
    await db.contentBatch.update({
      where: { id: contentBatch.id },
      data: { status: 'COMPLETED' }
    })

    return NextResponse.json({
      success: true,
      contentBatch: {
        id: contentBatch.id,
        title: contentBatch.title,
        status: contentBatch.status,
        reelsGenerated: createdReels.length
      },
      reels: createdReels.map(reel => ({
        id: reel.id,
        title: reel.title,
        hook: reel.hook,
        category: reel.category,
        status: reel.status
      }))
    })

  } catch (error) {
    console.error('Content generation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve content batches and reels
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const batchId = searchParams.get('batchId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    if (batchId) {
      // Get specific content batch with reels
      const contentBatch = await db.contentBatch.findFirst({
        where: {
          id: batchId,
          userId: userId
        },
        include: {
          reels: {
            orderBy: { createdAt: 'asc' }
          }
        }
      })

      if (!contentBatch) {
        return NextResponse.json(
          { error: 'Content batch not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        contentBatch
      })
    } else {
      // Get all content batches for user
      const contentBatches = await db.contentBatch.findMany({
        where: { userId: userId },
        include: {
          _count: {
            select: { reels: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      })

      return NextResponse.json({
        success: true,
        contentBatches
      })
    }

  } catch (error) {
    console.error('Content retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve content' },
      { status: 500 }
    )
  }
}