var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var index = require('./routes/index');
var users = require('./routes/users');

//models mongoose specific basically instances of documents
var User = require('./models/users');

var app = express();

mongoose.connect('mongodb://michellebecerra:mongo2017@ds147079.mlab.com:47079/ros-survey')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);

//db = mongoose.connection();
//New stuff
//CREATE new USER
var chris = new User({
	name: 'Chris'
});

var me = new User({
	name: 'Michelle'
});

// chris.dudify(function(err, name){
// 	if(err) throw err;

// 	console.log('Your new name is ' + name);
// });

// chris.save(function(err){
// 	if(err) throw err;

// 	console.log('User created');
// });

me.save(function(err){
	if(err) throw err;

	console.log('User created');
});

//READ

app.get('/users', function(req, res){
  User.find({}, function(err, users){
    res.send(users);
  });
});
app.get('/:username', function(req, res){
  var newUser = new User({name: req.params.username });
  newUser.save(function(err){
    if(err) throw err;
    //res.redirect("/");
  //   User.find({name: req.params.username}, function(err, users){
  //   res.send(users);
  // });
  });

});

// app.get('/', function(req, res){
//   //res.render(__dirname + '/views/index.hjs');
//   User.find({}, function(err, users){
//     if(err) throw err;
//     if(users.length > 1){
//       res.render("index", {data: users})
//     } else{
//       res.render("index", {data: "No names"})
//     }
//   });
// });

app.get("/:name", function(req, res){
  var newName = new User({name: req.params.name });
    newName.save(function(err){
    if(err) throw err;
    res.redirect("/");
  });
});

User.remove({}, function(err, user){});
//CREATE
app.post('/quotes', function(req, res){

  User.save(req.body, function(err, result){
    if(err) throw err;
    console.log('saved to database')
    res.redirect('/')
  });
  });

//   // User.find({name: 'Michelle'}, function(err, user){
//   //   if(err) throw err;
//   //   console.log('hello');
//   //   console.log(user);
//   // });

// });


//find all the users
// User.find({}, function(err, users){
// 	if(err) throw err;

// 	console.log(users);
// });
// //find a specific user

// User.find({name: 'Michelle'}, function(err, user){
// 	if(err) throw err;

// 	console.log(user);
// });

//find by id

// User.findById('58a01acb3681c8a880809fb1', function(err, user){
// 	if(err) throw err;
	
// 	console.log(user);
// });

//UPDATE

// User.findById('58a01acb3681c8a880809fb1', function(err, user){
// 	if(err) throw err;

// 	user.name = 'Chris';
// 	user.location = 'usa';

// 	user.save(function(err){
// 		if (err) throw err;

// 		console.log('User successfully updated!');
// 	});
// });

// User.findById('58a01acb3681c8a880809fb1', function(err, user){
// 	if(err) throw err;
	
// 	console.log(user);
// });

//DELETE

// User.findByIdAndRemove('58a01acb3681c8a880809fb2', function(err, user){
// 	if (err) throw err;

// 	user.remove(function(err){
// 		if(err) throw err;

// 		console.log('User successfully deleted');
// 	});
// });

//Note: There is a problem when you delete by id and try to delete again
//I want to be able to find all updated users like using below
//but I can't seem to do that

// User.find({}, function(err, users){
// 	if(err) throw err;

// 	console.log(users);
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
