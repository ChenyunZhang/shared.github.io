import { Link, Redirect } from "react-router-dom";
import React from "react";

class LoginForm extends React.Component {
  state = {
    active: "",
    username: "",
    email: "",
    password: ""
  };

  handleOverlaySignin = () => {
    this.props.handleError();
    this.setState({ 
      active: "",
    });
  };
  handleOverlaySignup = () => {
    this.props.handleError();
    this.setState({
      active: "right-panel-active",
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSignin = (e) => {
    e.preventDefault();
    this.props.handleLoginSubmit(this.state);
    this.setState({
      username: "",
      email: "",
      password: "",
    });
  };

  render() {
    return (
      <div className="body">
        {localStorage.token ? <Redirect to="/home" />  : null}
        <div
          className={`login-container ${this.state.active}`}
          id="login-container"
        >
          <div className="form-container sign-up-container">
            <form onSubmit={this.handleSignin}>
              <h1 className="sign-in-font">Create Account</h1>
              <div className="login-error">{this.props.error === "This email address is alredy being registered" ? this.props.error : null}</div>
                <input
                  type="text"
                  placeholder="Name"
                  autoComplete="off"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  required
                />

              <input
                type="email"
                placeholder="Email"
                autoComplete="off"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                required
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />

              <button className="loginform-button">Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={this.handleSignin}>
              <h1 className="sign-in-font">Sign in</h1>
              <div className="login-error" role="alert">{this.props.error=== "Incorrect email address/password" ? this.props.error : null}</div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
              <input
                type="password"
                placeholder="Password"
                autoComplete="off"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              {/* <a href="#">Forgot your password?</a> */}
              <button className="loginform-button">Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p className="login-p">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="loginform-button ghost"
                  id="signIn"
                  onClick={this.handleOverlaySignin}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p className="login-p">
                  Enter your personal details and start journey with us
                </p>
                <button
                  className="loginform-button ghost"
                  id="signUp"
                  onClick={this.handleOverlaySignup}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <Link to="/"> Welcome Page</Link>
      </div>
    );
  }
}

export default LoginForm;
