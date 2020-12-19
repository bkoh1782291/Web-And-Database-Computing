var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res) {
 res.send("This is a tests");
});


//Task 3.1
let timestamp = new Date();

var i = 0;

router.get('/last.txt', function(req, res, next){
    if(i == 0){
      res.end();
      timestamp = new Date();
      timestamp = timestamp.toLocaleString('en-AU', {timeZone:'Australia/Adelaide',timeZoneName:"long"});
      i++;
      }
    else{
      res.send(timestamp);
      timestamp = new Date();
      timestamp = timestamp.toLocaleString('en-AU', {timeZone:'Australia/Adelaide',timeZoneName:"long"});
      i++;
    }
});

//Task3.2
var count = 0;

router.get('/color.html', function(req, res, next){

    if (count == 0){
      res.send('<!DOCTYPE html>\
      <html lang="en-US"> \
      <head>\
        <title>practical 4</title>\
      </head>\
        <body> \
            <h1 style="color:red">red</h1>\
        </body> \
      </html> \
    ');
    count++;
    }
    if (count == 1){
      res.send('<!DOCTYPE html>\
      <html lang="en-US"> \
      <head>\
        <title>practical 4</title>\
      </head>\
        <body> \
            <h1 style="color:yellow">yellow</h1>\
        </body> \
      </html> \
    ');
    count++;
    }
    if (count == 2){
      res.send('<!DOCTYPE html>\
      <html lang="en-US"> \
      <head>\
        <title>practical 4</title>\
      </head>\
        <body> \
            <h1 style="color:green">green</h1>\
        </body> \
      </html> \
    ');
    count++;
    }
    if (count == 3){
      res.send('<!DOCTYPE html>\
      <html lang="en-US"> \
      <head>\
        <title>practical 4</title>\
      </head>\
        <body> \
            <h1 style="color:blue">blue</h1>\
        </body> \
      </html> \
    ');
    count++;
    }
    count = 0;
});

var pantStr = "";

router.get('/pants', function(req,res,next) {
    pantStr = pantStr + "pants<br>";
    res.send(pantStr);
});


//Task 3.3
var h = 0;
var first = "";
var second = "";
var third = "";
  router.get('/log.html', function(req, res, next) {
    // a first string  "<ul>"
    // then a second string that is appended with "<li>" + Date + "</li>" every time the route is used
    // then a third string "</ul>
      first = '<!DOCTYPE html><html lang="en-US"><head><title>log.html</title></head><body><ul>';

        var dateT = Date();
        second = second + '<li>'+dateT+'</li>';
        h++;

      third = '</ul></body></html>';

      res.send(first + second + third);
});

//Task 4.2

var y = 0;
var color;
router.get('/color.txt', function(req, res, next) {
    if(y == 0){
        color = "red";
        y++ ;
    }else if(y == 1){
        color = "yellow";
        y++ ;
    }else if(y == 2){
        color = "green";
        y++ ;
    }else if(y == 3){
        color = "blue";
        y = 0;
    }
    res.send(color) ;
});

//Task4.4
router.get("/contact.ajax", function(req, res, next) {
    res.send('<a href="mailto:a1782291@student.adelaide.edu.au">a1782291@student.adelaide.edu.au</a>');
});
router.get("/search.ajax", function(req, res, next) {
    res.send('<input type="text"><button type="button">Search</button>');
});

router.get("/about.ajax", function(req, res, next) {
    res.set("Content-Type", "text/plain");
    var file = path.join(__dirname, "./public/4-4.html");
    fs.open(file, "r+", function(log, fd) {
      if (log) throw log;
        res.send(fd);
    });
});


//Task 4.5
let pagestatus = 0;

router.get('/accept', function(req, res, next){
   pagestatus = 1;
   res.status(200).end();
});

router.get('/content.ajax', function(req, res, next){

    if (pagestatus == 1)
    {
      res.send('<p>Content 1</p>\
                <p>Content 2</p>\
                ');
    }
    else
    {
      res.status(403).end();
    }
});



//Task 4.6
var k = 0;
router.get('/images.json', function(req, res, next) {
  res.send(images[k]);
  k++;
  if (k == 10){
    k=0;
  }
});

module.exports = router;


