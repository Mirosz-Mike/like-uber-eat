const mysql = require('mysql');
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
  //   recipe_id int(11) NOT NULL,
  //   title varchar(255) NOT NULL,
  //   image_url varchar(255) NOT NULL,
  //   source_url varchar(255) NOT NULL,
  //   publisher varchar(255) NOT NULL,
  //   PRIMARY KEY (id)
  //  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1`

  //  connexion.query(tableEat, function (err, result) {
  //   if (err) throw err.message;
  //   console.log("Table created");
  // });
})


module.exports = connexion