import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import ReadingList from './components/reading_list/ReadingList';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import App from './App';

// Initialize ApolloClient
const client = new ApolloClient({
  // Specify the url of our GraphQl server
  uri: process.env.REACT_APP_GraphQl_Uri ?? 'http://localhost:4000/',
  // Cache query results after fetching them
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App element={<Home />} />}></Route>
          <Route path="reading-list" element={<App element={<ReadingList />} />}></Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
