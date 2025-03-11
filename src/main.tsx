import './index.scss';
import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';
import {
  geSearchId,
  getTicketsWithLongPolling,
} from '@/store/slices/aviasales.ts';

function loadApp() {
  store
    .dispatch(geSearchId())
    .then((searchId) => {
      if (searchId) {
        store.dispatch(getTicketsWithLongPolling());
      }
    })
    .catch((error: unknown) => {
      console.log(error);
      loadApp();
    });
}

loadApp();

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  );
} else {
  throw new Error('Root not found');
}
