import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { getUserId } from '../../helpers/userId'
import { getJwt } from '../../helpers/jwt'

const styles = {
  card: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 34
  },
  media: {
    height: 240,
  },
};

class HomeUser extends Component {
  state = { 
    error: false,
    panier: [],
  }

  addPurchase = (id, title) => {
    this.setState({ panier : [...this.state.panier, {id : id}, {title : title}] })
  }

  onSubmit = e => {
    e.preventDefault();
    const token = getJwt()
    const title = this.state.panier.filter(obj =>  obj.title)
    const finalTab = title.map(obj => obj.title)

    fetch(`http://localhost:8012/api/purchase?token=${token}`, {
      method: 'POST',
      body: JSON.stringify({user_id: getUserId(), title: finalTab }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res =>{
      console.log(res)
      if (res.status === 200) {
        return res.json();
      }
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });
  }

  render() { 
    const { classes } = this.props;
    return ( 
      <div style={{ marginTop: '40px' }}>
        <Typography>Nombre de commande : {this.state.panier.filter(obj => obj.id).length}</Typography>
        <Button onClick={this.onSubmit}>Valider ma commande</Button>
        <Grid container>
          {this.props.data.map((obj, i) => ( 
            <Grid item xs={3} key={i}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={obj.image_url}
                    title={obj.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {obj.title}
                    </Typography>
                    <Button variant="contained" color="primary" className={classes.button} onClick={() => this.addPurchase(obj.id, obj.title)}>
                      Commander
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
     );
  }
}
 
HomeUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeUser);