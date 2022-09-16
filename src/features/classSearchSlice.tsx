import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const loadClassList = createAsyncThunk(
    'ClassSearch/loadClassList',
    async () => {
        const response = await fetch('https://www.dnd5eapi.co/api/classes');
        const classListAPI = await response.json();
        return classListAPI.results.map((playerClass: { name: string; }) => playerClass.name);

    }
);

interface ClassSearchState {
    playerClassList:string[] | [];
    selectedClass:string;
}

const initialState = {
    playerClassList:[],
    selectedClass:'',
} as ClassSearchState;


const ClassSearchSlice = createSlice({
    name:'ClassSearch',
    initialState,
    reducers:{
        addClass(state,action){
            state.selectedClass = action.payload
        },
        addClassToClassList(state,action:PayloadAction<string>){
            const playerClassList:string[] = state.playerClassList;
            playerClassList.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadClassList.pending,(state) =>{
            state.playerClassList = [];
        })
        .addCase(loadClassList.rejected,(state) =>{
            state.playerClassList = [];
        })
        .addCase(loadClassList.fulfilled,(state,action) => {
            state.playerClassList = action.payload;
        })
    }
})

export const selectClassList = (state: { ClassSearch: { playerClassList: string[] | []; }; }) => state.ClassSearch.playerClassList;
export const selectSelectedClass = (state: { ClassSearch: { selectedClass: string; }; }) => state.ClassSearch.selectedClass;

export const {addClass, addClassToClassList} = ClassSearchSlice.actions;

export default ClassSearchSlice.reducer;