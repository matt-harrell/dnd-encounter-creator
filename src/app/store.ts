import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import MonsterCardReducer from '../features/MonsterCardSlice';
import SearchMonsterListReducer from '../features/SearchMonsterListSlice';
import encounterSliceReducer from '../features/encounterSlice';
import playersSliceReducer from '../features/playersSlice';
import ClassSearchSliceReducer from '../features/classSearchSlice';
import SearchBarsDrawerSliceReducer from '../features/searchBarsDrawerSlice'

export const store = configureStore({
  reducer: {
    MonsterCard:MonsterCardReducer,
    SearchMonsterList:SearchMonsterListReducer,
    encounter:encounterSliceReducer,
    players:playersSliceReducer,
    ClassSearch:ClassSearchSliceReducer,
    searchDrawer:SearchBarsDrawerSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
