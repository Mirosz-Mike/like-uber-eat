import React, { Component } from 'react';
import axios from 'axios';

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
    const token = getJwt()
    axios.get(`http://localhost:8012/api/eat?token=${token}`)
    .then(res => this.setState({ data: res.data }))
    .catch(error => console.log(error))
  }

  logout = () => {
    localStorage.clear();
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <Navbar logout={this.logout} />
        {!!getJwt() ? <HomeUser data={this.state.data} /> : <Home />}
      </div>
    )
  }
}

export default App;
