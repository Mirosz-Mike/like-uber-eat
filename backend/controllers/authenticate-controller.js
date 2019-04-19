const connexion = require('./../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports.authenticate = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const passwordUser = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  const emaildUser = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emaildUser.test(email)) {
    if (passwordUser.test(password)) {
      connexion.query('SELECT * FROM users WHERE email = ?', email, function (err, results, fields) {
        if (err) throw err.message;
        else {
          if (results.length > 0) {
            bcrypt.compare(password, results[0].password, function(err, ress) {
              if(!ress){
                return res.status(403).send('Email ou password non valide')
              }else{
                const newToken = jwt.sign({email}, process.env.SECRET_TOKEN_JWT, { expiresIn: '1h' })                
                return res.status(200).send({
                  token : newToken,
                  name: results[0].name
                }).json()
              }
            });  
        } else {
            return res.status(403).send('Ce mail n\existe pas')
          }
        }
      })
    } else {
      return res.status(403).send(`Votre mot de passe doit contenir au moins
      - 1 caractère alphabétique minuscule.
      - 1 caractère alphabétique majuscule.
      - 1 caractère numérique.
      - 1 caractère spécial.
      - Votre mot de passe doit comporter 8 au minimum caractèreturn res`)
    }
  } else {
    return res.status(403).send('Votre mail est non valide')
  }
}