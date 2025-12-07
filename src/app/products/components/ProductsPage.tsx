"use client";

import { useMemo } from "react";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/store/products/productsApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearch, setCategory, setPage } from "@/store/products/productsSlice";
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

 const { data: productsData } = useGetProductsQuery({
  search,
  limit,
  skip,
});


  const { data: categories } = useGetCategoriesQuery() as { data?: Array<{ name: string; slug: string }> };

  const displayedProducts = productsData?.products ?? initialData.products;

  return (
    <div className="space-y-6">

      {/* Search */}
      <input
        className="border p-2 w-full rounded"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {displayedProducts.map((product) => {
    // console.log("PRODUCT OBJECT:", product);
    // console.log("PRODUCT ID:", product?.id);

    return (
      <a
        key={product.id}
        href={`/products/${product.id}`}
        className="border rounded-lg shadow p-4 hover:shadow-lg transition"
      >
        <img
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
    );
  })}
</div>


      {/* Pagination */}
      <div className="flex gap-2 justify-center">
        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
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
