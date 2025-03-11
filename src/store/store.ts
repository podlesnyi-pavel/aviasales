import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import typeSortedReducer from '@/store/slices/typeSorted';
import transferFilterReducer from '@/store/slices/transferFilter';
import aviasalesReducer from '@/store/slices/aviasales';
import aviasalesApi from '@/services/api/aviasalesApi';

const extraArgument = {
  aviasalesApi,
};

export const store = configureStore({
  reducer: {
    typeSorted: typeSortedReducer,
    transferFilter: transferFilterReducer,
    aviasales: aviasalesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  typeof extraArgument,
  UnknownAction
>;
