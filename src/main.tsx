import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/css/index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import {
  createBrowserRouter,
  RouterProvider,
  NavLink
} from "react-router-dom";
import { CHAT } from './constants/routes';
import { Provider } from 'react-redux'
import store from './store/store'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: CHAT,
    element: <App />,
  },
  {
    path: '/login',
    element: <LoginPage/>
  }
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>


  </React.StrictMode>,
)
