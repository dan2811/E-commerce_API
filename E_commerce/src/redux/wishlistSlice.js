import {
    createSlice
} from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        products: [],
    },
    reducers: {
        addProductToWishlist: (state, action) => {
            state.products.push(action.payload);
        },
        removeProductFromWishlist: (state, action) => {
            state.products.splice(action.payload, 1);
        }
    },
});

export const {
    addProductToWishlist,
    removeProductFromWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;