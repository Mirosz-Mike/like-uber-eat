const connexion = require('./../config');
require('dotenv').config()

module.exports.data_eat = function(req, res) {
  connexion.query('SELECT * FROM data_eat', function(err, result) {
    if (err) {
      console.log(err);  
    } else {
      return res.status(200).send(result);
    }
  })
}