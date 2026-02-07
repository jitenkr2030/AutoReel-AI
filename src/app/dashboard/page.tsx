'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Video, 
  Upload, 
  Calendar, 
  BarChart3, 
  Settings, 
  Users, 
  Play,
  Clock,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  Plus,
  Zap,
  Target,
  CheckCircle,
  AlertCircle,
  FileText,
  Mic,
  Link as LinkIcon,
  MoreHorizontal
} from 'lucide-react'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const stats = {
    totalReels: 45,
    scheduledThisWeek: 7,
    monthlyViews: 12500,
    engagementRate: 4.2
  }

  const recentReels = [
    {
      id: 1,
      title: "5 Tips for Perfect Gym Form",
      status: "posted",
      scheduledFor: new Date().toISOString(),
      views: 1250,
      likes: 89,
      comments: 12,
      thumbnail: "/api/placeholder/200/350"
    },
    {
      id: 2,
      title: "Client Success Story - Sarah",
      status: "scheduled",
      scheduledFor: new Date(Date.now() + 86400000).toISOString(),
      views: 0,
      likes: 0,
      comments: 0,
      thumbnail: "/api/placeholder/200/350"
    },
    {
      id: 3,
      title: "Myth vs Fact: Cardio",
      status: "generating",
      scheduledFor: null,
      views: 0,
      likes: 0,
      comments: 0,
      thumbnail: "/api/placeholder/200/350"
    }
  ]

  const contentBatches = [
    {
      id: 1,
      title: "December Fitness Content",
      type: "VOICE_NOTE",
      status: "completed",
      reelsGenerated: 30,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Q1 Business Tips",
      type: "BULLET_POINTS",
      status: "processing",
      reelsGenerated: 15,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dashboard Navigation */}
      <nav className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Video className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">AutoReel AI</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <Button variant="ghost" size="sm">Dashboard</Button>
                <Button variant="ghost" size="sm">Content</Button>
                <Button variant="ghost" size="sm">Reels</Button>
                <Button variant="ghost" size="sm">Analytics</Button>
                <Button variant="ghost" size="sm">Settings</Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="hidden md:flex">
                Growth Plan
              </Badge>
              <Button variant="outline" size="sm">
                Upgrade
              </Button>
              <div className="w-8 h-8 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah! 👋</h1>
          <p className="text-slate-600">Your Instagram automation is running smoothly</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Reels</p>
                  <p className="text-2xl font-bold">{stats.totalReels}</p>
                </div>
                <Video className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Scheduled This Week</p>
                  <p className="text-2xl font-bold">{stats.scheduledThisWeek}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Monthly Views</p>
                  <p className="text-2xl font-bold">{stats.monthlyViews.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Engagement Rate</p>
                  <p className="text-2xl font-bold">{stats.engagementRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="reels">Reels</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with creating new content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/upload">
                    <Button className="h-20 flex-col gap-2 w-full" variant="outline">
                      <Upload className="h-6 w-6" />
                      <span>Upload Content</span>
                    </Button>
                  </Link>
                  <Button className="h-20 flex-col gap-2" variant="outline">
                    <Plus className="h-6 w-6" />
                    <span>Create New Batch</span>
                  </Button>
                  <Button className="h-20 flex-col gap-2" variant="outline">
                    <Calendar className="h-6 w-6" />
                    <span>View Schedule</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reels */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Reels</CardTitle>
                  <CardDescription>Your latest Instagram content</CardDescription>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentReels.map((reel) => (
                    <Card key={reel.id} className="overflow-hidden">
                      <div className="aspect-[9/16] bg-slate-200 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-12 w-12 text-white/80" />
                        </div>
                        <Badge 
                          className={`absolute top-2 right-2 ${
                            reel.status === 'posted' ? 'bg-green-500' :
                            reel.status === 'scheduled' ? 'bg-blue-500' :
                            'bg-orange-500'
                          }`}
                        >
                          {reel.status}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-medium text-sm mb-2 line-clamp-2">{reel.title}</h4>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {reel.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {reel.likes}
                            </span>
                          </div>
                          <MoreHorizontal className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            {/* Content Batches */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Content Batches</CardTitle>
                  <CardDescription>Manage your content sources and generation</CardDescription>
                </div>
                <Link href="/upload">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Batch
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentBatches.map((batch) => (
                    <Card key={batch.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            {batch.type === 'VOICE_NOTE' && <Mic className="h-6 w-6 text-primary" />}
                            {batch.type === 'BULLET_POINTS' && <FileText className="h-6 w-6 text-primary" />}
                            {batch.type === 'YOUTUBE_LINK' && <LinkIcon className="h-6 w-6 text-primary" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{batch.title}</h4>
                            <p className="text-sm text-slate-500">
                              {batch.reelsGenerated} of 30 reels generated
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <Badge 
                              variant={batch.status === 'completed' ? 'default' : 'secondary'}
                            >
                              {batch.status}
                            </Badge>
                            <p className="text-xs text-slate-500 mt-1">
                              Created {new Date(batch.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                      {batch.status === 'processing' && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Generating reels...</span>
                            <span>{Math.round((batch.reelsGenerated / 30) * 100)}%</span>
                          </div>
                          <Progress value={(batch.reelsGenerated / 30) * 100} />
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Upload New Content</CardTitle>
                <CardDescription>Start with any type of content - we'll handle the rest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <Mic className="h-8 w-8" />
                    <span className="text-sm">Voice Note</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <LinkIcon className="h-8 w-8" />
                    <span className="text-sm">YouTube Link</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <FileText className="h-8 w-8" />
                    <span className="text-sm">PDF/Notes</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <FileText className="h-8 w-8" />
                    <span className="text-sm">Bullet Points</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reels" className="space-y-6">
            {/* Reels Management */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Reels</CardTitle>
                  <CardDescription>Manage and schedule your Instagram reels</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Export</Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Reel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReels.map((reel) => (
                    <div key={reel.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-200 rounded"></div>
                        <div>
                          <h4 className="font-medium">{reel.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {reel.status === 'posted' ? 'Posted' : 
                               reel.status === 'scheduled' ? `Scheduled for ${new Date(reel.scheduledFor!).toLocaleDateString()}` :
                               'Generating...'}
                            </span>
                            {reel.status === 'posted' && (
                              <>
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {reel.views}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="h-3 w-3" />
                                  {reel.likes}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={reel.status === 'posted' ? 'default' : 'secondary'}>
                          {reel.status}
                        </Badge>
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Views</span>
                      <span className="font-medium">12.5K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Engagement Rate</span>
                      <span className="font-medium">4.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Reach</span>
                      <span className="font-medium">850</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Best Performing</span>
                      <span className="font-medium">Gym Tips #3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Categories</CardTitle>
                  <CardDescription>Distribution by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Awareness</span>
                      </div>
                      <span className="font-medium">40%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Trust</span>
                      </div>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">Lead</span>
                      </div>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Sale</span>
                      </div>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}