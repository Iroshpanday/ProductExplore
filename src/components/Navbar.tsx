// app/components/Navbar.tsx
"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearch, setCategory } from "@/store/products/productsSlice";
import { useGetCategoriesQuery } from "@/store/products/productsApi";
import Link from "next/link";
import { Store, Search, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { search, category } = useAppSelector((s) => s.products);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  const { data: categories } = useGetCategoriesQuery() as {
    data?: Array<{ name: string; slug: string }>;
  };

  useEffect(() => {
  const initializeMounted = async () => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
    setMounted(true);
  };

  initializeMounted();
}, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  if (!mounted) {
    return (
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="relative bg-linear-to-r from-amber-500 to-orange-500 p-2 rounded-xl">
                <Store className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                ShopHub
              </span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-linear-to-r from-amber-500 to-orange-500 p-2 rounded-xl">
                <Store className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="ml-3 text-xl font-bold bg-linear-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
              ShopHub
            </span>
          </Link>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative group">
              <input
                className="pl-11 pr-4 py-2.5 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 w-64 lg:w-80 text-sm transition-all duration-300 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="Search products..."
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-amber-500 dark:group-focus-within:text-amber-400 transition-colors" />
            </div>

            {/* Category Filter */}
            <select
              className="border-2 border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-2xl text-sm appearance-none focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white cursor-pointer transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600"
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

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 transition-all duration-300 group"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
              ) : (
                <Sun className="h-5 w-5 text-slate-700 dark:text-slate-300 group-hover:text-amber-400 transition-colors" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}