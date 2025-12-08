// app/page.tsx or ProductsPage.tsx
"use client";

import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/store/products/productsApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setSearch,
  setCategory,
  setPage,
  setSortBy,
} from "@/store/products/productsSlice";
import type { ProductsResponse } from "@/lib/types/product";
import Image from "next/image";
import { Star, Package, AlertCircle } from "lucide-react";

interface ProductsPageProps {
  initialData: ProductsResponse;
}

export default function ProductsPage({ initialData }: ProductsPageProps) {
  const dispatch = useAppDispatch();
  const { search, category, page, sortBy } = useAppSelector((s) => s.products);

  const limit = 10;
  const skip = (page - 1) * limit;

  const { data: productsData, isLoading, isFetching, isError } = useGetProductsQuery({
    search,
    category,
    limit,
    skip,
    sortBy,
  });

  const { data: categories } = useGetCategoriesQuery() as {
    data?: Array<{ name: string; slug: string }>;
  };

  const displayedProducts = productsData?.products ?? initialData.products;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text ">
            Discover Amazing Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse through our curated collection of premium products
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Products
              </label>
              <input
                className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-200"
                placeholder="What are you looking for?"
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
                value={category}
                onChange={(e) => {
                  console.log("Selected category:", e.target.value);
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

            {/* Sorting */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort By
              </label>
              <select
                className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
                value={sortBy}
                onChange={(e) => dispatch(setSortBy(e.target.value as "priceAsc" | "priceDesc" | "rating" | "popularity" | "none"))}
              >
                <option value="none">Default</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8 flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-1">
                Failed to Load Products
              </h3>
              <p className="text-red-700 dark:text-red-300">
                We encountered an error while fetching products. Please check your connection and try again.
              </p>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {isLoading || isFetching
            ? Array.from({ length: limit }).map((_, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="w-full h-56 bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                  </div>
                </div>
              ))
            : displayedProducts.map((product) => (
                <a
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transform hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={400}
                      height={300}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white dark:bg-gray-900 rounded-full px-3 py-1 shadow-lg flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {product.rating || "4.5"}
                      </span>
                    </div>
                    {product.stock < 10 && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Low Stock
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 flex-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {product.title}
                      </h2>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <Package className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {product.category}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline space-x-2">
                        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                          ${product.price}
                        </p>
                        {product.discountPercentage && (
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                          </span>
                        )}
                      </div>
                      {product.discountPercentage > 0 && (
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold px-2 py-1 rounded-full">
                          {product.discountPercentage}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
        </div>

        {/* Empty State */}
        {!isLoading && !isError && displayedProducts.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <Package className="h-20 w-20 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn&apos;t find any products matching &quot;
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">{search}</span>
              &quot;
            </p>
            <button
              onClick={() => dispatch(setSearch(""))}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Pagination */}
        {!isError && displayedProducts.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 hover:text-white hover:border-indigo-600 dark:hover:bg-indigo-500 dark:hover:border-indigo-500 transition-all duration-200 text-gray-900 dark:text-gray-100 font-medium min-w-[120px]"
              disabled={page === 1 || isLoading || isFetching}
              onClick={() => dispatch(setPage(page - 1))}
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-2 px-4 py-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
              <span className="text-gray-600 dark:text-gray-400">Page</span>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{page}</span>
            </div>
            
            <button
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg transition-all duration-200 font-medium min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={displayedProducts.length < limit || isLoading || isFetching}
              onClick={() => dispatch(setPage(page + 1))}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}