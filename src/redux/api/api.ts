import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
    }),
    tagTypes: ["product"],
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
        })
    })
})
export const { useGetProductsQuery, useRemoveProductMutation, useAddProductMutation } = baseApi;