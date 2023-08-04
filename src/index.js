import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
//MUI
import { ThemeProvider } from '@emotion/react';
import theme from './mui/theme';
import { StyledEngineProvider } from '@mui/material/styles';
//GRAPHQL
import { ApolloProvider } from '@apollo/client';
import client from './graphQL/client';
//CSS
import './styles/index.css';
import './styles/fonts.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
         <BrowserRouter>
            <StyledEngineProvider injectFirst>
               <App />
            </StyledEngineProvider>
         </BrowserRouter>
      </ApolloProvider>
   </ThemeProvider>
);