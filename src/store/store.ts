import { configureStore } from '@reduxjs/toolkit';
import typeSortedReducer from '@/store/slices/typeSorted';
import transferFilterReducer from '@/store/slices/transferFilter';

export const store = configureStore({
  reducer: {
    typeSorted: typeSortedReducer,
    transferFilter: transferFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
