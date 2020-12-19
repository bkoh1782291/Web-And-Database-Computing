var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

var sanitizeHtml = require('sanitize-html');
var argon2 = require('argon2');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var connection = mysql.createPool({
   host     : 'localhost',
   database : 'taskmanager'
});

var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(function(req, res, next){
    req.pool = connection;
    next();
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());



app.post('/signup', async function(req, res, next) {

    var username = sanitizeHtml(req.body.username);
	var password = sanitizeHtml(req.body.password);
	var userflag = req.body.userposition;
	var managerflag = req.body.managerposition;
	//console.log(username);
	//console.log(pass);
	//console.log(flag);
	var phash = null;
	try
	{
	phash = await argon2.hash(req.body.password);
	console.log(phash);
	    req.pool.getConnection( function(err,connection) {
		if (err) {
			res.sendStatus(500);
			return;
	    }
		if (userflag === "1") { // user selected
			if (username && password) {
				connection.query('SELECT * FROM UserProfile WHERE username = ?', [username], function(error, results, fields) {
					if (results.length > 0) {
						res.send('this account already exists');
						return;
					} else {
						connection.query("INSERT INTO UserProfile (username, password, sessionflag, age, email, bio, AssignedTasks, Avaliability, Preference) VALUES(?, ?, 1, 20, 'blank', 'blank', 'blank', 'blank', 'blank')", [username, phash], function(error, results, fields){
							if (err) {
								res.sendStatus(412);
								return;
						    }
						});
					}
					res.redirect('/user.html');
					res.end();
				});
			} else {
				res.send('erro1');
				res.end();
			}
		}
		else if (managerflag === "1") { //manager selected
			if (username && password) {
				connection.query('SELECT * FROM ManagerProfile WHERE managername = ?', [username], function(error, results, fields) {
					if (results.length > 0) {
						res.send('this account already exists');
						return;
					} else {
						connection.query("INSERT INTO ManagerProfile (managername, password, age, email, department, sessionflag, bio) VALUES(?, ?, 20, 'blank@gmail.com', 'blank', 1, 'blank')", [username, phash], function(error, results, fields){
							if (err) {
								res.sendStatus(412);
								return;
						    }
						});
					}
					res.redirect('/manager.html');
					res.end();
				});
			} else {
				res.send('erro2');
				res.end();
			}
		}
		else {
			res.send('Please Select a Role.');
		}
	   });
	}
	catch (err){
		console.log("argon2 signup error!");
		res.sendStatus(500);
		return;
	}
});

var phash = [];

app.post('/login', async function(req, res, next) {

	var username = sanitizeHtml(req.body.username);
	var password = sanitizeHtml(req.body.password);
	var userlogin = 0;
	var managerlogin = 0;

	//get hashed password
	connection.query('SELECT password FROM UserProfile WHERE username = ?', [username], function(err, results, fields) {
		if (results.length > 0) {
			console.log('phash1');
			phash = results[0].password;
			userlogin = 1;
		}
		else if (results.length = 0 ){
			console.log('no user passwords match');
		}
	connection.query('SELECT password FROM ManagerProfile WHERE managername = ?', [username], function(err, results, fields) {
		if (results.length > 0) {
			console.log('phash2');
			phash = results[0].password;
			managerlogin = 1;
		}
		else if (results.length = 0 ){
			console.log('no manager passwords match');
		}
		//console.log('passwordhash is : ', results[0].password);
		console.log('phash: ', phash);
		console.log(userlogin);
		console.log(managerlogin);
		if (userlogin === 1) {
			if (username && password) {
				// user login
				connection.query('SELECT * FROM UserProfile WHERE username = ? AND password = ?', [username, phash], function(err, results, fields) {
					if (err) {
							res.sendStatus(400);
							return;
					}
					if (results.length > 0) {
						connection.query("UPDATE UserProfile SET sessionflag = 1 WHERE username = ?", [username], function(err, results, fields){
							if (err) {
								res.sendStatus(400);
								return;
							}
						});
							req.session.loggedin = true;
							req.session.username = username;
							res.redirect('/user.html');
					}
				});
			} else{
				res.send('error1');
				res.end();
			}
		}
		else if (managerlogin === 1) {
			//console.log('mlog1');
			if (username && password) {
				// manager login
				connection.query('SELECT * FROM ManagerProfile WHERE managername = ? AND password = ?', [username, phash], function(err, results, fields) {
				if (err) {
					res.sendStatus(400);
					return;
				}
				//console.log('mlog2');
				if (results.length > 0) {
					connection.query("UPDATE ManagerProfile SET sessionflag = 1 WHERE managername = ?", [username], function(err, results, fields){
						if (err) {
							res.sendStatus(400);
							return;
						}
						//console.log('mlog3');
					});
						req.session.loggedin = true;
						req.session.managername = username;
						res.redirect('/manager.html');
				}
				});
			} else {
				res.send('error2');
				res.end();
			}
		}
		});
	});
});


app.post('/updateuserprofile', function(req, res, next) {

    var name = sanitizeHtml(req.body.name);
    var age = sanitizeHtml(req.body.age);
    var bio = sanitizeHtml(req.body.bio);
    var email = sanitizeHtml(req.body.email);

    //Connect to the database
    req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
        if (name && age) {
        console.log(email);
        connection.query("UPDATE UserProfile SET username = ?, age = ?, bio = ?, email = ? WHERE sessionflag = 1", [name, age, bio, email], function(err, rows, fields){
            if (err) {
                res.status(401).send();
            return;
            } else {
                res.redirect('/userprofile.html');
            }
        });
        }
        else {
            res.send("update user profile fail");
        }
    });
});

