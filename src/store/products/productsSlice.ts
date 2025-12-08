import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductsUIState {
  search: string;
  category: string;
  page: number;
  sortBy: "priceAsc" | "priceDesc" | "rating" | "popularity" | "none";
}

const initialState: ProductsUIState = {
  search: "",
  category: "all",
  page: 1,
  sortBy: "none", // Default to no sorting
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setCategory(state, action: PayloadAction<string>) {
  state.category = action.payload;
  state.page = 1; // reset to page 1 when category changes
},
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSortBy(state, action: PayloadAction<"priceAsc" | "priceDesc" | "rating" | "popularity" | "none">) {
      state.sortBy = action.payload;
    },
  },
});

export const { setSearch, setCategory, setPage, setSortBy } = productsSlice.actions;


export default productsSlice.reducer;
