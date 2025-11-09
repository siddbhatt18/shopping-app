# 💎 LuxeJewels - Jewellery E-Commerce Platform

A full-stack, production-ready e-commerce platform for jewellery with **real-time gold, silver, and diamond price updates** based on live market rates. Built with modern technologies and best practices.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen?style=for-the-badge&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)


## ✨ Features

### Core Features

- 🔴 **Live Price Updates** - Real-time gold, silver, and platinum rates via Gold-API
- 🛍️ **Product Catalog** - Browse jewellery with advanced filtering (category, metal, price, purity)
- 🛒 **Shopping Cart** - Add/remove items with real-time price calculations
- 💳 **Secure Checkout** - Stripe integration with EMI options
- 🔐 **User Authentication** - Google OAuth & Email login via Supabase
- ❤️ **Wishlist** - Save favorite products
- 📦 **Order Tracking** - Track orders from placement to delivery
- 📊 **Admin Dashboard** - Inventory management, sales analytics, order management

### Technical Features

- ⚡ **Server-Side Rendering (SSR)** - Fast page loads with Next.js
- 📱 **Fully Responsive** - Mobile-first design with Tailwind CSS
- 🎨 **Modern UI/UX** - Clean white and blue theme
- 🔄 **Real-time Updates** - React Query for efficient data fetching
- 🔒 **Security** - Helmet.js, rate limiting, input validation
- 🌐 **SEO Optimized** - Meta tags, semantic HTML
- 💾 **Caching** - API response caching for better performance

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with SSR & App Router |
| **React 19** | UI library |
| **Tailwind CSS 3** | Utility-first CSS framework |
| **React Query** | Data fetching & caching |
| **Axios** | HTTP client |
| **React Hot Toast** | Notifications |
| **Lucide React** | Icon library |

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **Stripe** | Payment processing |
| **Helmet** | Security headers |
| **Express Rate Limit** | API rate limiting |

### External APIs & Services

- **Gold-API** - Live metal price updates
- **Supabase** - Authentication & user management
- **Stripe** - Payment gateway
- **MongoDB Atlas** - Cloud database (optional)

## 📦 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** - [Local](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

Verify installations:

```bash
node --version  # Should be v18+
npm --version   # Should be 8+
git --version
```

## 🚀 Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/luxejewels.git
cd luxejewels
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### 1. Get API Keys

