const connexion = require('./../config');
const bcrypt = require('bcrypt');

module.exports.register = async function(req, res) {
  const today = new Date();
  let users = {
    "name": req.body.name,
    "email": req.body.email,
    "password": req.body.password,
    "created_at": today,
    "updated_at" : today
  }

  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(users.password, salt)

  const passwordUser = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  const emaildUser = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emaildUser.test(users.email)) {
    if (passwordUser.test(users.password)) {
      connexion.query('SELECT * FROM users WHERE email = ?', users.email, function(err, results) {
        if (err) throw err;
        if (results.length > 0) {
          res.status(403).send('Ce mail existe déjà')
        } else {
          users = {...users, password: hash}
          connexion.query('INSERT INTO users SET ?', users, function (err, results, fields) {
            if (err) {
              res.status(403).send('there are some error with query' + err.message)
            } else {
              res.status(200).send({
                data: results,
                message: 'user enregistrer avec succès'
              })
            }
          })
        }
      })
    } else {
      res.status(403).send(`Votre mot de passe doit contenir au moins
      - 1 caractère alphabétique minuscule.
      - 1 caractère alphabétique majuscule.
      - 1 caractère numérique.
      - 1 caractère spécial.
      - Votre mot de passe doit comporter 8 au minimum caractères`)
    }
  } else {
    res.status(403).send('Votre mail est non valide')
  }
}