import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './provider/themeProvider';
import { Provider } from './provider/provider';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: blue
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode >,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
