import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the search state
export interface SearchState {
    searchTerm: string;
}

// Define the initial state with types
const initialState: SearchState = {
    searchTerm: '',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        }
    }
});

export const { setSearchTerm } = searchSlice.actions;

// Selector with typed state
export const selectSearchTerm = (state: { search: SearchState }) => state.search.searchTerm;

export default searchSlice.reducer;
