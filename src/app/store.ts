import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import MonsterCardReducer from '../features/MonsterCardSlice';
import SearchMonsterListReducer from '../features/SearchMonsterListSlice';
import encounterSliceReducer from '../features/encounterSlice';
import playersSliceReducer from '../features/playersSlice';
import ClassSearchSliceReducer from '../features/classSearchSlice';

export const store = configureStore({
  reducer: {
    MonsterCard:MonsterCardReducer,
    SearchMonsterList:SearchMonsterListReducer,
    encounter:encounterSliceReducer,
    players:playersSliceReducer,
    ClassSearch:ClassSearchSliceReducer,
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
