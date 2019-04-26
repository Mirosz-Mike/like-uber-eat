const connexion = require('./../config');
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports.data_eat = async function(req, res, next) {
  const userToken = req.headers['x-auth-token'] || req.query.token

  jwt.verify(userToken, process.env.SECRET_TOKEN_JWT, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(403).send(err)
    } else {
      connexion.query('SELECT * FROM data_eat', function(err, result) {
        if (err) {
          console.log(err);
          return res.status(403).send(err);  
        } else {
          return res.status(200).send(result);
        }
      })
      console.log('tout va bien')
    }
  })
}