import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sort: 'default',
    selectedCategories: []
}
const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        toggleCategory: (state, action) => {
            if (state.selectedCategories.includes(action.payload)) {
                state.selectedCategories = state.selectedCategories.filter(category => category !== action.payload)
            } else {
                state.selectedCategories.push(action.payload)
            }
        }
    }
})
export const { setSort, toggleCategory } = filterSlice.actions;
export default filterSlice.reducer;
export const selectSort = (state) => state.filter.sort;
export const selectSelectedCategories = (state) => state.filter.selectedCategories;