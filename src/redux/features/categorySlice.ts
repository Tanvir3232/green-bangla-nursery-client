import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


type TInitialState = {
    categories: string[];
}
const initialState: TInitialState = {
    categories: ["Indoor", "Outdoor", "Medicinal", "Flowering", "Fruit"]
}
const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    }
})
export const selectAllCategories = (state: RootState) => state.categories.categories;

export default categorySlice.reducer;