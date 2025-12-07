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
} from "@/store/products/productsSlice";
import type { ProductsResponse } from "@/lib/types/product";
import Image from "next/image";

interface ProductsPageProps {
  initialData: ProductsResponse;
}

export default function ProductsPage({ initialData }: ProductsPageProps) {
  const dispatch = useAppDispatch();
  const { search, category, page } = useAppSelector((s) => s.products);

  const limit = 10;
  const skip = (page - 1) * limit;

  const {
    data: productsData,
    isLoading,
    isFetching,
    isError,
  } = useGetProductsQuery({
    search,
    limit,
    skip,
  });

  const { data: categories } = useGetCategoriesQuery() as {
    data?: Array<{ name: string; slug: string }>;
  };

  const displayedProducts = productsData?.products ?? initialData.products;

  return (
    <div className="space-y-6">
      {/* Search */}
      <input
        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Search products..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

      {/* Category filter */}
      <select
        className="border p-2 rounded"
        value={category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
      >
        <option value="all">All</option>
        {categories?.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Product list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isError && (
          <div className="text-red-500 text-center p-4 border rounded bg-red-50">
            Failed to load products. Please try again later.
          </div>
        )}
        {isLoading || isFetching
          ? Array.from({ length: limit }).map((_, idx) => (
              <div
                key={idx}
                className="border rounded-lg shadow p-4 animate-pulse"
              >
                <div className="w-full h-40 bg-gray-300 rounded mb-2" />
                <div className="h-6 bg-gray-300 rounded mb-1" />
                <div className="h-4 bg-gray-300 rounded mb-1" />
                <div className="h-6 w-1/3 bg-gray-300 rounded" />
              </div>
            ))
          : displayedProducts.map((product) => (
              <a
                key={product.id}
                href={`/products/${product.id}`}
                className="border rounded-lg shadow p-4 hover:shadow-lg transition"
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={400}
                  height={300}
                  className="w-full h-40 object-cover rounded"
                />

                <h2 className="font-semibold mt-2">{product.title}</h2>
                <p className="text-gray-600 text-sm">{product.category}</p>
                <p className="text-lg font-bold mt-1">${product.price}</p>
              </a>
            ))}
      </div>
      {!isLoading && displayedProducts.length === 0 && (
        <div className="text-center p-4 text-gray-700">
          No products found for &quot;
          <span className="font-semibold">{search}</span>&quot;.
        </div>
      )}

      {/* Pagination */}
      <div className="flex gap-2 justify-center">
        <button
          className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-indigo-500 hover:text-white transition"
          disabled={page === 1}
          onClick={() => dispatch(setPage(page - 1))}
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          className="px-4 py-2 border rounded"
          onClick={() => dispatch(setPage(page + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
