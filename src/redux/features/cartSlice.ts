import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the product
interface Product {
    _id: string;
    name: string;
    price: number;
    stock: number;
    quantity?: number;
    totalPrice?: number;
}

// Define a type for the cart state
interface CartState {
    items: Product[];
    totalQuantity: number;
    totalPrice: number;
}

// Define the initial state using that type
const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Product>) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item._id === newItem._id);

            if (existingItem) {
                if (existingItem.quantity! < newItem.stock) {
                    existingItem.quantity!++;
                    existingItem.totalPrice! += newItem.price;
                    existingItem.stock--;
                    state.totalQuantity++;
                    state.totalPrice += newItem.price;
                } else {
                    alert("Cannot add more than available stock");
                }
            } else {
                if (newItem.stock > 0) {
                    state.items.push({
                        ...newItem,
                        quantity: 1,
                        totalPrice: newItem.price,
                        stock: newItem.stock - 1,
                    });
                    state.totalQuantity++;
                    state.totalPrice += newItem.price;
                } else {
                    alert("This product is out of stock");
                }
            }
        },
        incrementQuantity: (state, action: PayloadAction<CartItem>) => {
            const item = state.items.find(item => item._id === action.payload._id);
            if (item && item.quantity < item.stock) {
                item.quantity++;
                item.totalPrice += item.price;
                state.totalQuantity++;
                state.totalPrice += item.price;
            }
        },
        decrementQuantity: (state, action: PayloadAction<CartItem>) => {
            const item = state.items.find(item => item._id === action.payload._id);
            if (item && item.quantity > 1) {
                item.quantity--;
                item.totalPrice -= item.price;
                state.totalQuantity--;
                state.totalPrice -= item.price;
            }
        },
        removeItem: (state, action: PayloadAction<CartItem>) => {
            const item = action.payload;
            state.items = state.items.filter(cartItem => cartItem._id !== item._id);
            state.totalQuantity -= item.quantity;
            state.totalPrice -= item.totalPrice;
        },
    },

});

export const { addItem, incrementQuantity, decrementQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotalQuantity = (state: { cart: CartState }) => state.cart.totalQuantity;
export const selectCartTotalPrice = (state: { cart: CartState }) => state.cart.totalPrice;
