// array of players each with name,level 
// based on the level they will be given the appropriate xp threshhold of easy,medium, hard, deadly
//  this will be used to compare with ecounter xp and set it's diffculty

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import XPThreshholds from '../util/playerXPThresholds.json';

interface XPThreshhold {
    easy:number;
    medium:number,
    hard:number,
    deadly:number,
    
}

interface player {
    name:string,
    playerClass:string,
    level:number,
    XPThreshhold:XPThreshhold,
}

interface PlayersState {
    players:player[],
    levels:number[],
    encounterDifficulty:string,
    easyThreshold:number,
    mediumThreshold:number,
    hardThreshold:number,
    deadlyThreshold:number,
}


const initialState = {
    players:[],
    levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    encounterDifficulty:'No Monsters Added',
    easyThreshold:0,
    mediumThreshold:0,
    hardThreshold:0,
    deadlyThreshold:0,

} as PlayersState;

const playersSlice = createSlice({
    name:'players',
    initialState,
    reducers:{
        addPlayer(state,action:PayloadAction<player>){
            const {name,playerClass,level} = action.payload;
            state.players.push({name:name,playerClass:playerClass,level:level, XPThreshhold:{easy:0,medium:0,hard:0,deadly:0}})
            const addedPlayer = state.players[state.players.length - 1];
            let playerlevel: keyof typeof XPThreshholds;
            for (playerlevel in XPThreshholds) {
                if(Number(playerlevel) === addedPlayer.level){
                    const { easy,medium, hard, deadly} = XPThreshholds[playerlevel];
                    addedPlayer.XPThreshhold = {
                        easy:easy,
                        medium:medium,
                        hard:hard,
                        deadly:deadly
                    }
                    break;
                }   
            }

        },
        removePlayer(state,action){
            const playerToBeRemoved = action.payload;
            if (playerToBeRemoved > -1){
             state.players.splice(playerToBeRemoved,1);
            }
        },
        changedifficulty(state,action){
            state.encounterDifficulty = action.payload
        },
        setEasyThreshhold(state,action){
            state.easyThreshold = action.payload;
        },
        setMediumThreshhold(state,action){
            state.mediumThreshold = action.payload;
        },
        setHardThreshhold(state,action){
            state.hardThreshold = action.payload;
        },
        setDeadlyThreshhold(state,action){
            state.deadlyThreshold = action.payload;
        },
    },
})

export const selectPlayers = (state: { players: { players: player[]; }; }) => state.players.players;
export const selectLevels = (state: { players: { levels: number[]; }; }) => state.players.levels;
export const selectEasyThreshhold = (state: { players: { easyThreshold: number; }; }) => state.players.easyThreshold;
export const selectMediumThreshhold = (state: { players: { mediumThreshold: number; }; }) => state.players.mediumThreshold;
export const selectHardThreshhold = (state: { players: { hardThreshold: number; }; }) => state.players.hardThreshold;
export const selectDeadlyThreshhold = (state: { players: { deadlyThreshold: number; }; }) => state.players.deadlyThreshold;
export const selectEncounterDifficulty = (state: { players: { encounterDifficulty: string; }; }) => state.players.encounterDifficulty;

export const {
                addPlayer,
                removePlayer,
                changedifficulty,
                setEasyThreshhold,
                setMediumThreshhold,
                setHardThreshhold,
                setDeadlyThreshhold,
            } = playersSlice.actions;

export default playersSlice.reducer;