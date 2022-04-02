import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { SnackbarProvider } from 'notistack';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
// export const BROWSER_HISTORY = createBrowserHistory();
import { PersistGate } from 'redux-persist/integration/react'
import AuthProvider from './contexts/AuthContext';

ReactDOM.render(
    
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}></PersistGate>
        <Router>
            <SnackbarProvider maxSnack={5}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </SnackbarProvider>
        </Router>
    </Provider>
    ,
  document.getElementById('root')
);


