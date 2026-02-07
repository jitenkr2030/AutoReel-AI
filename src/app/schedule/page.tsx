'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar as CalendarIcon,
  Clock,
  PlayCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Settings,
  Download,
  Share2,
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Users,
  TrendingUp
} from 'lucide-react'
import { format, addDays, startOfWeek, addWeeks, isSameDay, isToday } from 'date-fns'

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week')
  const [selectedReels, setSelectedReels] = useState<string[]>([])
  const [bulkAction, setBulkAction] = useState<'post' | 'reschedule' | 'delete' | ''>('')
  
  // Mock data for scheduled reels
  const [scheduledReels, setScheduledReels] = useState([
    {
      id: '1',
      title: '5 Tips for Perfect Gym Form',
      thumbnail: '/api/placeholder/200/350',
      scheduledFor: new Date(),
      status: 'scheduled',
      platform: 'instagram',
      category: 'AWARENESS',
      engagement: { views: 0, likes: 0, comments: 0 }
    },
    {
      id: '2',
      title: 'Client Success Story - Sarah',
      thumbnail: '/api/placeholder/200/350',
      scheduledFor: addDays(new Date(), 1),
      status: 'scheduled',
      platform: 'instagram',
      category: 'TRUST',
      engagement: { views: 0, likes: 0, comments: 0 }
    },
    {
      id: '3',
      title: 'Myth vs Fact: Cardio',
      thumbnail: '/api/placeholder/200/350',
      scheduledFor: addDays(new Date(), 2),
      status: 'posted',
      platform: 'both',
      category: 'EDUCATIONAL',
      engagement: { views: 1250, likes: 89, comments: 12 }
    }
  ])

  // Mock analytics data
  const analytics = {
    totalScheduled: 12,
    totalPosted: 45,
    thisWeek: 7,
    nextWeek: 8,
    bestPerforming: '5 Tips for Perfect Gym Form',
    engagementRate: 4.2,
    totalReach: 12500
  }

  const getReelsForDate = (date: Date) => {
    return scheduledReels.filter(reel => 
      isSameDay(new Date(reel.scheduledFor), date)
    )
  }

  const getWeekDates = () => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 }) // Monday
    return Array.from({ length: 7 }, (_, i) => addDays(start, i))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'posted':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      scheduled: 'bg-blue-100 text-blue-800',
      posted: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    }
    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    )
  }

  const handleBulkAction = () => {
    if (selectedReels.length === 0) return
    
    switch (bulkAction) {
      case 'post':
        // Post selected reels now
        setScheduledReels(prev => prev.map(reel => 
          selectedReels.includes(reel.id) 
            ? { ...reel, status: 'posted', postedAt: new Date() }
            : reel
        ))
        break
      case 'reschedule':
        // Open reschedule modal
        break
      case 'delete':
        // Delete selected reels
        setScheduledReels(prev => prev.filter(reel => !selectedReels.includes(reel.id)))
        break
    }
    setSelectedReels([])
    setBulkAction('')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded"></div>
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
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Schedule Settings
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
            <h1 className="text-3xl font-bold mb-2">Content Schedule</h1>
            <p className="text-slate-600">Manage and automate your posting schedule</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={viewMode} onValueChange={(value: 'week' | 'month') => setViewMode(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Week View</SelectItem>
                <SelectItem value="month">Month View</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Reel
            </Button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Scheduled</p>
                  <p className="text-2xl font-bold">{analytics.totalScheduled}</p>
                </div>
                <CalendarIcon className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Posted</p>
                  <p className="text-2xl font-bold">{analytics.totalPosted}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">This Week</p>
                  <p className="text-2xl font-bold">{analytics.thisWeek}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Engagement Rate</p>
                  <p className="text-2xl font-bold">{analytics.engagementRate}%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Calendar</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">
                      {format(selectedDate, 'MMMM yyyy')}
                    </span>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {viewMode === 'week' ? (
                  <div className="grid grid-cols-7 gap-4">
                    {getWeekDates().map((date, index) => {
                      const dayReels = getReelsForDate(date)
                      const isCurrentDay = isToday(date)
                      
                      return (
                        <div 
                          key={index}
                          className={`border rounded-lg p-3 min-h-[120px] ${
                            isCurrentDay ? 'border-primary bg-primary/5' : 'border-slate-200'
                          }`}
                        >
                          <div className="text-sm font-medium mb-2">
                            {format(date, 'EEE')}
                            <div className={`text-lg ${isCurrentDay ? 'text-primary' : 'text-slate-900'}`}>
                              {format(date, 'd')}
                            </div>
                          </div>
                          <div className="space-y-1">
                            {dayReels.slice(0, 2).map(reel => (
                              <div 
                                key={reel.id}
                                className="text-xs p-1 bg-slate-100 rounded truncate cursor-pointer hover:bg-slate-200"
                                onClick={() => {/* Handle reel selection */}}
                              >
                                {getStatusIcon(reel.status)}
                                <span className="ml-1">{reel.title}</span>
                              </div>
                            ))}
                            {dayReels.length > 2 && (
                              <div className="text-xs text-slate-500">
                                +{dayReels.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <Calendar 
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border"
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Schedule Details */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Optimize Schedule
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Calendar
                </Button>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Schedule Settings
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Posts</CardTitle>
                <CardDescription>Next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheduledReels
                    .filter(reel => reel.status === 'scheduled')
                    .slice(0, 5)
                    .map(reel => (
                      <div key={reel.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="w-12 h-12 bg-slate-200 rounded"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{reel.title}</p>
                          <p className="text-xs text-slate-500">
                            {format(new Date(reel.scheduledFor), 'MMM d, h:mm a')}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(reel.status)}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Schedule Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Auto-Scheduling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-optimize">Auto-optimize posting times</Label>
                  <Switch id="auto-optimize" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="cross-post">Cross-post to Facebook</Label>
                  <Switch id="cross-post" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Post notifications</Label>
                  <Switch id="notifications" defaultChecked />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="UTC">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">EST</SelectItem>
                      <SelectItem value="PST">PST</SelectItem>
                      <SelectItem value="IST">IST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Scheduled Reels Table */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Scheduled Posts</CardTitle>
              <div className="flex items-center gap-2">
                {selectedReels.length > 0 && (
                  <>
                    <Select value={bulkAction} onValueChange={(value: any) => setBulkAction(value)}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Bulk actions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="post">Post Now</SelectItem>
                        <SelectItem value="reschedule">Reschedule</SelectItem>
                        <SelectItem value="delete">Delete</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm" 
                      onClick={handleBulkAction}
                      disabled={!bulkAction}
                    >
                      Apply
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledReels.map(reel => (
                <div key={reel.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <input
                    type="checkbox"
                    checked={selectedReels.includes(reel.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedReels(prev => [...prev, reel.id])
                      } else {
                        setSelectedReels(prev => prev.filter(id => id !== reel.id))
                      }
                    }}
                    className="rounded"
                  />
                  <div className="w-16 h-16 bg-slate-200 rounded"></div>
                  <div className="flex-1">
                    <h4 className="font-medium">{reel.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {format(new Date(reel.scheduledFor), 'MMM d, h:mm a')}
                      </span>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(reel.status)}
                        {reel.status}
                      </span>
                      <span>{reel.platform}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(reel.status)}
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}