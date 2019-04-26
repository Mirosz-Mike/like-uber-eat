const mysql = require('mysql');
const data = require('./data_eat.json')
require('dotenv').config()

let connexion = mysql.createConnection({
  host : "localhost",
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database : 'like_uber_eat'
})

connexion.connect(err => {
  if (err) throw err;
  console.log('connecté');

  // const tableEat = `CREATE TABLE data_eat (
  //   id int(1) NOT NULL AUTO_INCREMENT,
  //   recipe_id varchar(255) NOT NULL,
  //   title varchar(255) NOT NULL,
  //   image_url varchar(255) NOT NULL,
  //   source_url varchar(255) NOT NULL,
  //   publisher varchar(255) NOT NULL,
  //   PRIMARY KEY (id)
  //  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1`

  // const addColum = 'ALTER TABLE users ADD FOREIGN KEY (purchase_id) REFERENCES data_eat(id);'

  // connexion.query(addColum, function (err, result) {
  //   if (err) throw err;
  //   console.log('foreign key ajouté');
  // });

  // for (let i = 0; i < data.length; i++) {
  //   connexion.query('INSERT INTO data_eat SET ?', data[i], function (err, result) {
  //     if (err) throw err;
  //     //console.log(result)
  //   });
  // }
})


module.exports = connexion