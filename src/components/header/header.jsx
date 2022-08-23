import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

export default function Header() {
  return (
    <header className="header">
      <span className="logo">
        <span className="logo-blue">l</span>
        earn
        <span className="logo-blue">e</span>
        nglish
      </span>
      <nav>
        <Link to="/home">Главная</Link>
        <Link to="/book">Учебник</Link>
        <Link to="/minigame">Игры</Link>
        <Link to="/statistic">Статистика</Link>
      </nav>
      <Link to="/login">
        <img className="login-icon" src="assets/images/login-64.png" alt="Logo" />
      </Link>
    </header>
  );
}
