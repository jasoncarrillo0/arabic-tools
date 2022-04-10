import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import AuthProvider from './contexts/AuthContext';

ReactDOM.render(
    
    <Provider store={store}>
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


