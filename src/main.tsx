import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/css/index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { CHAT, SIGNIN, SIGNUP } from './constants/routes';
import { Provider } from 'react-redux'
import store from './store/store'
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

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
    path: SIGNIN,
    element: <SignInPage />,
  },
  {
    path: SIGNUP,
    element: <SignUpPage/>
  },
  {
    path: '/msg',
    element: <ChatPage/>
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
