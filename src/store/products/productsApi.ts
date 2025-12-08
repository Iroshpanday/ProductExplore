import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, ProductsResponse } from "@/lib/types/product";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { search: string; category: string; limit: number; skip: number; sortBy: string }>({
      query: ({ search, category, limit, skip, sortBy }) => {
        let url = `/products?limit=${limit}&skip=${skip}`;

        // If search exists, use the correct endpoint for searching
        if (search.trim().length > 0) {
          url = `/products/search?q=${search}&limit=${limit}&skip=${skip}`;
        }

        // Category filter logic (handle category filtering in the URL)
        if (category && category !== "all") {
          url = `/products/category/${category}?limit=${limit}&skip=${skip}`;
        }

        // Sorting logic
        if (sortBy && sortBy !== "none") {
          url += `&sortBy=${sortBy}`;
        }

        console.log("Constructed API URL:", url); // Debugging URL
        return url;
      },

      transformResponse: (response: ProductsResponse, meta, arg) => {
        console.log("API Response: ", response);

        let sortedProducts = response.products;
        const sortBy = arg.sortBy;

        // Sorting logic based on the selected sortBy value
        if (sortBy === "priceAsc") {
          sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === "priceDesc") {
          sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortBy === "rating") {
          sortedProducts = sortedProducts.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === "popularity") {
          sortedProducts = sortedProducts.sort((a, b) => b.rating - a.rating); // Replace with actual popularity if available
        }

        return { ...response, products: sortedProducts };
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
