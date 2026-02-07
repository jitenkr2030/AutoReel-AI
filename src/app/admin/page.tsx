'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Video,
  Settings,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  UserPlus,
  CreditCard,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  RefreshCw
} from 'lucide-react'
import { format, subDays } from 'date-fns'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPlan, setFilterPlan] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  // Mock data for admin dashboard
  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    totalRevenue: 284750,
    monthlyRecurring: 68920,
    totalReels: 15420,
    scheduledPosts: 2340,
    conversionRate: 12.5,
    churnRate: 3.2
  })

  const [users] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@fitnessexpert.com',
      plan: 'GROWTH',
      status: 'active',
      joinedAt: subDays(new Date(), 45),
      lastActive: subDays(new Date(), 1),
      reelsCreated: 45,
      monthlyRevenue: 2999,
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@businesscoach.io',
      plan: 'BUSINESS',
      status: 'active',
      joinedAt: subDays(new Date(), 30),
      lastActive: subDays(new Date(), 3),
      reelsCreated: 89,
      monthlyRevenue: 5999,
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '3',
      name: 'Emma Davis',
      email: 'emma@salonpro.com',
      plan: 'STARTER',
      status: 'trial',
      joinedAt: subDays(new Date(), 14),
      lastActive: subDays(new Date(), 0),
      reelsCreated: 12,
      monthlyRevenue: 0,
      avatar: '/api/placeholder/40/40'
    }
  ])

  const [recentActivity] = useState([
    {
      id: '1',
      type: 'user_signup',
      user: 'John Doe',
      description: 'Signed up for Growth plan',
      timestamp: subDays(new Date(), 0),
      status: 'success'
    },
    {
      id: '2',
      type: 'payment',
      user: 'Sarah Johnson',
      description: 'Monthly payment processed',
      timestamp: subDays(new Date(), 0),
      status: 'success'
    },
    {
      id: '3',
      type: 'content_generated',
      user: 'Mike Chen',
      description: 'Generated 30 new reels',
      timestamp: subDays(new Date(), 1),
      status: 'success'
    },
    {
      id: '4',
      type: 'payment_failed',
      user: 'Emma Davis',
      description: 'Payment method declined',
      timestamp: subDays(new Date(), 2),
      status: 'error'
    }
  ])

  const [revenueData] = useState([
    { month: 'Jan', revenue: 45230, users: 180 },
    { month: 'Feb', revenue: 52340, users: 220 },
    { month: 'Mar', revenue: 61890, users: 280 },
    { month: 'Apr', revenue: 68920, users: 340 },
    { month: 'May', revenue: 72150, users: 380 },
    { month: 'Jun', revenue: 78460, users: 420 }
  ])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlan = filterPlan === 'all' || user.plan === filterPlan
    return matchesSearch && matchesPlan
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      trial: 'bg-blue-100 text-blue-800',
      inactive: 'bg-red-100 text-red-800',
      suspended: 'bg-orange-100 text-orange-800'
    }
    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    )
  }

  const getActivityIcon = (type: string) => {
    const icons = {
      user_signup: <UserPlus className="h-4 w-4" />,
      payment: <CreditCard className="h-4 w-4" />,
      content_generated: <Video className="h-4 w-4" />,
      payment_failed: <AlertTriangle className="h-4 w-4" />
    }
    return icons[type as keyof typeof icons] || <Activity className="h-4 w-4" />
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on users:`, selectedUsers)
    // Implement bulk actions (suspend, delete, export, etc.)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Admin Panel</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <Button variant="ghost" size="sm">Dashboard</Button>
                <Button variant="ghost" size="sm">Users</Button>
                <Button variant="ghost" size="sm">Analytics</Button>
                <Button variant="ghost" size="sm">Settings</Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
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
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-slate-600">Manage users, monitor performance, and grow the platform</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Users</p>
                      <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+12% from last month</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold">${stats.monthlyRecurring.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+8% from last month</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Reels</p>
                      <p className="text-2xl font-bold">{stats.totalReels.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+25% from last month</p>
                    </div>
                    <Video className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Conversion Rate</p>
                      <p className="text-2xl font-bold">{stats.conversionRate}%</p>
                      <p className="text-xs text-red-600">-2% from last month</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Quick Stats */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map(activity => (
                      <div key={activity.id} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.user}</p>
                          <p className="text-xs text-slate-500">{activity.description}</p>
                        </div>
                        <div className="text-xs text-slate-400">
                          {format(activity.timestamp, 'MMM d, h:mm a')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly recurring revenue trend</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.slice(-6).map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm font-medium">{data.month}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">${data.revenue.toLocaleString()}</p>
                          <p className="text-xs text-slate-500">{data.users} users</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* User Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage and monitor all platform users</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={filterPlan} onValueChange={setFilterPlan}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Plans</SelectItem>
                        <SelectItem value="STARTER">Starter</SelectItem>
                        <SelectItem value="GROWTH">Growth</SelectItem>
                        <SelectItem value="BUSINESS">Business</SelectItem>
                      </SelectContent>
                    </Select>
                    {selectedUsers.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Select>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Actions" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem onClick={() => handleBulkAction('export')}>Export</SelectItem>
                            <SelectItem onClick={() => handleBulkAction('suspend')}>Suspend</SelectItem>
                            <SelectItem onClick={() => handleBulkAction('delete')}>Delete</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers(users.map(u => u.id))
                            } else {
                              setSelectedUsers([])
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reels</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map(user => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers(prev => [...prev, user.id])
                              } else {
                                setSelectedUsers(prev => prev.filter(id => id !== user.id))
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-slate-500">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.plan}</Badge>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(user.status)}
                        </TableCell>
                        <TableCell>{user.reelsCreated}</TableCell>
                        <TableCell>${user.monthlyRevenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{format(user.lastActive, 'MMM d')}</p>
                            <p className="text-slate-500">
                              {format(user.lastActive, 'h:mm a')}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New user signups over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-slate-500">
                    <BarChart3 className="h-12 w-12" />
                    <span className="ml-2">Analytics Chart Placeholder</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Revenue by subscription plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-slate-500">
                    <PieChart className="h-12 w-12" />
                    <span className="ml-2">Revenue Chart Placeholder</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure platform-wide settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Platform Status</Label>
                  <Select defaultValue="operational">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operational">Operational</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>User Registration</Label>
                  <Select defaultValue="open">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="invite">Invite Only</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Default User Plan</Label>
                  <Select defaultValue="STARTER">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STARTER">Starter</SelectItem>
                      <SelectItem value="GROWTH">Growth</SelectItem>
                      <SelectItem value="BUSINESS">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}