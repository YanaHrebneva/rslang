import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/header';

export default function Layout() {
  return (
    <div className="appWrapper">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer"> RSS 2022</footer>
    </div>
  );
}
