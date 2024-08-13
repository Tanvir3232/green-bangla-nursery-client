import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://green-bangla-nursery-server.vercel.app/api',
    }),
    tagTypes: ["product", "order"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => {
                return {
                    url: "/products",
                    method: "GET"
                }
            },
            providesTags: ['product']
        }),
        getProduct: builder.query({
            query: (id) => {
                return {
                    url: `/products/${id}`,
                    method: "GET"
                }
            },
            providesTags: ['product']
        }),
        removeProduct: builder.mutation({
            query: (id) => {
                console.log("Inside base api", id);
                return {

                    url: `/products/${id}`,
                    method: "delete",
                }
            },
            invalidatesTags: ['product']
        }),
        addProduct: builder.mutation({
            query: (data) => {
                console.log(data)
                return {
                    url: '/products/create-product',
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ['product']
        }),
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `/products/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['product']
        }),
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: '/orders/create-order',
                method: "POST",
                body: orderData,
            }),
            invalidatesTags: ['order'],
        })
    })
})
export const {
    useGetProductsQuery,
    useRemoveProductMutation,
    useAddProductMutation,
    useGetProductQuery,
    useUpdateProductMutation,
    useCreateOrderMutation } = baseApi;