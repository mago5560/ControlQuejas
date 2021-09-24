const express = require('express');
const path = require('path');
const ngApp = express();
app.use(express.static(__dirname + '/dist/quejas'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/quejas/index.html'));});
ngApp.listen(process.env.PORT || 8080);