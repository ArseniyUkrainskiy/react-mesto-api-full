import React, { useState } from 'react'
import AuthForm from './AuthForm'

function Login({onLogin}) {
  const [data, setData] = useState({ email: '', password: '' })
  function handleChange(e) {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  function handleSubmit(e) {
    e.preventDefault()
    const { email, password } = data
    onLogin({email, password})
  }

  return (
    <AuthForm
      title="Вход"
      btnText="Войти"
      onSubmit={handleSubmit}
      onChange={handleChange}
      data={data}></AuthForm>
  )
}

export default Login
