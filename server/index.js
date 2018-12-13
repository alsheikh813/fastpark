// ***************************************************************

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("../database/index");

const PORT = process.env.PORT || 5000;

const app = express();

// ***************************************************************


// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ***************************************************************

// Answer API requests.

// ***************************************************************

// 1. Table User:


// ***************************************************************

// 2 Table Owner:

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

// ***************************************************************

// 3 Table Park:

// Park - List Parks in given Location 
// handle GET requests for parks listings
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

// Park - Create New One:
// handle adding new park listing by owners from /addpark post request
app.post("/addpark", function(req, res) {
  db.savePark(req.body, function(done, err) {
    if (err) {
      throw err;
    }
    console.log("saved park");
    res.send("done");
  });
});

// Park - Delete:
// 
app.delete("/deletepark",function(req,res){
  db.deletePark(req.body.parkId,function(done){
    res.send(done);
  })
})

// Park - Update:
//
app.post("/updatepark", (req, res) => {
  db.updatePark(req.body.parkId, req.body.userId, (done, err) => {
    if (err) console.log("updateError", err);
    res.send(done);
  });
});

// Park - Rating:
// handle adding rating coming from user after checking out from //updateownerrating post request
app.post("/updateownerrating", (req, res) => {
  db.updateOwnerRating(req.body.ownerId, req.body.rating, (done, err) => {
    if (err) console.log("updateError", err);
    res.send(done);
  });
 });


// ***************************************************************


// ???
// handle login post request from client
app.post("/login", function(req, res) {
  console.log("Server/Post /login: ")
  db.checkPassword(req.body, function(passRes, err) {
    if (err) {
      console.log("db.checkPassword Error: ");
      console.log(err);
    }

    console.log("db.checkPassword Ok - passRes: ");
    console.log(passRes);
    
    res.send(passRes);
  });
});



// ???
// handle owner Creation from /logIn post request
app.post("/ownerlogin", function(req, res) {
  db.checkPasswordOwner(req.body, function(passRes, err) {
    if(err) console.log("erreeer",err)
    console.log(passRes,"passRespassRespassRespassRespassRespassRes");
    

    res.send(passRes);
  });
  //res.send("hhhhhhhhhhhhhh")
});



//handle creditcard Creation from /card post request
app.post("/card", function(req, res) {
  console.log('++++++123')
  console.log(req.body)
  db.saveCard2(req.body, function(done, err) {
    console.log('db.saveCard2')
    if (err) {
      console.log(err)
      throw err;
    }
    console.log("saved card");
    res.send("done");
  });
});







 // ***************************************************************

// All remaining requests return the React app, so it can handle routing.
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, function() {
  console.error(
    `Node cluster worker ${process.pid}: listening on port ${PORT}`
  );
});


