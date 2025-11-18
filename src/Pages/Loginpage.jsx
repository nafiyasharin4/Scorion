import React from 'react'
import "../Styles/Login.css"
import Logo from "../assets/logo.jpg.JPEG"

function Loginpage() {
  return (
    <div class="login-container">
    <div class="login-form">
      <h2>Login</h2>
      <form id="loginForm">
        <div class="form-group">
          <label for="username"></label>
          <input type="text" id="username" placeholder="Enter Username" required />
        </div>
        <div class="form-group">
          <label for="password"></label>
          <input type="password" id="password" placeholder="Enter Password" required />
        </div>
        <div class="roles">
          <label><input type="radio" name="role" value="student" /> Student</label>
          <label><input type="radio" name="role" value="teacher" /> Teacher</label>
          <label><input type="radio" name="role" value="parent" /> Parent</label>
        </div>
        <button type="submit">Login</button>
        <div class="links">
          <p><a href="#">Forgot Password?</a></p>
          <p>Don't have an account? <a href="#">Sign Up</a></p>
        </div>
      </form>
    </div> 

    <div class="logo-section">
      <img src={Logo} alt="Scorion Logo" />
    </div>
  
    </div>
  )
}

export default Loginpage