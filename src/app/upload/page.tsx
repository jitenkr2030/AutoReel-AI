'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Upload, 
  Mic, 
  Link as LinkIcon, 
  FileText, 
  MessageSquare,
  Video,
  X,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Loader2
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState('voice')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    voiceNote: null as File | null,
    youtubeUrl: '',
    pdfFile: null as File | null,
    notes: '',
    blogUrl: '',
    bulletPoints: ''
  })
  const router = useRouter()

  const handleFileUpload = useCallback((files: FileList | null, type: string) => {
    if (!files) return
    
    const newFiles = Array.from(files)
    setUploadedFiles(prev => [...prev, ...newFiles])
    
    if (type === 'voice') {
      setFormData(prev => ({ ...prev, voiceNote: newFiles[0] }))
    } else if (type === 'pdf') {
      setFormData(prev => ({ ...prev, pdfFile: newFiles[0] }))
    }
  }, [])

  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }, [])

  const simulateUpload = useCallback(async () => {
    setIsUploading(true)
    setUploadProgress(0)
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setUploadProgress(i)
    }
    
    setIsUploading(false)
    
    // Redirect to dashboard after successful upload
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  }, [router])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form data based on active tab
    let isValid = true
    let errorMessage = ''
    
    switch (activeTab) {
      case 'voice':
        if (!formData.voiceNote) {
          isValid = false
          errorMessage = 'Please upload a voice note'
        }
        break
      case 'youtube':
        if (!formData.youtubeUrl.trim()) {
          isValid = false
          errorMessage = 'Please enter a YouTube URL'
        }
        break
      case 'pdf':
        if (!formData.pdfFile) {
          isValid = false
          errorMessage = 'Please upload a PDF or notes file'
        }
        break
      case 'blog':
        if (!formData.blogUrl.trim()) {
          isValid = false
          errorMessage = 'Please enter a blog or website URL'
        }
        break
      case 'bullets':
        if (!formData.bulletPoints.trim()) {
          isValid = false
          errorMessage = 'Please enter some bullet points'
        }
        break
    }
    
    if (!formData.title.trim()) {
      isValid = false
      errorMessage = 'Please enter a title for your content'
    }
    
    if (!isValid) {
      alert(errorMessage)
      return
    }
    
    await simulateUpload()
  }, [activeTab, formData, simulateUpload])

  const renderUploadArea = (type: string, icon: React.ReactNode, title: string, description: string, accept?: string) => (
    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-600 mb-4">{description}</p>
      <input
        type="file"
        accept={accept}
        multiple={false}
        onChange={(e) => handleFileUpload(e.target.files, type)}
        className="hidden"
        id={`${type}-upload`}
      />
      <label htmlFor={`${type}-upload`}>
        <Button variant="outline" className="cursor-pointer">
          <Upload className="w-4 h-4 mr-2" />
          Choose File
        </Button>
      </label>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
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
              <Button variant="outline" size="sm" onClick={() => router.push('/dashboard')}>
                Back to Dashboard
              </Button>
              <div className="w-8 h-8 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Upload Your Content</h1>
            <p className="text-slate-600">
              Give us your raw content once, and we'll turn it into 30 days of engaging reels
            </p>
          </div>

          {/* Progress Indicator */}
          {isUploading && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span className="font-medium">Processing your content...</span>
                  </div>
                  <span className="text-sm text-slate-500">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-slate-500 mt-2">
                  We're analyzing your content and generating reel ideas. This usually takes 1-2 minutes.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Content Batch</CardTitle>
              <CardDescription>
                Choose one type of content to upload. We'll handle the rest!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Content Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., December Fitness Content, Q1 Business Tips"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Briefly describe what this content is about..."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Content Type Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="voice" className="flex items-center gap-2">
                      <Mic className="h-4 w-4" />
                      <span className="hidden sm:inline">Voice</span>
                    </TabsTrigger>
                    <TabsTrigger value="youtube" className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      <span className="hidden sm:inline">YouTube</span>
                    </TabsTrigger>
                    <TabsTrigger value="pdf" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="hidden sm:inline">PDF</span>
                    </TabsTrigger>
                    <TabsTrigger value="blog" className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">Blog</span>
                    </TabsTrigger>
                    <TabsTrigger value="bullets" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span className="hidden sm:inline">Bullets</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="voice" className="mt-6">
                    {renderUploadArea(
                      'voice',
                      <Mic className="h-8 w-8 text-primary" />,
                      'Upload Voice Note',
                      'Upload a WhatsApp-style voice note (MP3, WAV, M4A)',
                      'audio/*'
                    )}
                    {formData.voiceNote && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium">{formData.voiceNote.name}</p>
                              <p className="text-sm text-slate-500">
                                {(formData.voiceNote.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setFormData(prev => ({ ...prev, voiceNote: null }))}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="youtube" className="mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="youtube-url">YouTube Video URL</Label>
                        <Input
                          id="youtube-url"
                          type="url"
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={formData.youtubeUrl}
                          onChange={(e) => setFormData(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                        />
                      </div>
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          We'll extract the audio and content from your YouTube video to create reels.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </TabsContent>

                  <TabsContent value="pdf" className="mt-6">
                    {renderUploadArea(
                      'pdf',
                      <FileText className="h-8 w-8 text-primary" />,
                      'Upload PDF or Notes',
                      'Upload PDF documents, text files, or notes (PDF, TXT, DOCX)',
                      '.pdf,.txt,.doc,.docx'
                    )}
                    {formData.pdfFile && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium">{formData.pdfFile.name}</p>
                              <p className="text-sm text-slate-500">
                                {(formData.pdfFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setFormData(prev => ({ ...prev, pdfFile: null }))}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="blog" className="mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="blog-url">Blog or Website URL</Label>
                        <Input
                          id="blog-url"
                          type="url"
                          placeholder="https://yourblog.com/article-url"
                          value={formData.blogUrl}
                          onChange={(e) => setFormData(prev => ({ ...prev, blogUrl: e.target.value }))}
                        />
                      </div>
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          We'll extract the text content from your blog post or website to create reels.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </TabsContent>

                  <TabsContent value="bullets" className="mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="bullets">Bullet Points</Label>
                        <Textarea
                          id="bullets"
                          placeholder="Enter your key points, one per line:
• Tip 1 for better results
• Strategy that works every time  
• Common mistake to avoid
• Quick win for beginners"
                          value={formData.bulletPoints}
                          onChange={(e) => setFormData(prev => ({ ...prev, bulletPoints: e.target.value }))}
                          rows={8}
                        />
                      </div>
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Each bullet point will be expanded into a complete reel script with hooks and CTAs.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="text-sm text-slate-500">
                    <p>🎯 This will generate 30 unique reels for you</p>
                    <p>⚡ Processing usually takes 1-2 minutes</p>
                  </div>
                  <Button type="submit" disabled={isUploading} size="lg">
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Generate 30 Reels
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">Voice Notes</h4>
                <p className="text-sm text-slate-600">
                  Most popular! Just record yourself explaining your business.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">Bullet Points</h4>
                <p className="text-sm text-slate-600">
                  Fastest way! Just list your key points and we'll expand them.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-2">Existing Content</h4>
                <p className="text-sm text-slate-600">
                  Repurpose your blogs, videos, or documents into reels.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}