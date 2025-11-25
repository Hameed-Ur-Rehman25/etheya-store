# Etheya Store 🛍️

A modern, full-stack e-commerce fashion store built with Next.js 15, React 19, and Supabase. Etheya offers a premium shopping experience with elegant UI/UX design, product management, cart functionality, wishlists, and integrated newsletter system.

## ✨ Features

- **Modern UI/UX Design** - Beautiful, responsive design with Tailwind CSS and Framer Motion animations
- **Product Catalog** - Browse products by category with filtering and search capabilities
- **Shopping Cart** - Full-featured cart with size selection and quantity management
- **Wishlist** - Save favorite products for later
- **Product Quick View** - Modal product details for seamless browsing
- **Newsletter Subscription** - Built-in newsletter system with Supabase backend
- **User Authentication** - Secure authentication via Supabase Auth
- **Order Management** - Complete order processing workflow
- **Responsive Design** - Mobile-first design that works on all devices
- **Dark/Light Mode** - Theme switching support

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

### Backend
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **API**: Next.js API Routes

## 📁 Project Structure

```
etheya-store/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── newsletter/    # Newsletter subscription endpoint
│   ├── auth/              # Authentication pages
│   ├── delivery-details/  # Delivery information page
│   ├── payment/           # Payment processing page
│   ├── products/          # Product listing pages
│   ├── profile/           # User profile page
│   └── wishlist/          # Wishlist page
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   ├── navbar.tsx        # Navigation component
│   ├── hero-section.tsx  # Hero banner
│   ├── product-card.tsx  # Product display card
│   ├── cart-drawer.tsx   # Shopping cart drawer
│   ├── newsletter.tsx    # Newsletter subscription form
│   └── ...
├── context/               # React context providers
│   ├── CartContext.tsx   # Cart state management
│   ├── WishlistContext.tsx
│   ├── BuyNowContext.tsx
│   └── ProductCacheContext.tsx
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and services
│   ├── supabase.ts       # Supabase client
│   ├── database-service.ts
│   ├── order-service.ts
│   ├── auth-service.ts
│   └── utils.ts
├── types/                 # TypeScript type definitions
├── supabase/              # Supabase migrations
│   └── migrations/
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn
- [Supabase](https://supabase.com/) account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hameed-Ur-Rehman25/etheya-store.git
   cd etheya-store
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run database migrations**
   
   Execute the SQL migrations in your Supabase project. See `supabase/migrations/` for the migration files.

5. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## 🔧 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

### Getting Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (or create a new one)
3. Navigate to **Settings** → **API**
4. Copy your **Project URL** and **anon/public** key

## 📧 Newsletter System

The store includes a fully functional newsletter subscription system. For detailed documentation, see:

- [Quick Start Guide](./QUICK_START_NEWSLETTER.md)
- [Setup Instructions](./SETUP_INSTRUCTIONS.md)
- [Implementation Guide](./NEWSLETTER_IMPLEMENTATION_GUIDE.md)
- [Admin Guide](./ADMIN_NEWSLETTER_GUIDE.md)
- [System Overview](./NEWSLETTER_SYSTEM_OVERVIEW.md)

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components built on top of Radix UI primitives. Components are located in `components/ui/` and can be customized via `components.json`.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 📞 Contact

**Etheya**
- 📍 Islamabad, Pakistan
- 📧 etheya.pk@gmail.com

---

Built with ❤️ by Etheya Team
