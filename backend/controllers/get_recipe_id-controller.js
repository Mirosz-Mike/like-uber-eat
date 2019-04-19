const connexion = require('./../config');


module.exports.getRecipeId = function(req,res) {
  connexion.query('SELECT * FROM data_eat WHERE recipe_id = ?', req.params.id, function(err, result){
    if (err) {
      console.log(err);  
    } else {
      return res.status(200).send(result);
    }
  })
}