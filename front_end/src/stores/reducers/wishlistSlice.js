import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';


const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
    },
    reducers: {
        addToWishlist: (state, action) => {
            state.items.find(item => item.book_id === action.payload.book_id);

            state.items.push({ ...action.payload });
            toast.success("Add book to wishlist successfully!!!")
        },
        removeFromWishlist: (state, action) => {
            const index = state.items.findIndex(item => item.book_id === action.payload.book_id);
            if (index !== -1) {
                state.items.splice(index, 1);
            }
            toast.success("Remove book from wishlist successfully!!!")
        },
        clearWishlist: (state) => {
            state.items = [];
        },
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
