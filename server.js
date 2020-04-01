var path = require('path');
var express = require('express');
var logger = require('morgan');
var httpProxy = require('http-proxy');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var uuidv4  = require('uuid').v4;
var config = require('dotenv').config().parsed;
var setRoutes = require('./app/routes');

var isProduction = process.env.NODE_ENV === 'production';
console.log('isProduction', isProduction);

var db_username = config.DB_ADMIN_LOGIN || 'username';
var db_password = config.DB_ADMIN_PASSWORD || 'password';
var db_address = 'mongodb://' + db_username + ':' + db_password + config.DB_URL;

mongoose.connect(db_address, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
	.then(() => console.log('connected to DB'))
	.catch(err => console.log(err));

var app = express();

app.use(session({
	genid: uuidv4,
	secret: uuidv4(),
	saveUninitialized: false,
	resave: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'assets')));

setRoutes(app);

if (!isProduction) {

	var proxy = httpProxy.createProxyServer({
		changeOrigin: true,
		ws: true
	});

	var bundle = require('./tools/bundle.js')();

	app.all('/build/*', function(req, res) {
		console.log('proxying /build ...');
		proxy.web(req, res, {
			target: 'http://localhost:3001'
		});
	});

	proxy.on('error', function(err) {
		console.log('caught proxy err');
	});

}

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.send(500, { message: err.message });
});

app.listen(config.PORT || 3100, function () {
	console.log('Express server listening on port ' + (config.PORT || 3100));
});
