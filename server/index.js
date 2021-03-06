var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
const port = process.env.PORT || 9000;

//Create Application
var app = express();

//Add middleware for REST API
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//CORS Support
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

/*app.use('/hello', function(req, res, next){
    res.send('Hello World!');
    next();
})*/

//Connect to mongoDB
/*mongoose.connect('mongodb://localhost/MEAN_App');*/
mongoose.connect('mongodb://utkarshkasana:*Indian88@ds257838.mlab.com:57838/utkarshkasana1');
mongoose.connection.once('open', function(){

    //Load the models.
    app.models = require('./models/index');

    //Load the routes.
    var routes = require('./routes');
    _.each(routes, function (controller, route) {
        app.use(route, controller(app, route));
    });

    /*console.log('Listening on port 3000...');
    app.listen(3000);*/
    app.listen(port);
});