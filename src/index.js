import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { SnackbarProvider } from 'notistack';
import { store } from './redux/store';
import { Provider } from 'react-redux';
// export const BROWSER_HISTORY = createBrowserHistory();

ReactDOM.render(
    
    <Provider store={store}>
        <Router>
            <SnackbarProvider maxSnack={5}>
                <App />
            </SnackbarProvider>
        </Router>
    </Provider>
    ,
  document.getElementById('root')
);


