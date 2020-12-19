var express = require('express');
var router = express.Router();
var posts =[];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//Task2.2
router.post('/*', function(req, res, next){
    console.log('POST from a user');
    next();
});

//2.3
router.post('/*', function(req, res, next) {

    if(req.is('application/json')){
        next();
    }
    else{
        res.sendStatus(412);
    }
});


//Task 3.2
router.get('/accepted', function(req,res,next){
    if(req.session.name === "It works"){
        res.send("It works");
    }else{
        res.sendStatus(403);
    }
    res.send();
});


module.exports = router;
