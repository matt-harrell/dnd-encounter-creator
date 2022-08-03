import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import MonsterCardReducer from '../features/MonsterCardSlice';
import SearchMonsterListReducer from '../features/SearchMonsterListSlice';
import encounterSliceReducer from '../features/encounterSlice';

export const store = configureStore({
  reducer: {
    MonsterCard:MonsterCardReducer,
    SearchMonsterList:SearchMonsterListReducer,
    Ecounter:encounterSliceReducer,
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
