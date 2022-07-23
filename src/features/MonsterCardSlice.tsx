import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const loadMonster:any = createAsyncThunk(
    'MonsterCard/loadMonster',
   async () => {
        const response = await fetch(`https://www.dnd5eapi.co/api/monsters/adult-black-dragon`);
        const monster = await response.json();
        return monster.name; 
   }
);



export const MonsterCardSlice = createSlice({
    name:'MonsterCard',
    initialState:{
        monsterContent:'',
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

export const selectMonsterCard = (state:any) => state.MonsterCard;
export const isMonsterLoading = (state:any) => state.isMonsterLoading;
export const failedToLoadMonster = (state:any) => state.failedToLoadMonster;

export default MonsterCardSlice.reducer;