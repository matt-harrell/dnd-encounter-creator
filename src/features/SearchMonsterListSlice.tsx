import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const loadMonsterList = createAsyncThunk(
    'SearchBar/LoadMonsterList',
    async () => {
        const response = await fetch('https://www.dnd5eapi.co/api/monsters')
        const monsterListAPI = await response.json();
        return monsterListAPI.results.map((monster: { name: string; }) => monster.name)
    }
)

export const loadMonstersEqualToCR = createAsyncThunk(
    'SearchBar/loadMonstersEqualToCR',
    async (challengeRating:string| number) => {
        if(challengeRating === 'any'){
            const response = await fetch('https://www.dnd5eapi.co/api/monsters')
            const monsterListAPI = await response.json();
            return monsterListAPI.results.map((monster: { name: string; }) => monster.name)            
        } else{
            const response = await fetch(`https://www.dnd5eapi.co/api/monsters?challenge_rating=${challengeRating}`);
            const matchedMonsterList = await response.json();            
            return matchedMonsterList.results.map((monster: { name: string; }) => monster.name);
        }
         
    }
)

interface monsterListState{
    monsterListState?:string[] | [],
    isMonsterListLoading:boolean,
    failedToLoadMonsterList:boolean,
}

const initialState:monsterListState = {
    monsterListState:[],
    isMonsterListLoading:false,
    failedToLoadMonsterList:false,
};

export const SearchMonsterListSlice = createSlice({
    name:'SearchMonsterList',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(loadMonsterList.pending,(state) =>{
            state.isMonsterListLoading = true;
            state.failedToLoadMonsterList = false;
            state.monsterListState = [];
        })
        .addCase(loadMonsterList.rejected,(state) =>{
            state.isMonsterListLoading = false;
            state.failedToLoadMonsterList = true;
        })
        .addCase(loadMonsterList.fulfilled,(state,action) =>{
            state.isMonsterListLoading = false;
            state.failedToLoadMonsterList = false;
            state.monsterListState = action.payload;
        })
        .addCase(loadMonstersEqualToCR.fulfilled,(state,action) => {
            state.monsterListState = action.payload;
        })
    }
})

export const selectSearchMonsterList = (state: { SearchMonsterList: { monsterListState: string[]; }; }) => state.SearchMonsterList.monsterListState;

export const isMonsterListLoading = (state: { isMonsterListLoading: boolean; }) => state.isMonsterListLoading;
export const failedToLoadMonsterList = (state: { failedToLoadMonsterList: boolean; }) => state.failedToLoadMonsterList;

export default SearchMonsterListSlice.reducer;