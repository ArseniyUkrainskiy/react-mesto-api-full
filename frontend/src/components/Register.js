import React, { useState } from 'react'
import AuthForm from './AuthForm.js'
import { Link } from 'react-router-dom'

function Register({ onRegister }) {
  const [data, setData] = useState({ password: '', email: '' })

  function handleChange(e) {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  function handleSubmit(e) {
    e.preventDefault()
    const { password, email } = data
    onRegister(password, email)
  }
  return (
    <AuthForm
      title="Регистрация"
      btnText="Зарегистрироваться"
      onSubmit={handleSubmit}
      onChange={handleChange}
      data={data}>
      <span className="auth__caption">
        Уже зарегистрированы?<>&nbsp;</>
        <Link className="auth__caption-link" to="/sign-in">
          Войти
        </Link>
      </span>
    </AuthForm>
  )
}

export default Register
