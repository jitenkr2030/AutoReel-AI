'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Play, Upload, Calendar, Zap, Users, TrendingUp, Video, Mic, FileText, Link as LinkIcon, MessageSquare, ArrowRight, Star, BarChart3, Target, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              AutoReel AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="ghost">About</Button>
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
          <Sparkles className="w-4 h-4 mr-2" />
          AI-Powered Content Automation
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
          From idea → daily reels → auto-posted
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          User gives raw content once → AI turns it into 30 days of reels → posts daily automatically
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/auth">
            <Button size="lg" className="text-lg px-8">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="text-lg px-8">
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </Button>
        </div>
        <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            No camera needed
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            No editing skills
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            No Instagram knowledge
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">🔁 Core Automation Flow</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <Card className="relative overflow-hidden">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Content Intake</CardTitle>
              <CardDescription>Once a Month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                User uploads ANY ONE:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-primary" />
                  Voice note
                </li>
                <li className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-primary" />
                  YouTube link
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  PDF / Notes
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Bullet points
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">AI Content Engine</CardTitle>
              <CardDescription>Auto-Generation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                AI auto-generates:
              </p>
              <ul className="space-y-2 text-sm">
                <li>• 30 reel ideas</li>
                <li>• 30 hooks (first 3 seconds)</li>
                <li>• 30 short scripts (7-20 sec)</li>
                <li>• CTA for each reel</li>
                <li>• Hashtags (niche + local)</li>
                <li>• Mapped to: Awareness, Trust, Lead, Sale</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Reel Creation</CardTitle>
              <CardDescription>Full Automation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                For each reel:
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Stock video / B-roll / AI human</li>
                <li>• Subtitles (bold, viral style)</li>
                <li>• Emojis + emphasis</li>
                <li>• Trending music (optional)</li>
                <li>• Brand kit applied</li>
                <li className="font-semibold text-primary">⚡ No manual editing</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Daily Auto-Posting</CardTitle>
              <CardDescription>Set & Forget</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                Auto posts 1 reel/day:
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Best time auto-detected</li>
                <li>• Caption + hashtags auto-added</li>
                <li>• Cross-post to Facebook Reels</li>
                <li className="font-semibold text-green-600">✅ User just sees: "Today's reel posted"</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Target Customers */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">🎯 Target Customers</h2>
          <p className="text-xl text-center text-slate-600 mb-12">High Paying Businesses That Need This</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Local Businesses
                  <Badge className="bg-green-100 text-green-800">Best Money</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Gym
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Salon
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Coaching center
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Restaurant
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Real estate agents
                  </div>
                  <div className="col-span-2 text-sm text-slate-600 italic">
                    They don't care how—they care that it runs
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Coaches & Solopreneurs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Traders
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Educators
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Consultants
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Personal brands
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-4">💰 Pricing Strategy</h2>
        <p className="text-xl text-center text-slate-600 mb-12">India-Friendly but Profitable</p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="relative">
            <CardHeader>
              <Badge className="w-fit mb-2">🟢 Starter</Badge>
              <CardTitle className="text-2xl">₹999<span className="text-lg font-normal text-slate-500">/month</span></CardTitle>
              <CardDescription>DIY Package</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">12 reels/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Auto captions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Manual posting</span>
                </li>
              </ul>
              <Link href="/auth">
                <Button className="w-full" variant="outline">Get Started</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="relative border-2 border-primary shadow-lg">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary text-white">Most Popular</Badge>
            </div>
            <CardHeader>
              <Badge className="w-fit mb-2">🔵 Growth</Badge>
              <CardTitle className="text-2xl">₹2,999<span className="text-lg font-normal text-slate-500">/month</span></CardTitle>
              <CardDescription>Best Value</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">30 reels/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Auto-posting</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Trending audio</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Brand kit</span>
                </li>
              </ul>
              <Link href="/auth">
                <Button className="w-full">Get Started</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="relative">
            <CardHeader>
              <Badge className="w-fit mb-2">🔴 Business</Badge>
              <CardTitle className="text-2xl">₹4,999-₹5,999<span className="text-lg font-normal text-slate-500">/month</span></CardTitle>
              <CardDescription>For Local Businesses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">30 reels/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Daily auto-post</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Local hashtags</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">DM CTA copy</span>
                </li>
              </ul>
              <Link href="/auth">
                <Button className="w-full" variant="outline">Get Started</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">🤝 Service + SaaS Hybrid</h3>
              <p className="text-sm text-slate-600 mb-4">
                For non-tech local clients: You manage onboarding once, system runs automatically
              </p>
              <div className="text-2xl font-bold text-primary">
                ₹7,000–₹10,000/month per business
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Your cost = almost zero after setup
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why This Will Sell */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">🧨 Why This Will Sell</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Clear Pain</h3>
                <p className="text-sm text-slate-600">"Daily reels but no time"</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Clear Output</h3>
                <p className="text-sm text-slate-600">"30 reels done for you"</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Recurring Revenue</h3>
                <p className="text-sm text-slate-600">Easy upsell to agencies</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Automate Your Instagram?</h2>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Join hundreds of businesses that are already generating 30 days of content with just one upload
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth">
            <Button size="lg" className="text-lg px-8">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="text-lg px-8">
            Book a Demo
          </Button>
        </div>
        <p className="text-sm text-slate-500 mt-6">
          No credit card required • Cancel anytime • Setup in 5 minutes
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Video className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">AutoReel AI</span>
              </div>
              <p className="text-sm text-slate-600">
                Transform your content into 30 days of engaging reels with AI automation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Features</li>
                <li>Pricing</li>
                <li>API</li>
                <li>Integrations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Community</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2024 AutoReel AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}