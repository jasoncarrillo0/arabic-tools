import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import AuthProvider from './contexts/AuthContext';
import CustomRouter from './App/reusable/CustomRouter';
import { BROWSER_HISTORY } from './helpers/constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <CustomRouter history={BROWSER_HISTORY}>
            <SnackbarProvider maxSnack={5}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </SnackbarProvider>
        </CustomRouter>
    </Provider>
);
