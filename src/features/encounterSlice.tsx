import { createSlice } from "@reduxjs/toolkit";

// create encoutner initial state which will be an array of monsters
// the array will be used to populate a table 
// each row will be formated like this
// name of monster  | challege rating | XP || <button to remove monster>
// monsters will be added from the search bar component
// players will be able to remove a monster by clicked on monster 
// user will be able to click on a monster the see their statblock from the monster card comoponet
// IMPORTANT have the loadmonster in searchbar and monstercardslice run once log data in array then call array[index of clicked item] to populate the monster card instead of calling database again 
// everytime a monster is added, the exp counter at the bottom should go up
// this will later be used to subtract exp from players that are added

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
            // push all of monster data from database instead of just 3 properties then use array for monster card instead of calling database again
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