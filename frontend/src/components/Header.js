import React, { useEffect, useState } from 'react'
import logo from '../images/logo.svg'
import { Link, useLocation } from 'react-router-dom'

function Header({ userEmail, onSignOut }) {
  const [burger, setBurger] = useState(false)
  const [caption, setCaption] = useState({
    link: '',
    linkName: '',
    email: '',
  })
  const location = useLocation()
  useEffect(() => {
    switch (location.pathname) {
      case '/sign-up':
        setCaption({ link: '/sign-in', linkName: 'Войти' })
        break
      case '/sign-in':
        setCaption({ link: '/sign-up', linkName: 'Регистрация' })
        break
      case '/':
        setCaption({ link: '/sign-up', linkName: 'Выйти', email: userEmail.email })
        break
      default:
        console.log('ошибка в маршрутизации')
        setCaption({ link: '/sign-in', linkName: 'Войти' })
        break
    }
  }, [location, userEmail.email])

  function handleBurger(e) {
    e.preventDefault()
    setBurger(!burger)
  }

  return (
    <>
      {burger && (
        <div
          style={{
            minHeight: '142px',
            borderBottom: '1px solid rgba(84, 84, 84, 0.7)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {userEmail && (
            <span className="auth__caption-email auth__caption-email_active">{caption.email}</span>
          )}
          {caption.email ? (
            <button
              onClick={onSignOut}
              className="auth__caption-button auth__caption-button_active">
              {caption.linkName}
            </button>
          ) : (
            <Link className="auth__caption-link auth__caption-link_header" to={caption.link}>
              {caption.linkName}
            </Link>
          )}
        </div>
      )}
      <header className="header">
        <img className="header__logo" src={logo} alt="Место" />
        {caption.email && (
          <button
            className={`header__btn-burger ${burger && 'header__btn-burger_active'}`}
            onClick={handleBurger}>
            <span></span>
          </button>
        )}
        {userEmail && <span className="auth__caption-email">{caption.email}</span>}
        {caption.email ? (
          <button onClick={onSignOut} className="auth__caption-button">
            {caption.linkName}
          </button>
        ) : (
          <Link className="auth__caption-link auth__caption-link_header" to={caption.link}>
            {caption.linkName}
          </Link>
        )}
      </header>
    </>
  )
}

export default Header
