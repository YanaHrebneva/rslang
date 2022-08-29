import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './header.scss';

export default function Header() {
  const { user, logout } = useAuth();

  // const { user } = useAuth();
  // console.log(user?.userId);
  // WordService.addWordToUser(wordId, user.userId)
  return (
    <header className="header">
      <Link to="/home">
        <span className="logo">
          <span className="logo-blue">l</span>
          earn
          <span className="logo-blue">e</span>
          nglish
        </span>
      </Link>
      <nav>
        <Link to="/home">Главная</Link>
        <Link to="/book">Учебник</Link>
        <Link to="/minigame">Игры</Link>
        <Link to="/statistic">Статистика</Link>
      </nav>
      {user
        ? (
          <Button
            onClick={logout}
            startIcon={<img className="login-icon" src="assets/images/logout-img.png" alt="Logo" />}
          />
        )
        : (
          <Link to="/login">
            <img className="login-icon" src="assets/images/login-64.png" alt="Logo" />
          </Link>
        )}
    </header>
  );
}
