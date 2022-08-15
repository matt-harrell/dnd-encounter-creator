import { createSlice } from "@reduxjs/toolkit";

 export interface monsterType{
    name:string;
    challenge_rating:number;
    xp:number; 
}

interface EncounterState {
    listOfMonsters:any[];
    encounterExp:number;
}

const initialState = {
    listOfMonsters:[],
    encounterExp:0,
} as EncounterState;

const encounterSlice = createSlice({
    name:'encounter',
    initialState,
    reducers: {
        addMonster(state,action){
            state.listOfMonsters.push(action.payload)
        },
        removeMonster(state,action){
           const monsterToBeRemoved = action.payload;
           if (monsterToBeRemoved > -1){
            state.listOfMonsters.splice(monsterToBeRemoved,1);
           }
        },
        calcEncoutnerXP(state){
            const initialValue = 0;
            const listOfMonsters = state.listOfMonsters
            const monstersXP = listOfMonsters.map(monster => monster.xp);
            let calcEncounterXP =  monstersXP.reduce((prev,current) => prev + current,initialValue);
            if (listOfMonsters.length <= 1) {
                state.encounterExp = calcEncounterXP;
            } else if(listOfMonsters.length === 2)  {
                state.encounterExp = calcEncounterXP * 1.5;
            } else if(listOfMonsters.length <= 6)  {
                state.encounterExp = calcEncounterXP * 2;
            } else if(listOfMonsters.length <= 10)  {
                state.encounterExp = calcEncounterXP * 2.5;
            } else if(listOfMonsters.length <= 14)  {
                state.encounterExp = calcEncounterXP * 3;
            } else if(listOfMonsters.length >= 15)  {
                state.encounterExp = calcEncounterXP * 4;
            }
            

        }
    }

})

export const selectListOfMonsters = (state: { encounter: { listOfMonsters: any[]; }; }) => state.encounter.listOfMonsters;
export const selectEncounterExp = (state: { encounter: { encounterExp: number; }; }) => state.encounter.encounterExp;

export const {addMonster,removeMonster,calcEncoutnerXP} = encounterSlice.actions;

export default encounterSlice.reducer;