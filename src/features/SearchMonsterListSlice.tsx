import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const loadMonsterList = createAsyncThunk(
    'SearchBar/LoadMonsterList',
    async () => {
        
        const response = await fetch('https://www.dnd5eapi.co/api/monsters')
        const monsterListAPI = await response.json();
        return monsterListAPI.results.map((monster: { name: string; }) => monster.name)
        // return monsterList;
    }
)

interface monsterListState{
    // searchedMonster:string,
    monsterListState?:string[] | [],
    isMonsterListLoading:boolean,
    failedToLoadMonsterList:boolean,
}

const initialState:monsterListState = {
    // searchedMonster:'',
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
    }
})

export const selectSearchMonsterList = (state:any) => state.SearchMonsterList;
export const isMonsterListLoading = (state:any) => state.isMonsterListLoading;
export const failedToLoadMonsterList = (state:any) => state.failedToLoadMonsterList;

export default SearchMonsterListSlice.reducer;