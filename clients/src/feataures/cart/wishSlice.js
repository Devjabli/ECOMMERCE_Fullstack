import { createSlice } from "@reduxjs/toolkit";

const wishSlice = createSlice({
  name: "wishList",
  initialState: { itemList: [] },
  reducers: {
    addToWishList: (state, action) => {
      const item = action.payload;
      const existItem = state.itemList.find((x) => x.id === item._id);

      if (existItem) {
        state.itemList = state.itemList.map((x) =>
          x.id === existItem._id ? item : x
        );
      } else {
        state.itemList.push(item)
      }
    },
    removeWishFromList: (state, action) => {
        state.itemList = state.itemList.filter((x) => 
        x.id !== action.payload
        )
    }
  },
});

export const {addToWishList, removeWishFromList} = wishSlice.actions;
export default wishSlice.reducer