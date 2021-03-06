var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var about = require('./routes/about');
var help = require('./routes/help');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//enable sass midlewear
app.use(sassMiddleware({
	src: path.join(__dirname, 'sass'),
	dest: path.join(__dirname, 'public/stylesheets'),
	outputStyle: 'compressed',
	prefix:  '/stylesheets'
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/about', about);
app.use('/help', help);

//ammap files
app.use('/map/ammap.js', express.static('node_modules/ammap3/ammap/ammap.js'));
app.use('/map/maps/worldLow.js', express.static('node_modules/ammap3/ammap/maps/js/worldLow.js'));
app.use('/map/themes/light.js', express.static('node_modules/ammap3/ammap/themes/light.js'));
app.use('/map/plugins/responsive/responsive.min.js', express.static('node_modules/ammap3/ammap/plugins/responsive/responsive.min.js'));
app.use('/map/plugins/responsive/responsive.min.js.map', express.static('node_modules/ammap3/ammap/plugins/responsive/responsive.min.js.map'));




// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
