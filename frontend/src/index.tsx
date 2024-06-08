import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import ReadingList from './components/reading_list/ReadingList';
import MenuBar from './components/shared/menu_bar/MenuBar';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Initialize ApolloClient
const client = new ApolloClient({
  // Specify the url of our GraphQl server
  uri: "http://localhost:4000/",
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
          <Route path="/" element={<MenuBar />}></Route>
          <Route path='home' element={<Home />}></Route>
          <Route path='reading-list' element={<ReadingList />}></Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