#### Gold-API (Live Prices)
1. Visit [goldapi.io](https://www.goldapi.io/)
2. Sign up for free account
3. Copy API key from dashboard
4. **Free tier:** 100 requests/month

#### Stripe (Payments)
1. Visit [stripe.com](https://stripe.com/)
2. Create account
3. Get keys from [Dashboard](https://dashboard.stripe.com/test/apikeys)
   - Publishable key (`pk_test_...`)
   - Secret key (`sk_test_...`)

#### Supabase (Authentication)
1. Visit [supabase.com](https://supabase.com/)
2. Create new project
3. Go to Settings > API
4. Copy:
   - Project URL
   - Anon public key

#### MongoDB
- **Local:** `mongodb://localhost:27017/jewellery-shop`
- **Atlas:** Get connection string from cluster

### 2. Backend Environment Variables

Create `backend/.env`:

```env
# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
MONGODB_URI=your_mongodb_connection_string

# API Keys
GOLD_API_KEY=your_gold_api_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Security
JWT_SECRET=your_random_secret_key_min_32_characters

# Supabase (Optional for backend)
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

### 3. Frontend Environment Variables

Create `frontend/.env.local`:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### 4. Seed Sample Data (Optional)

```bash
cd backend
node seed.js
```

## 🏃 Running the Project

### Development Mode

#### Start Backend (Terminal 1)

```bash
cd backend
npm run dev
```

Server runs at: `http://localhost:5000`

#### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

Website runs at: `http://localhost:3000`

### Production Mode

#### Build Frontend

```bash
cd frontend
npm run build
npm start
```

#### Run Backend

```bash
cd backend
npm start
```

## 📁 Project Structure

```
luxejewels/
│
├── backend/
│   ├── models/              # Mongoose schemas
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Cart.js
│   │   └── User.js
│   │
│   ├── routes/              # API endpoints
│   │   ├── products.js      # Product CRUD
│   │   ├── cart.js          # Cart operations
│   │   ├── orders.js        # Order management
│   │   ├── prices.js        # Live price fetching
│   │   ├── payment.js       # Stripe integration
│   │   ├── wishlist.js      # Wishlist operations
│   │   └── admin.js         # Admin operations
│   │
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Helper functions
│   ├── server.js            # Entry point
│   ├── seed.js              # Database seeder
│   ├── package.json
│   └── .env                 # Environment variables
│
└── frontend/
    ├── src/
    │   ├── app/             # Next.js App Router
    │   │   ├── page.js      # Homepage
    │   │   ├── layout.js    # Root layout
    │   │   ├── providers.js # Context providers
    │   │   ├── products/    # Products page
    │   │   ├── cart/        # Cart page
    │   │   ├── login/       # Auth page
    │   │   └── live-rates/  # Live rates page
    │   │
    │   ├── components/      # Reusable components
    │   │   ├── Navbar.js
    │   │   ├── Footer.js
    │   │   ├── ProductCard.js
    │   │   └── LivePriceWidget.js
    │   │
    │   ├── lib/             # Utilities
    │   │   ├── api.js       # API functions
    │   │   └── supabase.js  # Supabase client
    │   │
    │   ├── hooks/           # Custom hooks
    │   │   └── useCart.js
    │   │
    │   └── styles/          # Global styles
    │       └── globals.css
    │
    ├── public/              # Static assets
    ├── package.json
    ├── tailwind.config.js
    └── .env.local           # Environment variables
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Products

```http
GET    /products              # Get all products (with filters)
GET    /products/:slug        # Get single product
GET    /products/featured/list # Get featured products
```

**Query Parameters:**
- `category` - Filter by category
- `metal` - Filter by metal type
- `purity` - Filter by purity
- `minPrice` / `maxPrice` - Price range
- `sort` - Sort order (newest, price-low, price-high, popular)
- `page` - Page number
- `limit` - Items per page

#### Prices

```http
GET    /prices/live           # Get live metal prices
POST   /prices/calculate      # Calculate product price
```

#### Cart

```http
GET    /cart/:userId          # Get user cart
POST   /cart                  # Add to cart
PUT    /cart/:userId/:itemId  # Update cart item
DELETE /cart/:userId/:itemId  # Remove from cart
DELETE /cart/:userId          # Clear cart
```

#### Orders

```http
POST   /orders                # Create order
GET    /orders/user/:userId   # Get user orders
GET    /orders/:orderNumber   # Get single order
PATCH  /orders/:orderNumber/status # Update order status
```

#### Payment

```http
POST   /payment/create-intent # Create Stripe payment intent
POST   /payment/verify        # Verify payment
```

#### Wishlist

```http
GET    /wishlist/:userId           # Get wishlist
POST   /wishlist/:userId/:productId # Add to wishlist
DELETE /wishlist/:userId/:productId # Remove from wishlist
```

#### Admin

```http
GET    /admin/stats           # Dashboard statistics
GET    /admin/orders          # All orders
POST   /admin/products        # Create product
PUT    /admin/products/:id    # Update product
DELETE /admin/products/:id    # Delete product
```


## 🧪 Testing

### Test Stripe Payment

Use test card:
- **Card:** 4242 4242 4242 4242
- **Expiry:** Any future date
- **CVC:** Any 3 digits
- **ZIP:** Any 5 digits

### Test Authentication

- **Google OAuth:** Works with any Google account
- **Email:** Register with any valid email

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
```bash
# Check MongoDB connection
# Verify .env file exists
# Ensure port 5000 is available
```

**Frontend shows black/white UI:**
```bash
cd frontend
rm -rf node_modules .next
npm install
npm run dev
```

**API errors:**
```bash
# Verify API keys in .env files
# Check backend is running
# Check CORS settings
```

**Supabase auth not working:**
- Add `http://localhost:3000` to Supabase redirect URLs
- Enable Email and Google providers in Supabase dashboard


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**

- GitHub: [@siddbhatt18](https://github.com/siddbhatt18/)
- LinkedIn: [Siddharth Bhattacharya](https://www.linkedin.com/in/siddharth-bhattacharya-8b9710247/)

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

**Made with ❤️ and ☕**
