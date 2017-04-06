import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import App from './App.jsx';
import request from 'superagent';
// import Login from './Login.jsx';


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
      name: undefined
    };
  }

  componentDidMount() {
    console.log(this.props)
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
    request
      .post('/auth')
      .query({name: user})
      .then(function(res) {
        sessionStorage.setItem('token', res.body.token);
        sessionStorage.setItem('id', res.body.id);
        console.log('authed', this.props);

        this.props.history.push('/');
      }.bind(this))
  }

  render() {

    return (
      <div id='login'>
      <h1>Travel Notes <img src='assets/plane.svg' /></h1>
        <form>
          <input placeholder='Enter your name...' type="text" name="name" onChange={(e) => this.handleChange(e)} />
          <br /><br />
          <input type="submit" value="Submit" onClick={(e) => this.submitHandler(e)}/>
        </form>
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
