import React from 'react';
import { Link } from 'react-router-dom';
import { getJwt } from '../helpers/jwt';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { name } from '../helpers/name'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    textDecoration: 'none'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  buttonWhite : {
    color: 'white',
  }
};

function Navbar(props) {
  const { classes } = props;
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: '#BB4E31' }}>
        <Toolbar>
          <Link to="/" className={classes.grow}>
            <Typography variant="h6" className={classes.buttonWhite}>
              J'ai faim !    
            </Typography>
          </Link>  
          {!!getJwt() ? <Typography component="h1" variant="h6" className={classes.buttonWhite}>Bienvenue {name()}</Typography> : 
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button className={classes.buttonWhite}>Inscription</Button>
            </Link>
          }
          {!!getJwt() ? <Button className={classes.buttonWhite} onClick={props.logout}>Deconnexion</Button> : 
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button className={classes.buttonWhite}>Connexion</Button>
            </Link> 
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);