import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

export default function Header() {
  return (
    <header className="header">
      <span>RS Lang</span>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/book">Book</Link>
        <Link to="/minigame">Minigame</Link>
        <Link to="/statistic">Statistic</Link>
      </nav>
      <Link to="/login">
        <img className="login-icon" src="assets/images/login-64.png" alt="Logo" />
      </Link>
    </header>
  );
}