app.post('/updatemanagerprofile', function(req, res, next) {

    var name = sanitizeHtml(req.body.name);
    var age = sanitizeHtml(req.body.age);
    var bio = sanitizeHtml(req.body.bio);
    var email = sanitizeHtml(req.body.email);
	//console.log(name);
	//console.log(age);
    //Connect to the database
    req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
        if (name && age) {
        connection.query("UPDATE ManagerProfile SET managername = ? , age = ?, bio = ?, email = ? WHERE sessionflag = 1", [name, age, bio, email], function(err, rows, fields){
            if (err) {
                res.status(401).send();
            return;
            } else {
                res.redirect('/managerprofile.html');
            }
        });
        }
        else {
            res.send("update manager profile fail");
        }
    });
});

//update user avaliability
app.post('/updateavaliability', function(req, res, next) {

	var avaldate = req.body.avaldate;
	console.log(avaldate);
	req.pool.getConnection( function(err,connection) {
		if (err) {
		res.sendStatus(500);
		return;
    }
    if(avaldate){
		connection.query("UPDATE UserProfile SET Avaliability = ? WHERE sessionflag = 1", [avaldate], function(err, rows, fields){
			if (err) {
                res.status(401).send();
            return;
            } else {
                res.redirect('/user.html');
            }
		});
    }
    else {
		res.status(403).send();
    }
	});
});


//update user involvement
app.post('/userinvolvement', function(req, res, next) {
	var taskname = sanitizeHtml(req.body.taskselect);
	var involvement = sanitizeHtml(req.body.involvement);

	req.pool.getConnection( function(err,connection) {
		if (err) {
		res.sendStatus(500);
		return;
    	}
    if (involvement == "1"){
	connection.query("UPDATE UserProfile SET AssignedTasks = ? WHERE sessionflag = 1", [taskname], function(err, rows, fields){
			if (err) {
                res.status(403).send();
            	return;
            } else {
                res.redirect('/user.html');
            }
        });
    }
    else {
		res.status(412).send();
    }
	});
});


//update complete task
app.post('/taskcomplete', function(req, res, next) {

	var taskname = sanitizeHtml(req.body.taskselect);
	var completeflag = sanitizeHtml(req.body.completeflag);

	req.pool.getConnection( function(err,connection) {
		if (err) {
		res.sendStatus(500);
		return;
    	}
    if (completeflag == "1"){
		connection.query("UPDATE Task SET Complete = 1 WHERE TaskName = ?", [taskname], function(err, rows, fields){
			if (err) {
                res.status(403).send();
            	return;
            } else {
                res.redirect('/user.html');
			}
		});
    }
    else {
		res.status(412).send();
    }
	});
});

//adding tasks
app.post('/addtask', function(req, res, next) {

	var taskname = sanitizeHtml(req.body.newtaskname);
	var users = sanitizeHtml(req.body.users);
	var priority = sanitizeHtml(req.body.priority);
	var time = sanitizeHtml(req.body.time);
	var progress = sanitizeHtml(req.body.progress);

	req.pool.getConnection( function(err,connection) {
		if (err) {
			res.sendStatus(500);
			return;
    	}
    	connection.query("INSERT INTO Task (TaskName, UsersResponsible, TaskPriority, TimeLeft, Progress, Complete) VALUES (?, ?, ?, ?, ?, 0)", [taskname, users, priority, time, progress], function(err, rows, fields){
    		if (err) {
                res.status(403).send();
            	return;
            } else {
                res.redirect('/manager.html');
			}
    	});
	});
});

//manager request to delete task
app.post('/deletetask', function(req, res, next) {

	var taskname = sanitizeHtml(req.body.deletetask);

	req.pool.getConnection( function(err,connection) {
		if (err) {
			res.sendStatus(500);
			return;
    	}
    	connection.query("DELETE FROM Task WHERE TaskName = ?", [taskname], function(err, rows, fields){
    		if (err) {
                res.status(403).send();
            	return;
            } else {
                res.redirect('/manager.html');
			}
    	});
	});
});

//updating user preference
app.post('/updatepreferences', function(req, res, next) {

	var prefer = sanitizeHtml(req.body.preference);

	req.pool.getConnection( function(err,connection) {
		if (err) {
			res.sendStatus(500);
			return;
    	}
    	connection.query("UPDATE UserProfile SET Preference = ? WHERE sessionflag = 1", [prefer], function(err, rows, fields){
    		if (err) {
                res.status(403).send();
            	return;
            } else {
                res.redirect('/user.html');
			}
    	});
	});
});



app.listen(3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
