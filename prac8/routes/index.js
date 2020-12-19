var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//Task1.1
router.get('/brew',function(req,res,next){
    var drink = req.query.drink;

    if(drink == "tea"){
        res.send('A delicious cup of tea!');
    }
    else if(drink == "coffee"){
        res.status(418).send();
    }
    else {
        res.status(400).send();
    }
});

//Task 1.2
var first = "first";
//var count =0;

router.post('/pass-it-on', function(req, res) {
    if (Object.keys(req.body).length === 0){
        res.status(400).send();
    }else{
            var new_message = req.body.message;
            res.send(first);
            first = new_message;
    }
    /*
    //else if (req.body.message){
    if(count == 0){
        new_message[count] = req.body.message;
        res.send(first);
        //console.log("first:"+count);
        count++;
    }if (count > 0){
        new_message[count] = req.body.message;
        //console.log("second:"+count);
        res.send(new_message[count-1]);
        count++;
    }
    */
});

//Task 1.3
var linecount = 1;
var arr=0;
var i=0;
var second;
var message = [];
var bruh;

//Your response should be a single long string.
router.post('/combine', function(req, res) {

        message = req.body.lines;
        second = req.body.suffix;

        bruh = (message[0] + second + "\n")
        + (message[1] + second + "\n")
        + (message[2] + second + "\n");

    res.send(bruh);

});

//Task 3.1
let x = 0;

router.get('/cookie',function(req, res){
//if the cookie doesnt have task3_1 update it
//once it has task3_1, increment the counter

    //res.clearCookie("task3_1");
    if('task3_1' in req.cookies){
        res.cookie('task3_1' , parseInt(req.cookies.task3_1)+1);
    }
    else {
        res.cookie('task3_1', '1');
    }
    res.send();
    //console.log("Cookies :  ", req.cookies);
});


//Task 3.2
router.post('/tcaccept', function(req,res,next){
        req.session.name = "It works";
        res.send("It works");
    res.send();
});


module.exports = router;
