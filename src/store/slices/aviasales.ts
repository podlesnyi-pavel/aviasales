import {
  aviasalesTicketResponseSchema,
  TAviasalesTicket,
  TAviasalesTicketWithId,
} from '@/types/aviasales/IAvisalesTicket';
import EStatusFetch from '@/types/enums/EStatusFetch';
import {
  createSlice,
  PayloadAction,
  nanoid,
  createSelector,
} from '@reduxjs/toolkit';
import { AppThunk } from '@/store/store';
import {
  transferFiltersSelect,
  TTransferFiltersItem,
} from '@/store/slices/transferFilter';
import { typeSortedSelect } from '@/store/slices/typeSorted';
import { ETypeFilterTicket } from '@/types/enums/ETypeFilterTicket';

interface IAviasalesState {
  searchId: string;
  fetchSearchIdStatus: EStatusFetch;
  tickets: TAviasalesTicketWithId[];
  fetchTicketsStatus: EStatusFetch;
}

const initialState: IAviasalesState = {
  searchId: '',
  fetchSearchIdStatus: EStatusFetch.Idle,
  tickets: [],
  fetchTicketsStatus: EStatusFetch.Idle,
};

const aviasalesSlice = createSlice({
  name: 'aviasales',
  initialState,
  reducers: {
    setSearchId: (state: IAviasalesState, action: PayloadAction<string>) => {
      state.searchId = action.payload;
    },
    changeFetchSearchIdStatus: (
      state: IAviasalesState,
      action: PayloadAction<EStatusFetch>,
    ) => {
      state.fetchSearchIdStatus = action.payload;
    },
    changeFetchTicketsStatus: (
      state: IAviasalesState,
      action: PayloadAction<EStatusFetch>,
    ) => {
      state.fetchTicketsStatus = action.payload;
    },
    setTickets: (
      state: IAviasalesState,
      action: PayloadAction<TAviasalesTicket[]>,
    ) => {
      state.tickets = [
        ...state.tickets,
        ...action.payload.map((item) => ({ ...item, id: nanoid() })),
      ];
    },
  },
  selectors: {
    fetchTicketsStatus: (state) => state.fetchTicketsStatus,
    tickets: (state) => state.tickets,
  },
});

export default aviasalesSlice.reducer;
export const {
  setSearchId,
  changeFetchSearchIdStatus,
  changeFetchTicketsStatus,
  setTickets,
} = aviasalesSlice.actions;
export const {
  fetchTicketsStatus: selectFetchTicketsStatus,
  tickets: ticketsSelect,
} = aviasalesSlice.selectors;

export const selectTicketsMemo = createSelector(
  transferFiltersSelect,
  typeSortedSelect,
  ticketsSelect,
  (
    filters: TTransferFiltersItem[],
    typeSorted: ETypeFilterTicket,
    tickets: TAviasalesTicketWithId[],
  ) => {
    const filteredTickets = tickets.filter((item) => {
      return !filters.some(
        (filter) =>
          !filter.isActive &&
          (item.segments[0].stops.length === filter.value ||
            item.segments[1].stops.length === filter.value),
      );
    });

    const cheapestFunc = (
      a: TAviasalesTicketWithId,
      b: TAviasalesTicketWithId,
    ) => {
      return a.price - b.price;
    };

    const fastestFunc = (
      a: TAviasalesTicketWithId,
      b: TAviasalesTicketWithId,
    ) => {
      return (
        a.segments[0].duration +
        a.segments[0].duration -
        (b.segments[1].duration + b.segments[1].duration)
      );
    };

    const optimalFunc = (
      a: TAviasalesTicketWithId,
      b: TAviasalesTicketWithId,
    ) => {
      const totalDurationA = a.segments[0].duration + a.segments[1].duration;
      const totalDurationB = b.segments[0].duration + b.segments[1].duration;

      return a.price + totalDurationA - (b.price + totalDurationB);
    };

    switch (typeSorted) {
      case ETypeFilterTicket.Cheapest:
        return filteredTickets.sort(cheapestFunc);

      case ETypeFilterTicket.Fastest:
        return filteredTickets.sort(fastestFunc);

      case ETypeFilterTicket.Optimal:
        return filteredTickets.sort(optimalFunc);
    }
  },
);

export const geSearchId =
  (): AppThunk<Promise<string>> =>
  (dispatch, getState, { aviasalesApi }) => {
    const isIdle =
      getState().aviasales.fetchSearchIdStatus === EStatusFetch.Idle;

    if (!isIdle) {
      return Promise.resolve('');
    }

    dispatch(changeFetchSearchIdStatus(EStatusFetch.Loading));

    return aviasalesApi
      .getSearchId()
      .then((result) => {
        dispatch(setSearchId(result.searchId));
        dispatch(changeFetchSearchIdStatus(EStatusFetch.Succeeded));

        return result.searchId;
      })
      .catch((error: unknown) => {
        console.log(error);
        dispatch(changeFetchSearchIdStatus(EStatusFetch.Failed));
        return Promise.reject(new Error(String(error)));
      })
      .finally(() => {
        dispatch(changeFetchSearchIdStatus(EStatusFetch.Idle));
      });
  };

export const getTicketsWithLongPolling = (): AppThunk =>
  async function subscribe(dispatch, getState, { aviasalesApi }) {
    dispatch(changeFetchTicketsStatus(EStatusFetch.Loading));
    const response = await aviasalesApi.getTicketsWithLongPolling(
      getState().aviasales.searchId,
    );

    if (response.status == 502) {
      await subscribe(dispatch, getState, { aviasalesApi });
    } else if (response.status != 200) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await subscribe(dispatch, getState, { aviasalesApi });
    } else {
      const result: unknown = await response.json();
      const parsedResult = aviasalesTicketResponseSchema.parse(result);

      dispatch(setTickets(parsedResult.tickets));

      if (!parsedResult.stop) {
        await subscribe(dispatch, getState, { aviasalesApi });
      } else {
        dispatch(changeFetchTicketsStatus(EStatusFetch.Succeeded));
      }
    }
  };
