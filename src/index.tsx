import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'typeface-roboto';
import { ThemeProvider } from '@material-ui/styles';
import {
  // this is needed as a temporary solution to:
  // "findDOMNode is deprecated in StrictMode" caused by MaterialUI theming
  unstable_createMuiStrictModeTheme as createMuiTheme,
  CssBaseline,
  responsiveFontSizes,
} from '@material-ui/core';
import { Provider } from 'react-redux';
import store from './store/store';

const theme = responsiveFontSizes(createMuiTheme());

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
