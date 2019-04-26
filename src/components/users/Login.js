import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Navbar from '../Navbar'

const styles = () => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '92vh'
  },
  main: {
    width: '400px',
  },
  submit: {
    marginTop: '24px'
  },
});

class Login extends Component {
  state = { 
    email: '',
    password: '',
    errorMessage: '',
    error: false
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({error: false, [name]: value });
  }

  onSubmit = e => {
    e.preventDefault();
    const passwordUser = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    const emaildUser = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { email, password } = this.state;

    if (email !== '' || password !== '') {
      if (emaildUser.test(email)) {
        if (passwordUser.test(password)) {
            fetch('http://localhost:8012/api/authenticate', {
              method: 'POST',
              body: JSON.stringify({email: email, password: password}),
              headers: {
                'Content-Type': 'application/json' 
              }
            })
            .then(res =>{
              if (res.status === 403) {
                this.setState({ error: true, errorMessage: 'Votre mail ou password incorrect' })
              }
              if (res.status === 200) {
                return res.json();
              }
            })
            .then(body => {
              localStorage.setItem('name', body.name )
              localStorage.setItem('id_token', body.token)
              localStorage.setItem('userId', body.userId )
              this.props.history.push("/")
            })
            .catch(function(error) {
              console.log('Request failed', error)
            });
        } else {
          this.setState({ error: true, errorMessage: `Votre mot de passe doit contenir au moins
          - 1 caractère alphabétique minuscule.
          - 1 caractère alphabétique majuscule.
          - 1 caractère numérique.
          - 1 caractère spécial.
          - Votre mot de passe doit comporter 8 au minimum caractères` })
        }
      } else {
        this.setState({ error: true, errorMessage: 'Mail non valide' }) 
      }
    } else {
      console.log('Veuillez remplir tous les champs');
    }
  };

  render() { 
    const { error, errorMessage } = this.state;
    const { classes } = this.props;
    return ( 
      <div>
        <Navbar />
        <div className={classes.container} >
          <div className={classes.main}>
            <form onSubmit={this.onSubmit}>
              <Typography variant="h4" align="center">
                Connexion
              </Typography>
              {error && <Typography component="h1" align="center">{errorMessage}</Typography>}
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus  onChange={this.handleInputChange} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleInputChange}  />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Se connecter
              </Button>
            </form>
          </div>
        </div>
      </div>
     );
  }
}
 
Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);