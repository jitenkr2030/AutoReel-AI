'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  Save,
  Users,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  PlayCircle,
  Clock,
  Target,
  PieChart,
  Activity,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'
import { format, subDays } from 'date-fns'

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState('30d')
  const [isLoading, setIsLoading] = useState(false)
  
  // Mock analytics data
  const [analytics, setAnalytics] = useState({
    overview: {
      totalReels: 45,
      totalViews: 12500,
      totalLikes: 890,
      totalComments: 156,
      totalShares: 78,
      totalSaves: 234,
      engagementRate: 4.2,
      avgWatchTime: 12.5,
      completionRate: 68
    },
    growth: {
      followersGained: 245,
      followerGrowthRate: 12.5,
      reachGrowthRate: 18.2,
      engagementGrowthRate: 8.7
    },
    topContent: [
      {
        id: '1',
        title: '5 Tips for Perfect Gym Form',
        views: 1250,
        likes: 89,
        comments: 12,
        shares: 8,
        saves: 23,
        engagementRate: 10.4,
        postedAt: subDays(new Date(), 5)
      },
      {
        id: '2',
        title: 'Client Success Story - Sarah',
        views: 980,
        likes: 76,
        comments: 18,
        shares: 12,
        saves: 31,
        engagementRate: 13.8,
        postedAt: subDays(new Date(), 8)
      },
      {
        id: '3',
        title: 'Myth vs Fact: Cardio',
        views: 850,
        likes: 92,
        comments: 24,
        shares: 15,
        saves: 28,
        engagementRate: 18.2,
        postedAt: subDays(new Date(), 12)
      }
    ],
    categoryStats: [
      { category: 'AWARENESS', reelsCount: 15, views: 4500, engagementRate: 3.8 },
      { category: 'TRUST', reelsCount: 12, views: 3800, engagementRate: 5.2 },
      { category: 'LEAD', reelsCount: 10, views: 2800, engagementRate: 6.1 },
      { category: 'SALE', reelsCount: 8, views: 1400, engagementRate: 8.9 }
    ],
    audienceInsights: {
      demographics: {
        age: { '18-24': 15, '25-34': 35, '35-44': 30, '45-54': 15, '55+': 5 },
        gender: { 'male': 45, 'female': 52, 'other': 3 },
        location: { 'United States': 40, 'United Kingdom': 15, 'Canada': 10, 'Australia': 8, 'India': 7, 'Other': 20 }
      },
      bestTime: '18:00',
      bestDay: 'Wednesday',
      avgWatchTime: '12.5s'
    }
  })

  const [timeSeriesData] = useState([
    { date: subDays(new Date(), 29), views: 320, likes: 28, comments: 5, engagement: 10.2 },
    { date: subDays(new Date(), 28), views: 380, likes: 32, comments: 7, engagement: 10.3 },
    { date: subDays(new Date(), 27), views: 420, likes: 38, comments: 8, engagement: 10.9 },
    { date: subDays(new Date(), 26), views: 390, likes: 35, comments: 6, engagement: 10.5 },
    { date: subDays(new Date(), 25), views: 450, likes: 42, comments: 9, engagement: 11.3 },
    { date: subDays(new Date(), 24), views: 480, likes: 45, comments: 10, engagement: 11.5 },
    { date: subDays(new Date(), 23), views: 520, likes: 48, comments: 11, engagement: 11.4 },
    { date: subDays(new Date(), 22), views: 490, likes: 46, comments: 9, engagement: 11.2 },
    { date: subDays(new Date(), 21), views: 550, likes: 52, comments: 12, engagement: 11.8 },
    { date: subDays(new Date(), 20), views: 580, likes: 55, comments: 13, engagement: 11.9 },
    { date: subDays(new Date(), 19), views: 620, likes: 58, comments: 14, engagement: 11.6 },
    { date: subDays(new Date(), 18), views: 590, likes: 56, comments: 12, engagement: 11.5 },
    { date: subDays(new Date(), 17), views: 650, likes: 62, comments: 15, engagement: 11.8 },
    { date: subDays(new Date(), 16), views: 680, likes: 65, comments: 16, engagement: 12.1 },
    { date: subDays(new Date(), 15), views: 720, likes: 68, comments: 17, engagement: 12.2 }
  ])

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <ArrowUp className="h-4 w-4 text-green-500" />
    if (current < previous) return <ArrowDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
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
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <div className="w-8 h-8 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-slate-600">Track your performance and grow your audience</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Views</p>
                      <p className="text-2xl font-bold">{formatNumber(analytics.overview.totalViews)}</p>
                      <div className="flex items-center gap-1 text-xs">
                        {getTrendIcon(520, 480)}
                        <span className="text-green-600">+8.3%</span>
                      </div>
                    </div>
                    <Eye className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Engagement Rate</p>
                      <p className="text-2xl font-bold">{analytics.overview.engagementRate}%</p>
                      <div className="flex items-center gap-1 text-xs">
                        {getTrendIcon(4.2, 3.8)}
                        <span className="text-green-600">+10.5%</span>
                      </div>
                    </div>
                    <Heart className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Reels</p>
                      <p className="text-2xl font-bold">{analytics.overview.totalReels}</p>
                      <div className="flex items-center gap-1 text-xs">
                        {getTrendIcon(45, 38)}
                        <span className="text-green-600">+18.4%</span>
                      </div>
                    </div>
                    <PlayCircle className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Avg. Watch Time</p>
                      <p className="text-2xl font-bold">{analytics.overview.avgWatchTime}s</p>
                      <div className="flex items-center gap-1 text-xs">
                        {getTrendIcon(12.5, 11.2)}
                        <span className="text-green-600">+11.6%</span>
                      </div>
                    </div>
                    <Clock className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
                <CardDescription>Daily views and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-slate-500">
                  <BarChart3 className="h-12 w-12" />
                  <span className="ml-2">Performance Chart Placeholder</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            {/* Top Performing Content */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
                <CardDescription>Your best reels based on engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topContent.map((content, index) => (
                    <div key={content.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-slate-400">#{index + 1}</div>
                      <div className="w-16 h-16 bg-slate-200 rounded"></div>
                      <div className="flex-1">
                        <h4 className="font-medium">{content.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {formatNumber(content.views)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {content.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {content.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="h-3 w-3" />
                            {content.shares}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">
                          {content.engagementRate}% engagement
                        </Badge>
                        <p className="text-xs text-slate-500">
                          {format(content.postedAt, 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Categories */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance by Category</CardTitle>
                  <CardDescription>How different content types perform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.categoryStats.map((category) => (
                      <div key={category.category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{category.category}</span>
                          <span className="text-sm text-slate-500">{category.engagementRate}%</span>
                        </div>
                        <Progress value={category.engagementRate * 10} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{category.reelsCount} reels</span>
                          <span>{formatNumber(category.views)} views</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Distribution</CardTitle>
                  <CardDescription>Breakdown of your content strategy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-slate-500">
                    <PieChart className="h-12 w-12" />
                    <span className="ml-2">Content Distribution Chart</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Age Demographics */}
              <Card>
                <CardHeader>
                  <CardTitle>Age Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.audienceInsights.demographics.age).map(([age, percentage]) => (
                      <div key={age} className="flex items-center justify-between">
                        <span className="text-sm">{age}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-slate-500 w-8">{percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Gender Demographics */}
              <Card>
                <CardHeader>
                  <CardTitle>Gender Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.audienceInsights.demographics.gender).map(([gender, percentage]) => (
                      <div key={gender} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{gender}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-slate-500 w-8">{percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Locations */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.audienceInsights.demographics.location)
                      .slice(0, 5)
                      .map(([location, percentage]) => (
                        <div key={location} className="flex items-center justify-between">
                          <span className="text-sm">{location}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-slate-500 w-8">{percentage}%</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Audience Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Audience Insights</CardTitle>
                <CardDescription>Key metrics about your audience behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Best Time to Post</h4>
                    <p className="text-2xl font-bold text-blue-600">{analytics.audienceInsights.bestTime}</p>
                    <p className="text-sm text-slate-500">On {analytics.audienceInsights.bestDay}s</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PlayCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Avg. Watch Time</h4>
                    <p className="text-2xl font-bold text-green-600">{analytics.audienceInsights.avgWatchTime}</p>
                    <p className="text-sm text-slate-500">Per reel</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Completion Rate</h4>
                    <p className="text-2xl font-bold text-purple-600">{analytics.overview.completionRate}%</p>
                    <p className="text-sm text-slate-500">Watch full reel</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="growth" className="space-y-6">
            {/* Growth Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Followers Gained</p>
                      <p className="text-2xl font-bold">{analytics.growth.followersGained}</p>
                      <p className="text-xs text-green-600">+{analytics.growth.followerGrowthRate}% this month</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Reach Growth</p>
                      <p className="text-2xl font-bold">{analytics.growth.reachGrowthRate}%</p>
                      <p className="text-xs text-green-600">vs last month</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Engagement Growth</p>
                      <p className="text-2xl font-bold">{analytics.growth.engagementGrowthRate}%</p>
                      <p className="text-xs text-green-600">vs last month</p>
                    </div>
                    <Activity className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>Track your growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-slate-500">
                  <TrendingUp className="h-12 w-12" />
                  <span className="ml-2">Growth Chart Placeholder</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}