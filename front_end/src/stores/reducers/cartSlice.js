import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.book_id === action.payload.book_id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push({ ...action.payload, quantity: action.payload.quantity, stock: action.payload.stock_quantity });
            }
            toast.success("Add book to cart successfully!!!")
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(item => item.book_id === action.payload.book_id);
            if (index !== -1) {
                state.items.splice(index, 1);
            }
            toast.success("Remove book from cart successfully!!!")
        },
        updateQuantity: (state, action) => {
            const item = state.items.find(item => item.book_id === action.payload.book_id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
