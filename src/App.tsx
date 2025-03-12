import { FC, useEffect, useState } from 'react';
import Filter from '@/components/Filter/Filter';
import Button from '@/components/Button';
import { ETypeFilterTicket } from '@/types/enums/ETypeFilterTicket';
import { EBorderRadiusType } from '@/components/Button/EBorderRadiusType';
import TicketPreview from '@/components/TicketPreview';
import { useDispatch, useSelector } from 'react-redux';
import { changeTypeSorted, typeSortedSelect } from '@/store/slices/typeSorted';
import {
  isItemsTrue,
  toggleTransferFiltersItem,
  transferFiltersSelect,
} from '@/store/slices/transferFilter';
import {
  selectFetchTicketsStatus,
  selectTicketsMemo,
} from '@/store/slices/aviasales';
import EStatusFetch from './types/enums/EStatusFetch';
import { useAppStore } from '@/hooks/store';

const App: FC<{ loadApp: () => void }> = ({ loadApp }) => {
  const [ticketsLength, setTicketsLength] = useState(5);
  const [isOnline, setIsOnline] = useState(true);
  const dispatch = useDispatch();
  const typeTicket = useSelector(typeSortedSelect);
  const transferFilterItems = useSelector(transferFiltersSelect);
  const tickets = useSelector(selectTicketsMemo).slice(0, ticketsLength);
  const fetchTicketsStatus = useSelector(selectFetchTicketsStatus);
  const store = useAppStore();

  useEffect(() => {
    const updateIsOnline = () => {
      setIsOnline(navigator.onLine);

      if (
        navigator.onLine &&
        store.getState().aviasales.fetchTicketsStatus !== EStatusFetch.Succeeded
      ) {
        loadApp();
      }
    };

    window.addEventListener('offline', updateIsOnline);
    window.addEventListener('online', updateIsOnline);

    return () => {
      window.removeEventListener('offline', updateIsOnline);
      window.removeEventListener('online', updateIsOnline);
    };
  }, [store, loadApp]);

  function onChangeTransferFilter(id: number) {
    dispatch(toggleTransferFiltersItem(id));
  }

  function load5Tickets() {
    setTicketsLength((ticketsLength) => ticketsLength + 5);
  }

  return (
    <div className="app">
      <header className="header">
        <img src="Logo.svg" alt="logo" className="header__logo" />
      </header>
      <aside className="app__aside">
        <Filter
          title="Количество пересадок"
          items={transferFilterItems}
          onChangeItem={onChangeTransferFilter}
        />
      </aside>
      <main className="app__main">
        <div className="app__buttons">
          <Button
            text="Самый дешевый"
            brandButton={typeTicket === ETypeFilterTicket.Cheapest}
            borderType={EBorderRadiusType.Left}
            onClick={() => {
              dispatch(changeTypeSorted(ETypeFilterTicket.Cheapest));
            }}
          />
          <Button
            text="Самый быстрый"
            brandButton={typeTicket === ETypeFilterTicket.Fastest}
            onClick={() => {
              dispatch(changeTypeSorted(ETypeFilterTicket.Fastest));
            }}
          />
          <Button
            text="Оптимальный"
            brandButton={typeTicket === ETypeFilterTicket.Optimal}
            borderType={EBorderRadiusType.Right}
            onClick={() => {
              dispatch(changeTypeSorted(ETypeFilterTicket.Optimal));
            }}
          />
        </div>
        <div className="app__filters">
          <Filter
            title="Количество пересадок"
            items={transferFilterItems}
            onChangeItem={onChangeTransferFilter}
          />
        </div>
        <section className="app__section">
          {!isOnline ? (
            <div>Connection failed</div>
          ) : (
            <>
              {fetchTicketsStatus === EStatusFetch.Loading && (
                <div className="loader"></div>
              )}

              {tickets.map((ticket) => {
                return <TicketPreview key={ticket.id} ticket={ticket} />;
              })}

              {!!tickets.length && (
                <Button
                  customClass="app__button-load"
                  text="Показать еще 5 билетов!"
                  brandButton
                  borderType={EBorderRadiusType.Both}
                  onClick={load5Tickets}
                />
              )}
              {!isItemsTrue(transferFilterItems) && (
                <div className="app__nothing-found">
                  Рейсов, подходящих под заданные фильтры, не найдено
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
