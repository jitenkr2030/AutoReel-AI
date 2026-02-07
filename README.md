# AutoReel AI 🎬

> From idea → daily reels → auto-posted

Transform your raw content into 30 days of engaging Instagram reels with AI automation. No camera, no editing skills, no Instagram knowledge required.

## 🌟 Features

### 🎯 Core Automation
- **One-Time Content Upload**: Upload voice notes, YouTube links, PDFs, or bullet points once
- **AI-Powered Generation**: Automatically creates 30 unique reel ideas, hooks, scripts, and CTAs
- **Smart Content Categories**: Content mapped to Awareness, Trust, Lead, and Sale stages
- **Auto-Posting**: Daily automatic posting at optimal times

### 📁 Content Intake Options
- 🎤 **Voice Notes**: WhatsApp-style audio recordings
- 📺 **YouTube Links**: Extract content from existing videos
- 📄 **PDF/Documents**: Upload presentations, notes, or documents
- 📝 **Bullet Points**: Quick text-based content input
- 🔗 **Blog/Website**: Extract content from web pages

### 🎨 Video Creation
- Stock video and B-roll integration
- AI-generated human avatars (optional)
- Bold, viral-style subtitles
- Emoji and emphasis effects
- Trending music integration
- Custom brand kit application

### 📊 Analytics & Management
- Real-time engagement tracking
- Content performance analytics
- Scheduling dashboard
- Multi-platform support (Instagram, Facebook)

## 💰 Pricing

| Plan | Price | Features |
|------|-------|----------|
| **Starter** | ₹999/month | 12 reels/month, Auto captions, Manual posting |
| **Growth** | ₹2,999/month | 30 reels/month, Auto-posting, Trending audio, Brand kit |
| **Business** | ₹4,999-₹5,999/month | 30 reels/month, Daily auto-post, Local hashtags, DM CTA copy |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Bun or npm
- SQLite3

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jitenkr2030/AutoReel-AI.git
   cd AutoReel-AI
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   bun run db:push
   bun run db:generate
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **State Management**: Zustand, TanStack Query

### Backend
- **Database**: SQLite with Prisma ORM
- **API**: Next.js API Routes
- **Validation**: Zod
- **File Processing**: Multer, PDF parsing
- **AI Integration**: z-ai-web-dev-sdk

### Infrastructure
- **Deployment**: Vercel (recommended)
- **Database**: SQLite (development), PostgreSQL (production)
- **File Storage**: AWS S3 compatible
- **Video Processing**: FFmpeg, Remotion

## 📁 Project Structure

```
AutoReel-AI/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── auth/          # Authentication pages
│   │   ├── dashboard/     # User dashboard
│   │   ├── upload/        # Content upload interface
│   │   └── page.tsx       # Landing page
│   ├── components/
│   │   └── ui/            # Reusable UI components
│   ├── lib/
│   │   ├── db.ts          # Database client
│   │   └── utils.ts       # Utility functions
│   └── hooks/             # Custom React hooks
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# AI Services
OPENAI_API_KEY="your-openai-key"
Z_AI_SDK_KEY="your-z-ai-key"

# Social Media APIs
INSTAGRAM_ACCESS_TOKEN="your-instagram-token"
FACEBOOK_ACCESS_TOKEN="your-facebook-token"

# File Storage
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
AWS_S3_BUCKET="your-s3-bucket"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## 📖 API Documentation

### Content Generation
```bash
POST /api/content
Content-Type: application/json

{
  "title": "My Content Batch",
  "contentType": "VOICE_NOTE",
  "content": "Raw content text...",
  "userId": "user-id"
}
```

### Reel Generation
```bash
POST /api/reels/generate
Content-Type: application/json

{
  "reelId": "reel-id",
  "options": {
    "includeTrendingAudio": true,
    "style": "professional"
  }
}
```

## 🎯 Target Customers

### Local Businesses (Best Money)
- Gyms and fitness centers
- Salons and spas
- Restaurants and cafes
- Real estate agents
- Coaching centers

### Coaches & Solopreneurs
- Business coaches
- Traders and educators
- Consultants
- Personal brands
- Course creators

## 🔧 Development

### Available Scripts
```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server

# Database
bun run db:push      # Push schema to database
bun run db:generate  # Generate Prisma client
bun run db:migrate   # Run migrations
bun run db:reset     # Reset database

# Code Quality
bun run lint         # Run ESLint
```

### Database Schema
The application uses the following main models:
- **User**: User accounts and profiles
- **Subscription**: Plan management and billing
- **ContentBatch**: Content upload batches
- **Reel**: Generated reel content
- **Analytics**: Performance metrics
- **SocialAccount**: Connected social media accounts

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Docker
```bash
# Build the image
docker build -t autoreel-ai .

# Run the container
docker run -p 3000:3000 autoreel-ai
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@autoreel.ai
- 💬 Discord: [Join our community](https://discord.gg/autoreel)
- 📖 Documentation: [docs.autoreel.ai](https://docs.autoreel.ai)

## 🎉 Roadmap

### Version 1.0 (Current)
- ✅ Core content generation
- ✅ Multi-format upload support
- ✅ Basic dashboard
- ✅ Instagram integration

### Version 1.1 (Q1 2024)
- 🔄 Advanced video customization
- 🔄 TikTok integration
- 🔄 Team collaboration
- 🔄 Advanced analytics

### Version 2.0 (Q2 2024)
- 📋 AI avatar generation
- 📋 Multi-language support
- 📋 White-label solution
- 📋 Mobile app

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Lucide](https://lucide.dev/) - Beautiful icons

---

<div align="center">
  <p>Made with ❤️ by the AutoReel AI Team</p>
  <p>Transform your content, grow your brand 🚀</p>
</div>