import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import { useDispatch, useSelector } from 'react-redux'
import { boolAuthResult, logout } from '../other/slices/auth'


export default function Header() {
  const isAuth = useSelector(boolAuthResult)
  const dispatch = useDispatch()
    const onLogOut = () => {
     const res = window.confirm("Haluatko todella lähteä?")
     if (res) {
        dispatch(logout());
        window.localStorage.removeItem('token')
     }
    }
  return (
    <header className='header'>
        <div className='header-container'>
        <Link to={'/mywords'}>Minun sanat</Link>
        <Link to={'/getwords'}>Hanki sanat</Link>
        <Link to={'/phrases'}>Lauseet</Link>
        {isAuth? <Link onClick={() => onLogOut()} to={'/login'}>Mene ulos</Link> : <Link to={'/login'}>Kirjaudu</Link>}
        </div>
    </header>
  )
}
