import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import App from './App.jsx';
import request from 'superagent';

const checkAuth = function() {
  if (sessionStorage.getItem('id')) {
    return true;
  } else {
    return false;
  }
}

const routes = () => (
  <Router>
    <div>
      <Route path='/login' component={Login} />
      <Route path='/' render={(props) => (
        checkAuth() ? ( <App {...props} /> ) : ( <Redirect to={'/login'} />)
        )} />
    </div>
  </Router>
)

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      failedLogin: false
    };
  }

  submitHandler(e) {
    e.preventDefault();
    let name = this.state.name;
    this.login(name)
  }

  handleChange(e) {
    this.setState({name: e.target.value})
  }

  login(user) {
    // very basic user login error handling
    if (user && (user.toLowerCase() === 'andy' || user.toLowerCase() === 'amos' || user.toLowerCase() === 'evie')) {
    request
      .post('/auth')
      .query({name: user})
      .then(function(res) {
        sessionStorage.setItem('token', res.body.token);
        sessionStorage.setItem('id', res.body.id);
        this.props.history.push('/');
      }.bind(this))
    } else {
      this.setState({failedLogin: !this.state.failedLogin})
    }
  }

  render() {
    let failedLogin = this.state.failedLogin;
    return (
      <div id='login'>
      <h1>Travel Notes <img src='assets/plane.svg' /></h1>
      <h2>Welcome!</h2>
      <br />
        <form>
          <input placeholder='Enter your name...' type="text" name="name" onChange={(e) => this.handleChange(e)} />
          <br /><br />
          <input className='-btn' type="submit" value="Sign In" onClick={(e) => this.submitHandler(e)}/>
        </form>
        <div className='loginError'>{failedLogin ? 'Please enter a valid user name.' : ''}</div>
      </div>
      )
  }
}

ReactDom.render(
  (
    <div>{routes()}</div>
  ),
  document.getElementById('root')
);
