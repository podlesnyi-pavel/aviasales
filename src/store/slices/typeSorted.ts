import { ETypeFilterTicket } from '@/types/enums/ETypeFilterTicket';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  typeSorted: ETypeFilterTicket.Cheapest,
};

type TState = typeof initialState;

const typeSortedSlice = createSlice({
  name: 'typeSorted',
  initialState,
  reducers: {
    changeTypeSorted: (
      state: TState,
      action: PayloadAction<ETypeFilterTicket>,
    ) => {
      state.typeSorted = action.payload;
    },
  },
  selectors: {
    typeSorted: (state) => state.typeSorted,
  },
});

export const { changeTypeSorted } = typeSortedSlice.actions;
export const { typeSorted: typeSortedSelect } = typeSortedSlice.selectors;

export default typeSortedSlice.reducer;
