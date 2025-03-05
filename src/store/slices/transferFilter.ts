import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  transferFilters: [
    { id: 0, title: 'Все', value: false },
    { id: 1, title: 'Без пересадок', value: false },
    { id: 2, title: '1 пересадка', value: false },
    { id: 3, title: '2 пересадки', value: false },
    { id: 4, title: '3 пересадки', value: false },
  ],
};

type TState = typeof initialState;
export type TTransferFiltersItem = (typeof initialState.transferFilters)[0];

function isItemsTrue(transferFilters: TTransferFiltersItem[]) {
  for (let i = 1; i < transferFilters.length; i++) {
    if (!transferFilters[i].value) {
      return false;
    }
  }

  return true;
}

const transferFilterSlice = createSlice({
  name: 'transferFilter',
  initialState,
  reducers: {
    toggleTransferFiltersItem: (
      state: TState,
      action: PayloadAction<number>,
    ) => {
      const { transferFilters } = state;

      const index = transferFilters.findIndex(
        (item) => item.id === action.payload,
      );

      transferFilters[index].value = !transferFilters[index].value;

      if (action.payload === 0) {
        transferFilters.forEach(
          (item) => (item.value = transferFilters[index].value),
        );
        return;
      }

      if (!transferFilters[index].value) {
        transferFilters[0].value = false;
        return;
      }

      if (isItemsTrue(transferFilters)) {
        transferFilters[0].value = true;
      }
    },
  },
  selectors: {
    transferFilters: (state) => state.transferFilters,
  },
});

export const { toggleTransferFiltersItem } = transferFilterSlice.actions;
export const { transferFilters: transferFiltersSelect } =
  transferFilterSlice.selectors;

export default transferFilterSlice.reducer;
