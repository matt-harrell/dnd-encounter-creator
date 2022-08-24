import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChangeSearchState {
    showMonsterSearch:boolean;
}

const initialState = {
    showMonsterSearch:true,
} as ChangeSearchState;

const ChangeSearchSlice = createSlice({
    name:'ChangeSearch',
    initialState,
    reducers: {
        toggleShowMonsterSearch(state,action:PayloadAction<boolean>) {
            state.showMonsterSearch = action.payload;
        },
    },
})

export const selectShowMonsterSearch = (state: { ChangeSearch: { showMonsterSearch: boolean; }; }) => state.ChangeSearch.showMonsterSearch;

export const {toggleShowMonsterSearch} = ChangeSearchSlice.actions;

export default ChangeSearchSlice.reducer;