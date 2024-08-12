// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/api';
import cartReducer from './features/cartSlice';
import categoryReducer from './features/categorySlice';
import filterReducer from './features/filterSlice';
import searchReducer from './features/searchSlice';

// Configure the Redux store
export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        filter: filterReducer,
        categories: categoryReducer,
        cart: cartReducer,
        search: searchReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

// Type for the RootState
export type RootState = ReturnType<typeof store.getState>;
// Type for AppDispatch
export type AppDispatch = typeof store.dispatch;
