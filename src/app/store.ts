import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import MonsterCardReducer from '../features/MonsterCardSlice';
import SearchMonsterListReducer from '../features/SearchMonsterListSlice';

export const store = configureStore({
  reducer: {
    MonsterCard:MonsterCardReducer,
    SearchMonsterList:SearchMonsterListReducer,
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
