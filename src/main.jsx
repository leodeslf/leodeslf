import './sass/main.scss';
import { createRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import App from './App';
import store from './stores/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
inject();
