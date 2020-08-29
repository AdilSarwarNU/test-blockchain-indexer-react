import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/styles';
import theme from './Theme/muiTheme';
import {CookiesProvider} from "react-cookie";
import {AppContextProvider} from "./Contexts/AppContext";

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <AppContextProvider>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </AppContextProvider>
    </ThemeProvider>,
    document.getElementById('root')
);
serviceWorker.unregister();
