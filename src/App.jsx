import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import MinigamePage from './pages/MinigamePage';
import StatisticPage from './pages/StatisticPage';
import Error from './pages/Error';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route exact path="/" element={<Navigate to="/home" />} />
        <Route index path="home" element={<HomePage />} />
        <Route path="book" element={<BookPage />} />
        <Route path="minigame" element={<MinigamePage />} />
        <Route path="statistic" element={<StatisticPage />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
export default App;
