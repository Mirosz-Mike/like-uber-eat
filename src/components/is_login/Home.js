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

import axios from 'axios';

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

class Home extends Component {
  state = { 
    panier: []
  }

  // TODO recuperer l'email du compte pour attribuer le panier au user

  getRecipeId = (id) => {
    axios.get(`http://localhost:8012/api/eat/${id}`, {
    })
    .then(res => this.setState({ panier : [...this.state.panier, res.data] }))
  }

  render() { 
    const { classes } = this.props;
    console.log(this.state.panier)
    return ( 
      <div style={{ marginTop: '40px' }} >
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
                    <Button variant="contained" color="primary" className={classes.button} onClick={() => this.getRecipeId(obj.recipe_id)}>
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
 
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);