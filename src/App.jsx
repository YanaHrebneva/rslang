import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import MinigamePage from './pages/MinigamePage';
import StatisticPage from './pages/StatisticPage';
import Error from './pages/Error';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="home" element={<HomePage />} />
        <Route path="book" element={<BookPage />} />
        <Route path="minigame" element={<MinigamePage />} />
        <Route path="statistic" element={<StatisticPage />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
export default App;
