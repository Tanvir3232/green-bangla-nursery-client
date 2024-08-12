import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
    sort: 'default' | 'low' | 'high';
    selectedCategories: string[];
}

const initialState: FilterState = {
    sort: 'default',
    selectedCategories: []
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSort: (state, action: PayloadAction<'default' | 'low' | 'high'>) => {
            state.sort = action.payload;
        },
        toggleCategory: (state, action: PayloadAction<string>) => {
            const category = action.payload;
            if (state.selectedCategories.includes(category)) {
                state.selectedCategories = state.selectedCategories.filter(cat => cat !== category);
            } else {
                state.selectedCategories.push(category);
            }
        }
    }
});

export const { setSort, toggleCategory } = filterSlice.actions;
export default filterSlice.reducer;

export const selectSort = (state: { filter: FilterState }) => state.filter.sort;
export const selectSelectedCategories = (state: { filter: FilterState }) => state.filter.selectedCategories;
