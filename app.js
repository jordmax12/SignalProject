const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8080;
var middleware = require('./routes/middleware');
var api = require('./routes/api');
var routes = require('./routes/index');
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(express.static(__dirname + '/views/assets'));
app.use(express.static(__dirname + '/views/assets/css'));
// Here we can do user validation middleware before accessing anything.
app.use('*', middleware)
app.use(api);
app.use('/', routes);

app.listen(port, () => console.log(`listening on port ${port}`));