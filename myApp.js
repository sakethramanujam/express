
var express = require('express');
var bodyparser = require('body-parser');
var app = express();


// --> 7)  Mount the Logger middleware here
    function logger(req, res, next) {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip )
    next();
    }
// --> 11)  Mount the body-parser middleware  here
    bodyparser.urlencoded({extended: false});
    app.use(bodyparser.urlencoded({extended: false}));
   
    
    
/** 1) Meet the node console. */
//console.log("Hello World!")

/** 2) A first working Express Server */
 /** 
  app.get('/',
  function(req,res){
  res.send("Hello Express");
  });
*/
/** 3) Serve an HTML file */
    app.get('/',bodyparser.urlencoded({extended: false}),function(req,res){
            res.sendFile(__dirname + '/views/index.html');
    });

/** 4) Serve static assets  */
    app.use(express.static( __dirname + '/public'));
   
/** 5) serve JSON on a specific route 
*/    /**app.get('/json',function(req,res){
           res.json({
          "message":"Hello json"
       })
      });*/
/** 6) Use the .env file to configure the app */
       if(process.env.MESSAGE_STYLE === "uppercase"){
         app.get('/json',logger,bodyparser.urlencoded({extended: false}),function(req,res){
           res.json({
          "message": "HELLO JSON"
       })
      });
    }
    else{
         app.get('/json',logger,bodyparser.urlencoded({extended: false}),function(req,res){
           res.json({
          "message": "Hello json"
       })
      });
    }
 
/** 7) Root-level Middleware - A logger 
//  place it before all the routes !
    
*/

/** 8) Chaining middleware. A Time server */
      app.get('/now',function(req,res,next){
        req.time = new Date().toString();
        next();
      },function(req,res){
        req.time = new Date().toString();
        res.json({"time": req.time});
      });

/** 9)  Get input from client - Route parameters */
      app.use('/:word/echo',logger,bodyparser.urlencoded({extended: false}),function(req,res,next){
        var word = req.params.word;
        next();
      },function(req,res){
        var word = req.params.word;
        res.json({"echo": word});
      });

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
    /**app.use('/name',logger,bodyparser.urlencoded({extended: false}),function(req,res,next){
    next();
    },function(req,res){
      var fname =req.query.first;
      var lname = req.query.last;
      res.json({"name":fname+' '+lname});
    });/*

  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
  app.use('/name',logger,bodyparser.urlencoded({extended: false}),function(req,res,next){
    next();
    },function(req,res){
      var fname =req.body.first;
      var lname = req.body.last;
      res.json({"name":fname+' '+lname});
    });

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
