import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const loadMonster = createAsyncThunk(
    'MonsterCard/loadMonster',
   async (searchMonster:string) => {
        const formatedMonster = searchMonster.replaceAll(' ','-').toLowerCase();
        const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${formatedMonster}`);
        const monster = await response.json()

        let statMods:(number | string)[] = []
                        
       statMods.push(monster.strength) 
       statMods.push(monster.dexterity) 
       statMods.push(monster.constitution) 
       statMods.push(monster.intelligence) 
       statMods.push(monster.wisdom) 
       statMods.push(monster.charisma)

       statMods.forEach(stat => {
        const statPos = statMods.indexOf(stat);
        if (stat === 1 ) {
            statMods[statPos] = '-5'
        } else if(stat <= 3) {
            statMods[statPos] = '-4'
        } else if(stat <= 5) {
            statMods[statPos] = '-3'
        } else if(stat <= 7) {
            statMods[statPos] = '-2'
        } else if(stat <= 9) {
            statMods[statPos] = '-1'
        } else if(stat <= 11) {
            statMods[statPos] = '0'
        } else if(stat <= 13) {
            statMods[statPos] = '+1'
        } else if(stat <= 15) {
            statMods[statPos] = '+2'
        } else if(stat <= 17) {
            statMods[statPos] = '+3'
        } else if(stat <= 19) {
            statMods[statPos] = '+4'
        } else if(stat <= 21) {
            statMods[statPos] = '+5'
        } else if(stat <= 23) {
            statMods[statPos] = '+6'
        } else if(stat <= 25) {
            statMods[statPos] = '+7'
        } else if(stat <= 27) {
            statMods[statPos] = '+8'
        } else if(stat <= 29) {
            statMods[statPos] = '+9'
        } else {
            statMods[statPos] = '+10'
        }  
        
       })

        return {
            ...monster,
            statMods 
        } 
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