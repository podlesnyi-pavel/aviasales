import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  transferFilters: [
    { id: 0, title: 'Все', isActive: true },
    { id: 1, title: 'Без пересадок', isActive: true, value: 0 },
    { id: 2, title: '1 пересадка', isActive: true, value: 1 },
    { id: 3, title: '2 пересадки', isActive: true, value: 2 },
    { id: 4, title: '3 пересадки', isActive: true, value: 3 },
  ],
};

type TState = typeof initialState;
export type TTransferFiltersItem = (typeof initialState.transferFilters)[0];

export function isItemsTrue(transferFilters: TTransferFiltersItem[]): boolean {
  for (let i = 1; i < transferFilters.length; i++) {
    if (!transferFilters[i].isActive) {
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

      transferFilters[index].isActive = !transferFilters[index].isActive;

      if (action.payload === 0) {
        transferFilters.forEach(
          (item) => (item.isActive = transferFilters[index].isActive),
        );
        return;
      }

      if (!transferFilters[index].isActive) {
        transferFilters[0].isActive = false;
        return;
      }

      if (isItemsTrue(transferFilters)) {
        transferFilters[0].isActive = true;
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
