const connexion = require('./../config');
const jwt = require('jsonwebtoken');
require('dotenv').config()

function __query(queryName) {
  return new Promise((resolve, reject) => {
    connexion.query(queryName, function(err, result){
      if (err) {
        console.log('erreur query: ', err)
        reject(err)
      } else {
        resolve(result)
      }
    })
  });
}

module.exports.getRecipeId = function(req, res) {
  const userToken = req.headers['x-auth-token'] || req.query.token
  jwt.verify(userToken, process.env.SECRET_TOKEN_JWT, async (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(403).send(err)
    } else {
      const user_id = req.body.user_id;
      const orders = req.body.title;

      for (let i = 0; i < orders.length; i ++){
        await __query(`INSERT INTO purchase (user_id, title) VALUES (${user_id}, "${orders[i]}")`);
     }

     return res.status(200).send('ok')
    }
  }) 
}