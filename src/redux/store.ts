import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/api'
import categorySlice from './features/categorySlice'
import filterSlice from './features/filterSlice'

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        filter: filterSlice,
        categories: categorySlice
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(baseApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch