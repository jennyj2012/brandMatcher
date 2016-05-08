var express = require('express');
var path = require('path');



var app = express();

app.use('*/dist', express.static(path.join(__dirname, '/dist')));

require('./routes.js')(app);
var port = 8080;
app.listen(port);
console.log('Listening on port ' + port);


