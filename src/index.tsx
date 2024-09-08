import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './features/api/apiSlice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApiProvider api={apiSlice}>
    <App/>
  </ApiProvider>
);
