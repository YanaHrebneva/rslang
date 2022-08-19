import React from 'react'
import {Link, Outlet } from 'react-router-dom'

export default function Layout() {
	return (
		<div className='appWrapper'>
			<header className='header'>
				<Link to='/home'>Home</Link>
				<Link to='/book'>Book</Link>
				<Link to='/minigame'>Minigame</Link>
				<Link to='/statistic'>Statistic</Link>
			</header>
			<main className='main'>
				<Outlet />
			</main>
			<footer className='footer'> RSS 2022</footer>
		</div>
	)
}
