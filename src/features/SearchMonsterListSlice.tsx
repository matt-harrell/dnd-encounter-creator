import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const loadMonsterList = createAsyncThunk(
    'SearchBar/LoadMonsterList',
    async () => {
        const response = await fetch('https://www.dnd5eapi.co/api/monsters')
        const monsterListAPI = await response.json();
        return monsterListAPI.results.map((monster: monster) => ({
          name: monster.name,
          index:monster.index
        }));
    }
)

export const loadMonstersEqualToCR = createAsyncThunk(
    'SearchBar/loadMonstersEqualToCR',
    async (challengeRating:string| number) => {
        if(challengeRating === 'any'){
            const response = await fetch('https://www.dnd5eapi.co/api/monsters')
            const monsterListAPI = await response.json();
            return monsterListAPI.results.map((monster: monster) => ({
                name: monster.name,
                index:monster.index
            }));         
        } else{
            const response = await fetch(`https://www.dnd5eapi.co/api/monsters?challenge_rating=${challengeRating}`);
            const matchedMonsterList = await response.json();            
            return matchedMonsterList.results.map((monster: monster) => ({
                name: monster.name,
                index:monster.index
            }));
        }
         
    }
)

interface monster{
    index:string,
    name:string,
}

interface monsterListState{
    monsterListState?:monster[] | [],
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
            // state.isMonsterListLoading = true;
            state.failedToLoadMonsterList = false;
            // state.monsterListState = [];
        })
        .addCase(loadMonsterList.rejected,(state) =>{
            // state.isMonsterListLoading = false;
            state.failedToLoadMonsterList = true;
        })
        .addCase(loadMonsterList.fulfilled,(state,action) =>{
            // state.isMonsterListLoading = false;
            state.failedToLoadMonsterList = false;
            state.monsterListState = action.payload;
        })
        .addCase(loadMonstersEqualToCR.fulfilled,(state,action) => {
            state.isMonsterListLoading = false;
            state.failedToLoadMonsterList = false;
            state.monsterListState = action.payload;
        })
        .addCase(loadMonstersEqualToCR.pending,(state) => {
            state.isMonsterListLoading = true;
            state.failedToLoadMonsterList = false;
        })
    }
})

export const selectSearchMonsterList = (state: { SearchMonsterList: { monsterListState: monster[]; }; }) => state.SearchMonsterList.monsterListState;

export const selectIsMonsterListLoading = (state: { SearchMonsterList: { isMonsterListLoading: boolean; }; }) => state.SearchMonsterList.isMonsterListLoading;
export const failedToLoadMonsterList = (state: { failedToLoadMonsterList: boolean; }) => state.failedToLoadMonsterList;

export default SearchMonsterListSlice.reducer;