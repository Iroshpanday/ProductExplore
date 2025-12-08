# 🛍️ ShopHub - Modern E-Commerce Platform

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC)

A fully-featured e-commerce platform built with Next.js 14, Redux Toolkit, and Tailwind CSS. Browse products with advanced filtering, search, and sorting capabilities.

## 🌐 Live Demo

**[View Live Demo](https://product-explore-git-main-irosh-pandays-projects.vercel.app/)**

## ✨ Features

### 🚀 Core Features
- **🔍 Advanced Search**: Real-time product search with instant filtering
- **📂 Category Filtering**: Filter products by categories (Beauty, Groceries, Electronics, etc.)
- **🔄 Smart Sorting**: Sort by price (low-high/high-low), rating, and popularity
- **📄 Pagination**: Load products in pages for better performance
- **💾 State Management**: Redux Toolkit with RTK Query for efficient data handling

### 🎨 UI/UX Features
- **📱 Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- **🎭 Modern UI**: Clean design with gradient backgrounds and smooth animations
- **⏳ Loading States**: Beautiful skeleton loaders while data loads
- **🚨 Error Handling**: User-friendly error messages with retry options
- **🖼️ Image Optimization**: Next.js Image component with lazy loading

### 🛍️ Product Features
- **Product Detail Pages**: Detailed view with images, descriptions, ratings, and reviews
- **Price Display**: Shows current price and original price with discount percentage
- **Stock Indicators**: Shows stock availability
- **Customer Reviews**: Read customer reviews with ratings
- **Category Tags**: Visual category badges for easy identification

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **State Management**: Redux Toolkit + RTK Query
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **API**: DummyJSON API
- **Package Manager**: npm

## 📦 Installation & Setup

\`\`\`bash
# 1. Clone the repository
git clone https://github.com/Iroshpanday/product-explore.git

# 2. Navigate to project directory
cd product-explore

# 3. Install dependencies
npm install

# 4. Run development server
npm run dev
\`\`\`

Open http://localhost:3000 to view the application.

## 📁 Project Structure

\`\`\`
product-explore/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx      # Navigation with search and filters
│   │   └── Footer.tsx      # Footer with links and info
│   ├── products/[id]/
│   │   └── page.tsx        # Dynamic product detail pages
│   ├── providers/
│   │   └── ReduxProvider.tsx  # Redux provider setup
│   ├── error.tsx           # Global error boundary
│   ├── loading.tsx         # Loading state component
│   ├── not-found.tsx       # 404 page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home/products listing page
├── store/
│   ├── products/
│   │   ├── productsApi.ts  # RTK Query API endpoints
│   │   └── productsSlice.ts # Redux slice for products
│   ├── hooks.ts            # Typed Redux hooks
│   └── store.ts            # Redux store configuration
├── lib/
│   └── types/
│       └── product.ts      # TypeScript interfaces
├── public/                 # Static assets
└── README.md              # Documentation
\`\`\`

## 🎨 Design Highlights

### Color Scheme
- **Primary**: Indigo/Purple gradients for branding
- **Secondary**: Amber/Orange for interactive elements
- **Background**: Subtle gradients for visual depth
- **Cards**: White with shadow for product cards

### UI Components
- **Product Cards**: Hover effects with scale transforms
- **Filters**: Clean dropdowns with focus states
- **Search**: Real-time search with debouncing
- **Pagination**: Simple prev/next buttons with page indicator
- **Loading States**: Skeleton loaders matching card layouts

## 🔧 API Integration

The app uses DummyJSON API for product data:

\`\`\`
https://dummyjson.com/products
https://dummyjson.com/products/{id}
https://dummyjson.com/products/categories
\`\`\`

### API Features:
- Real-time Filtering: Client-side filtering based on search and category
- Pagination: Server-side pagination with skip/limit parameters
- Error Handling: Graceful handling of API errors
- Caching: RTK Query caching for better performance

## 📸 Screenshots

### Home Page (Product Listing)
Browse products with search, filters, and sorting

### Product Detail Page
Detailed product view with images, description, reviews

### Mobile View
Fully responsive design

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Route-based code splitting
- **State Management**: Efficient Redux store
- **API Caching**: RTK Query built-in caching
- **Debounced Search**: Reduces API calls
- **Skeleton Loading**: Better perceived performance

## 🎓 Learning Outcomes

This project demonstrates:

- Next.js 14 App Router implementation
- Redux Toolkit with RTK Query
- TypeScript for type safety
- Responsive design with Tailwind CSS
- API integration and error handling
- State management best practices
- Performance optimization techniques
- Clean component architecture

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Irosh Panday**

- 🌐 [Live Demo](https://product-explore-git-main-irosh-pandays-projects.vercel.app/)
- 💼 [LinkedIn](https://linkedin.com/in/irosh-panday)
- 🐱 [GitHub](https://github.com/Iroshpanday)
- 📧 [Email](mailto:Iroshpanday@gmail.com)

## 🙏 Acknowledgments

- DummyJSON for providing free product data API
- Next.js for the amazing framework
- Tailwind CSS for utility-first CSS
- Redux Toolkit for state management
- Lucide Icons for beautiful icons

---

⭐ If you found this project helpful, please give it a star on GitHub!

**Built with ❤️ by Irosh Panday 🚀**
