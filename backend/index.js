const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

const authenticateController = require('./controllers/authenticate-controller');
const registerController = require('./controllers/register-controller');
const dataEatController = require('./controllers/data_eat-controller')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

app.post('/api/register', registerController.register);
app.post('/api/authenticate', authenticateController.authenticate);
app.get('/api/eat', dataEatController.data_eat)


app.listen(8012);