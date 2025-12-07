import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductsUIState {
  search: string;
  category: string;
  page: number;
}

const initialState: ProductsUIState = {
  search: "",
  category: "all",
  page: 1,
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
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setSearch, setCategory, setPage } = productsSlice.actions;

export default productsSlice.reducer;
