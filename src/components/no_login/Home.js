import React, { Component } from 'react';
import imgBackground from '../img/burger.jpg';
import asianFood from '../img/asian_food.png'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


class Home extends Component {
  state = {  }
  render() { 
    return ( 
      <div>
       <Grid container>
        <Grid item xs={6}>
          <div style={style.centerTitle}>
            <div style={style.imgLeft} />
            <h1 style={style.title}>Commandez les plats que vous aimez auprès des restaurants de votre ville et de vos chaînes préférées.</h1>
            <div style={style.buttonRight} >
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="contained" style={{ backgroundColor: '#BB4E31', color: '#fff' }} >Commander</Button>
              </Link>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={style.img}/>
        </Grid>
       </Grid>
      </div>
     );
  }
}


const style = {
  img : {
    backgroundImage: `url(${imgBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '94vh'
  },
  title : {
    fontFamily: 'sans-serif',
    maxWidth:'50%',
    marginBottom: '50px',
    color : '#262626'
  },
  centerTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '94vh',
    flexDirection: 'column',
    backgroundColor: '#F2F2F2',
    backgroundImage: `url(${asianFood})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom 5px left -257px'
  },
  buttonRight: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '50%'
  }
}
 
export default Home;