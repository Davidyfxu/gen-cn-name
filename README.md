# ChineseName.ai 🇨🇳✨

A full-stack Next.js web application that generates personalized Chinese names for foreigners using AI, complete with cultural meanings and significance.

## 🌟 Features

### Core Functionality

- **AI-Powered Name Generation**: Leverages DeepSeek API to create culturally authentic Chinese names
- **Dual Input Methods**: Choose between structured forms or natural conversation
- **Cultural Interpretation**: Detailed meanings, pinyin pronunciation, and cultural significance
- **Traditional & Simplified**: Supports both character formats

### User Experience

- **Beautiful Landing Page**: SEO-optimized with conversion-focused design
- **User Dashboard**: Track generated names, credits, and account history
- **Responsive Design**: Mobile-first approach with seamless cross-device experience
- **Smooth Animations**: Framer Motion for enhanced user interactions

### Business Features

- **Credit-Based System**: $5 per name generation with bulk discounts
- **Secure Payments**: Creem.io integration for payment processing
- **User Authentication**: Supabase Auth with email and Google OAuth
- **Automatic User Creation**: Database triggers for seamless user registration
- **Data Persistence**: Supabase database with RLS security
- **Admin Tools**: User synchronization and management utilities

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: Supabase Auth
- **Database**: Supabase with PostgreSQL
- **Payment**: Creem.io
- **UI Components**: shadcn/ui + Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **AI Integration**: DeepSeek API
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Clerk.js account
- Creem.io account
- DeepSeek API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd gen-chinese-name
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure your `.env.local` file:

   ```env
   # Supabase Authentication (Google OAuth configured in dashboard)

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Creem.io Payment
   CREEM_API_KEY=your_creem_api_key
   CREEM_PRODUCT_ID=your_creem_product_id

   # DeepSeek API
   DEEPSEEK_API_KEY=your_deepseek_api_key

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   PRICE_PER_GENERATION=5.00
   ```

4. **Set up the database**

   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Run the schema from `database/schema.sql`

5. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📚 Database Schema

The application uses three main tables:

- **users**: User profiles with credits and authentication info
- **name_generations**: Generated names with input data and AI results
- **payments**: Payment records linked to Creem.io transactions

See `database/schema.sql` for the complete schema with RLS policies.

## 🔐 Authentication Flow

1. Users sign up/sign in via Supabase Auth (Email or Google OAuth)
2. Database trigger automatically creates user record in users table
3. New users automatically get 1 free credit
4. RLS policies ensure data security

### Google OAuth Configuration

To enable Google authentication:

1. Go to Supabase Dashboard → Authentication → Settings → Auth Providers
2. Enable Google provider
3. Configure OAuth app in Google Cloud Console
4. Add authorized redirect URIs

See `ENVIRONMENT_SETUP.md` for detailed configuration.

## 💳 Payment Integration

### Creem.io Setup

1. Create account at Creem.io
2. Set up webhook endpoint: `/api/payment/webhook`
3. Configure product with appropriate pricing
4. Update environment variables

### Credit Packages

- **1 Credit**: $5.00
- **5 Credits**: $20.00 (Save $5!)
- **10 Credits**: $35.00 (Save $15!)

## 🤖 AI Integration

The application integrates with DeepSeek's chat completion API to generate culturally appropriate Chinese names based on:

- User's personal information
- Hobbies and interests
- Life aspirations
- Knowledge of Chinese culture
- Natural conversation context

## 🎨 UI/UX Design

### Design Principles

- **Clean & Intuitive**: Minimal cognitive load
- **Conversion Focused**: Clear CTAs and value propositions
- **Mobile-First**: Responsive across all devices
- **Accessible**: Following WCAG guidelines

### Components

- Built with shadcn/ui for consistency
- Custom animations with Framer Motion
- Tailwind CSS for rapid styling
- Lucide React for icons

## 📱 Application Pages

### Landing Page (`/`)

- Hero section with value proposition
- Feature highlights
- Pricing information
- Social proof and testimonials

### Name Generation (`/generate`)

- Structured form interface
- Chat-based conversation interface
- Real-time AI generation
- Beautiful result display

### Dashboard (`/dashboard`)

- Usage statistics
- Generated names history
- Credit management
- Account settings
- Payment history

## 🔧 API Endpoints

- `GET /api/user/data` - Fetch user profile and generations
- `POST /api/generate-name` - Create new Chinese name
- `POST /api/payment/create-checkout` - Initiate payment flow
- `POST /api/payment/webhook` - Handle payment confirmations

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically

### Manual Deployment

1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Configure environment variables on your hosting platform

### Environment Configuration

Ensure all environment variables are properly set in your production environment.

## 🛡 Security Features

- **Row Level Security**: Supabase RLS policies
- **Authentication**: Clerk.js secure authentication
- **API Protection**: Server-side validation
- **Payment Security**: Creem.io secure payment processing

## 📊 Monitoring & Analytics

- User authentication events via Clerk.js
- Payment tracking via Creem.io webhooks
- Database monitoring via Supabase
- Custom analytics for name generation patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Clerk.js](https://clerk.com/) for authentication
- [Supabase](https://supabase.com/) for database and backend
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Framer Motion](https://www.framer.com/motion/) for animations
- [DeepSeek](https://deepseek.com/) for AI-powered name generation
- [Creem.io](https://creem.io/) for payment processing

## 📞 Support

For support and questions:

- Create an issue in this repository
- Contact us at support@chinesename.ai
- Join our Discord community

---

**Made with ❤️ for cultural connection and meaningful names**
