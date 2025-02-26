import { FC, useState } from 'react';
import Filter from '@/components/Filter/Filter';
import Button from '@/components/Button';
import { ETypeFilterTicket } from '@/types/enums/ETypeFilterTicket';
import { EBorderRadiusType } from '@/components/Button/EBorderRadiusType';
import TicketPreview from '@/components/TicketPreview';

const App: FC = () => {
  const [typeTicket, setTypeTicket] = useState(ETypeFilterTicket.Cheapest);

  function load5Tickets() {
    console.log('load5Tickets');
  }

  return (
    <div className="app">
      <header className="header">
        <img src="Logo.svg" alt="logo" className="header__logo" />
      </header>
      <aside className="app__aside">
        <Filter title="Количество пересадок" />
      </aside>
      <main className="app__main">
        <div className="app__buttons">
          <Button
            text="Самый дешевый"
            brandButton={typeTicket === ETypeFilterTicket.Cheapest}
            borderType={EBorderRadiusType.Left}
            onClick={() => {
              setTypeTicket(ETypeFilterTicket.Cheapest);
            }}
          />
          <Button
            text="Самый быстрый"
            brandButton={typeTicket === ETypeFilterTicket.Fastest}
            onClick={() => {
              setTypeTicket(ETypeFilterTicket.Fastest);
            }}
          />
          <Button
            text="Оптимальный"
            brandButton={typeTicket === ETypeFilterTicket.Optimal}
            borderType={EBorderRadiusType.Right}
            onClick={() => {
              setTypeTicket(ETypeFilterTicket.Optimal);
            }}
          />
        </div>
        <div className="app__filters">
          <Filter title="Количество пересадок" />
        </div>
        <section>
          <TicketPreview />
          <TicketPreview />
          <TicketPreview />
          <TicketPreview />
          <TicketPreview />
        </section>
        <Button
          customClass="app__button-load"
          text="Показать еще 5 билетов!"
          brandButton
          borderType={EBorderRadiusType.Both}
          onClick={load5Tickets}
        ></Button>
      </main>
    </div>
  );
};

export default App;
