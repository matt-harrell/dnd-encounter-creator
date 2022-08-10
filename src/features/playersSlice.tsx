// array of players each with name,level 
// based on the level they will be given the appropriate xp threshhold of easy,medium, hard, deadly
//  this will be used to compare with ecounter xp and set it's diffculty

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import XPThreshholds from '../util/playerXPThresholds.json';

interface XPThreshhold {
    easy:number,
    medium:number,
    hard:number,
    deadly:number,
    
}

interface player {
    name:string,
    level:number
    XPThreshhold:XPThreshhold | {};
}

interface PlayersState {
    players:player[],
    levels:number[],
}


const initialState = {
    players:[],
    levels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

} as PlayersState; 

const playersSlice = createSlice({
    name:'players',
    initialState,
    reducers:{
        addPlayer(state,action:PayloadAction<player>){
            const {name, level} = action.payload;
            state.players.push({name:name,level:level, XPThreshhold:{}})
            // grab last player that was pushed
            const addedPlayer = state.players[state.players.length - 1];
            // find out their XP thresholld
            // add the xpThreshhold value to the player
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
                }
            }
        },
    },
})

export const selectPlayers = (state: { players: { players: player[]; }; }) => state.players.players;
export const selectLevels = (state: { players: { levels: number; }; }) => state.players.levels;

export const {addPlayer} = playersSlice.actions;

export default playersSlice.reducer;