import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TCategory = {
    name: string;
    icon: string;
}

export interface TInitialState {
    categories: TCategory[];
}

const initialState: TInitialState = {
    categories: [
        { name: "Indoor", icon: "/icons/indoor.png" },
        { name: "Outdoor", icon: "/icons/outdoor.png" },
        { name: "Medicinal", icon: "/icons/medicinal.png" },
        { name: "Flowering", icon: "/icons/flowering.png" },
        { name: "Fruit", icon: "/icons/fruit.png" }
    ]
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {}
})

export const selectAllCategories = (state: RootState) => state.categories.categories;

export default categorySlice.reducer;
