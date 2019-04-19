import React, { Component } from 'react';
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

class Register extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword : '',
    name: '',
    errorMessage: '',
    error: false
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ error: false, [name]: value });
  }

  onSubmit = e => {
    e.preventDefault();
    const passwordUser = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    const emaildUser = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    const { email, password, name, confirmPassword } = this.state;

    // faire les verif coté front
    if (email !== '' || password !== '' || name !== '') {
      if (emaildUser.test(email)) {
        console.log('email ', emaildUser.test(email));
        if (passwordUser.test(password)) {
          console.log('password : ', passwordUser.test(password));
          if (password === confirmPassword) {
            console.log('meme password : ', password, confirmPassword);
            fetch('http://localhost:8012/api/register', {
              method: 'POST',
              body: JSON.stringify({name : name, email: email, password: password}),
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' 
              }
            })
            .then(res =>{
              if (res.status === 403) {
                this.setState({ error: true, errorMessage: 'Votre mail existe deja' })
              }
              if (res.status === 200) {
                this.props.history.push("/login")
                console.log('inscrit ', res);
              }
            })
            .catch(function(error) {
              console.log('Request failed', error)
            });
          } else {
            this.setState({ error: true, errorMessage: "Votre mot de passe diffère" })
          }
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
        <div className={classes.container}>
          <div className={classes.main}>
            <Typography component="h1" variant="h5" align="center">
              Inscription
            </Typography>
          {error && (<Typography component="p" align='center'>{errorMessage}</Typography>)}
          <form  onSubmit={this.onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Prénom</InputLabel>
              <Input 
                name="name" 
                autoFocus  
                value={this.state.name}
                onChange={this.handleInputChange} 
                />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input 
                id="email" 
                name="email" 
                autoComplete="email" 
                value={this.state.email}
                onChange={this.handleInputChange} 
                />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input 
                name="password" 
                type="password" 
                id="password" 
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.handleInputChange} 
                />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input 
                name="confirmPassword" 
                type="password" 
                value={this.state.confirmPassword}
                onChange={this.handleInputChange} 
                />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              M'inscrire
            </Button>
          </form>
        </div>
        </div> 
      </div>
    );
  }
}
 
Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);