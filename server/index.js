const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("../database/index");
const PORT = process.env.PORT || 5000;

const app = express();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Answer API requests.

// var xXx = require('./xXx.js');

var SignUp = require('./signup.js')
app.post("/signup", function(req, res) {
  db.saveUser(req.body, function(user, err) {
    if (err) console.log("erreeer", err);
    console.log("user", user);
    if (user) {
      res.send(user._id);
    }
  });
});

// handle login post request from client
app.post("/login", function(req, res) {
  console.log("AZZZZZZZZZZZZZZZHHHHHHHHHHHAAAAAAAAR")
  db.checkPassword(req.body, function(passRes, err) {
    if (err) console.log("erreeer", err);
    console.log(passRes,"passRespassRespassRespassRespassRespassRes");
    
    res.send(passRes);
  });
});

//handle GET requests for parks listings
app.post("/parks", function(req, res) {
  if (req.body.location) {
    db.findParks(req.body.location, function(parks) {
      res.json(parks);
    });
  } else {
    db.findOwnerParks(req.body.ownerId, function(err, parks) {
      if (err) console.log("findOwnerParksERROR", err);
      res.json(parks);
    });
  }
});
//handle owner Creation from /signup post request
app.post("/ownersignup", function(req, res) {
  db.saveOwner(req.body, function(done, err) {
    if (err) {
      throw err;
    }
    console.log("saved owner");
    res.send("done");
  });
});

//handle owner Creation from /logIn post request
app.post("/ownerlogin", function(req, res) {
  db.checkPasswordOwner(req.body, function(passRes, err) {
    if(err) console.log("erreeer",err)
    console.log(passRes,"passRespassRespassRespassRespassRespassRes");
    

    res.send(passRes);
  });
  //res.send("hhhhhhhhhhhhhh")
});



//handle adding new park listing by owners from /addpark post request
app.post("/addpark", function(req, res) {
  db.savePark(req.body, function(done, err) {
    if (err) {
      throw err;
    }
    console.log("saved park");
    res.send("done");
  });
});


app.delete("/deletepark",function(req,res){
  db.deletePark(req.body.parkId,function(done){
    res.send(done);
  })
})
app.post("/updatepark", (req, res) => {
  db.updatePark(req.body.parkId, req.body.userId, (done, err) => {
    if (err) console.log("updateError", err);
    res.send(done);
  });
});

//handle adding rating coming from user after checking out from //updateownerrating post request
app.post("/updateownerrating", (req, res) => {
  db.updateOwnerRating(req.body.ownerId, req.body.rating, (done, err) => {
    if (err) console.log("updateError", err);
    res.send(done);
  });
 });

// All remaining requests return the React app, so it can handle routing.
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
});

app.listen(PORT, function() {
  console.error(
    `Node cluster worker ${process.pid}: listening on port ${PORT}`
  );
});


