import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, ProductsResponse } from "@/lib/types/product";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { search: string; limit: number; skip: number }>({
  query: ({ search, limit, skip }) => {
    if (search.trim().length > 0) {
      return `/products/search?q=${search}&limit=${limit}&skip=${skip}`;
    }
    return `/products?limit=${limit}&skip=${skip}`;
  },
}),

    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
    getCategories: builder.query<string[], void>({
      query: () => `/products/categories`,
    }),
    getProductsByCategory: builder.query<ProductsResponse, string>({
      query: (category) => `/products/category/${category}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = productsApi;
