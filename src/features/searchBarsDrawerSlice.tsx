import { createSlice } from "@reduxjs/toolkit";

interface SearchBarsDrawerState {
    inputPlayerName:string;
    isPlayerNameEmtpy:boolean;
    isPlayerClassEmtpy:boolean;
    isPlayerLevelEmtpy:boolean;
}

const initialState = {
    inputPlayerName:'',
    isPlayerNameEmtpy:false,
    isPlayerClassEmtpy:false,
    isPlayerLevelEmtpy:false,

} as SearchBarsDrawerState;

const SearchBarsDrawerSlice = createSlice({
    name:'searchDrawer',
    initialState,
    reducers:{
        togglePlayerNameEmpty(state,action){
            state.isPlayerNameEmtpy = action.payload;
        },
        togglePlayerClassEmtpy(state,action){
            state.isPlayerClassEmtpy = action.payload;
        },
        togglePlayerLevelEmtpy(state,action){
            state.isPlayerLevelEmtpy = action.payload;
        },
        changePlayerName(state,action){
            state.inputPlayerName = action.payload;
        },
    }
})

export const selectInputPlayerName = (state: { searchDrawer: { inputPlayerName: string; }; }) => state.searchDrawer.inputPlayerName;
export const selectIsPlayerNameEmtpy = (state: { searchDrawer: { isPlayerNameEmtpy: boolean; }; }) => state.searchDrawer.isPlayerNameEmtpy;
export const selectIsPlayerClassEmtpy = (state: { searchDrawer: { isPlayerClassEmtpy: boolean; }; }) => state.searchDrawer.isPlayerClassEmtpy;
export const selectIsPlayerLevelEmtpy = (state: { searchDrawer: { isPlayerLevelEmtpy: boolean; }; }) => state.searchDrawer.isPlayerLevelEmtpy;



export const {
    changePlayerName,
    togglePlayerNameEmpty,
    togglePlayerClassEmtpy,
    togglePlayerLevelEmtpy,
} = SearchBarsDrawerSlice.actions;

export default SearchBarsDrawerSlice.reducer;
