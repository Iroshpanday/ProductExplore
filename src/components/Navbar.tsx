// app/components/Navbar.tsx
"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearch, setCategory } from "@/store/products/productsSlice";
import { useGetCategoriesQuery } from "@/store/products/productsApi";
import Link from "next/link";
import { ShoppingBag, Search } from "lucide-react"; // Using lucide-react for icons

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { search, category } = useAppSelector((s) => s.products);

  const { data: categories } = useGetCategoriesQuery() as {
    data?: Array<{ name: string; slug: string }>;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="shrink-0 flex items-center">
            <ShoppingBag className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              E-commerce Hub
            </span>
          </Link>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <input
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 text-sm transition-all duration-300"
                placeholder="Search products..."
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Category Filter */}
            <select
              className="border border-gray-300 p-2 rounded-full text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
              value={category}
              onChange={(e) => {
                dispatch(setCategory(e.target.value));
              }}
            >
              <option value="all">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}