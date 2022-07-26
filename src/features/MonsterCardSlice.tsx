import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const loadMonster = createAsyncThunk(
    'MonsterCard/loadMonster',
   async (searchMonster:string) => {
        const formatedMonster = searchMonster.replaceAll(' ','-').toLowerCase();
        const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${formatedMonster}`);
        const monster = await response.json();
        return monster; 
   }
);



export const MonsterCardSlice = createSlice({
    name:'MonsterCard',
    initialState:{
        monsterContent:{},
        isMonsterLoading:false,
        failedToLoadMonster:false,
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(loadMonster.pending, (state) =>{
            state.isMonsterLoading = true;
            state.failedToLoadMonster = false;
        })
        .addCase(loadMonster.rejected, (state) => {
            state.failedToLoadMonster = true;
            state.isMonsterLoading = false;
        })
        .addCase(loadMonster.fulfilled, (state,action) => {
            state.isMonsterLoading = false;
            state.failedToLoadMonster = false;
            state.monsterContent = action.payload;

        })
    }
})
// neeed to fix any type check
export const selectMonsterCard = (state:any) => state.MonsterCard.monsterContent;
export const isMonsterLoading = (state:any) => state.isMonsterLoading;
export const failedToLoadMonster = (state:any) => state.failedToLoadMonster;

export default MonsterCardSlice.reducer;