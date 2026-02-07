'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Play, 
  Pause, 
  Download, 
  Share2, 
  Edit, 
  Settings,
  Volume2,
  VolumeX,
  Maximize2,
  SkipBack,
  SkipForward,
  RefreshCw,
  Eye,
  Heart,
  MessageCircle,
  Save,
  Music,
  Type,
  Palette,
  Wand2,
  Check,
  AlertCircle,
  Loader2,
  Calendar
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ReelPreviewPage() {
  const [activeTab, setActiveTab] = useState('preview')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState([75])
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(15)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  
  // Customization options
  const [customization, setCustomization] = useState({
    style: 'professional',
    includeTrendingAudio: true,
    textOverlay: true,
    brandKit: true,
    subtitles: true,
    emojis: true,
    backgroundColor: '#000000',
    accentColor: '#3b82f6',
    fontFamily: 'Inter'
  })

  // Mock reel data
  const reel = {
    id: '1',
    title: '5 Tips for Perfect Gym Form',
    hook: 'STOP SCROLLING! These form mistakes are killing your gains...',
    script: 'Here are 5 quick tips that will instantly improve your workout form and prevent injuries...',
    cta: 'DM "FORM" for my complete workout guide! 💪',
    hashtags: '#gymtips #fitness #workoutform',
    category: 'AWARENESS',
    status: 'ready',
    videoUrl: '/api/placeholder/400/700',
    thumbnailUrl: '/api/placeholder/400/700',
    engagement: {
      views: 1250,
      likes: 89,
      comments: 12,
      saves: 23
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    
    // Simulate video generation
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300))
      setGenerationProgress(i)
    }
    
    setIsGenerating(false)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
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
                Export
              </Button>
              <div className="w-8 h-8 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {reel.title}
                      <Badge variant={reel.status === 'ready' ? 'default' : 'secondary'}>
                        {reel.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>Preview and customize your reel</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Script
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Video Player */}
                <div className="relative bg-black rounded-lg overflow-hidden aspect-[9/16] mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        {isPlaying ? (
                          <Pause className="h-8 w-8" />
                        ) : (
                          <Play className="h-8 w-8 ml-1" />
                        )}
                      </div>
                      <p className="text-lg font-semibold mb-2">{reel.hook}</p>
                      <p className="text-sm opacity-80 px-4">{reel.script}</p>
                      <p className="text-sm font-semibold mt-4">{reel.cta}</p>
                    </div>
                  </div>
                  
                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-white text-xs mb-2">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                      <Progress value={(currentTime / duration) * 100} className="h-1" />
                    </div>
                    
                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-white hover:text-white">
                          <SkipBack className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-white hover:text-white"
                          onClick={handlePlayPause}
                        >
                          {isPlaying ? (
                            <Pause className="h-5 w-5" />
                          ) : (
                            <Play className="h-5 w-5" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-white hover:text-white">
                          <SkipForward className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-white hover:text-white"
                          onClick={() => setIsMuted(!isMuted)}
                        >
                          {isMuted ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </Button>
                        <div className="w-20">
                          <Slider
                            value={volume}
                            onValueChange={setVolume}
                            max={100}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        <Button variant="ghost" size="sm" className="text-white hover:text-white">
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center justify-around p-4 bg-slate-50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">Views</span>
                    </div>
                    <p className="text-lg font-semibold">{reel.engagement.views.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">Likes</span>
                    </div>
                    <p className="text-lg font-semibold">{reel.engagement.likes}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-slate-600">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">Comments</span>
                    </div>
                    <p className="text-lg font-semibold">{reel.engagement.comments}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Save className="h-4 w-4" />
                      <span className="text-sm">Saves</span>
                    </div>
                    <p className="text-lg font-semibold">{reel.engagement.saves}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customization Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  AI Enhancement
                </CardTitle>
                <CardDescription>Optimize your reel for better engagement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isGenerating ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Generating optimized reel...</span>
                      <span className="text-sm text-slate-500">{generationProgress}%</span>
                    </div>
                    <Progress value={generationProgress} className="h-2" />
                    <p className="text-xs text-slate-500">
                      AI is analyzing your content and creating the perfect reel
                    </p>
                  </div>
                ) : (
                  <Button onClick={handleGenerate} className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Generate AI Enhanced Version
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customization Options</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="style">Style</TabsTrigger>
                    <TabsTrigger value="text">Text</TabsTrigger>
                    <TabsTrigger value="brand">Brand</TabsTrigger>
                  </TabsList>

                  <TabsContent value="style" className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="reel-style">Visual Style</Label>
                      <select 
                        id="reel-style"
                        className="w-full mt-1 p-2 border rounded-md"
                        value={customization.style}
                        onChange={(e) => setCustomization(prev => ({ ...prev, style: e.target.value }))}
                      >
                        <option value="professional">Professional</option>
                        <option value="casual">Casual</option>
                        <option value="energetic">Energetic</option>
                        <option value="educational">Educational</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="trending-audio">Trending Audio</Label>
                      <Switch
                        id="trending-audio"
                        checked={customization.includeTrendingAudio}
                        onCheckedChange={(checked) => 
                          setCustomization(prev => ({ ...prev, includeTrendingAudio: checked }))
                        }
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="text" className="space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="text-overlay">Text Overlay</Label>
                      <Switch
                        id="text-overlay"
                        checked={customization.textOverlay}
                        onCheckedChange={(checked) => 
                          setCustomization(prev => ({ ...prev, textOverlay: checked }))
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="subtitles">Subtitles</Label>
                      <Switch
                        id="subtitles"
                        checked={customization.subtitles}
                        onCheckedChange={(checked) => 
                          setCustomization(prev => ({ ...prev, subtitles: checked }))
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emojis">Emojis</Label>
                      <Switch
                        id="emojis"
                        checked={customization.emojis}
                        onCheckedChange={(checked) => 
                          setCustomization(prev => ({ ...prev, emojis: checked }))
                        }
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="brand" className="space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="brand-kit">Apply Brand Kit</Label>
                      <Switch
                        id="brand-kit"
                        checked={customization.brandKit}
                        onCheckedChange={(checked) => 
                          setCustomization(prev => ({ ...prev, brandKit: checked }))
                        }
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="bg-color">Background Color</Label>
                      <Input
                        id="bg-color"
                        type="color"
                        value={customization.backgroundColor}
                        onChange={(e) => 
                          setCustomization(prev => ({ ...prev, backgroundColor: e.target.value }))
                        }
                        className="mt-1 h-10"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <Input
                        id="accent-color"
                        type="color"
                        value={customization.accentColor}
                        onChange={(e) => 
                          setCustomization(prev => ({ ...prev, accentColor: e.target.value }))
                        }
                        className="mt-1 h-10"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Reel
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Preview
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Post
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Script Preview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Script & Content</CardTitle>
            <CardDescription>Review and edit your reel content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium">Hook (First 3 seconds)</Label>
                <Textarea
                  value={reel.hook}
                  className="mt-1"
                  rows={2}
                  readOnly
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Call to Action</Label>
                <Textarea
                  value={reel.cta}
                  className="mt-1"
                  rows={2}
                  readOnly
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium">Main Script (7-20 seconds)</Label>
                <Textarea
                  value={reel.script}
                  className="mt-1"
                  rows={4}
                  readOnly
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Category</Label>
                <Badge variant="outline" className="mt-1">{reel.category}</Badge>
              </div>
              <div>
                <Label className="text-sm font-medium">Hashtags</Label>
                <p className="text-sm text-slate-600 mt-1">{reel.hashtags}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}