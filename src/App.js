import React, { Component } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import { getJwt } from './helpers/jwt';
import './App.css';

import Navbar from './components/Navbar';
import HomeUser from './components/is_login/Home';
import Home from './components/no_login/Home'

class App extends Component {

  state = {
    name: '',
    data: []
  }

  componentDidMount() {
    const getToken = getJwt();
    jwt.verify(getToken, 'javascript is awesome', (err, decoded) => {
      if (err) {
        console.log('Veuillez vous reconnecter')
        localStorage.clear();
        this.props.history.push("/")
      }
      else {
        axios.get('http://localhost:8012/api/eat', {
        })
        .then(res => this.setState({ data: res.data }))
      }
    })
  }

  logout = () => {
    localStorage.clear();
    this.props.history.push("/")
  }

  render() {
    console.log(!!getJwt())
    return (
      <div>
        <Navbar logout={this.logout} />
        {!!getJwt() ? <HomeUser data={this.state.data} /> : <Home />}
      </div>
    )
  }
}

export default App;
