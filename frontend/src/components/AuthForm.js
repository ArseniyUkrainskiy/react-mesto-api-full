import React from 'react'

function AuthForm({ title, btnText, children, onSubmit, onChange, data }) {
  return (
    <div className="auth">
      <h2 className="auth__title">{title}</h2>
      <form className="auth__form" onSubmit={onSubmit}>
        <input
          pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
          type="email"
          name="email"
          required
          autoComplete="off"
          placeholder="Email"
          minLength="3"
          maxLength="30"
          className="auth__field"
          onChange={onChange}
          value={data.email}></input>
        <input
          type="password"
          name="password"
          required
          autoComplete="off"
          placeholder="Пароль"
          minLength="6"
          maxLength="60"
          className="auth__field"
          onChange={onChange}
          value={data.password}></input>
        <button className="auth__submit" type="submit">
          {btnText}
        </button>
      </form>
      {children}
    </div>
  )
}
export default AuthForm
