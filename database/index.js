
// ***************************************************************

const mongoose = require("mongoose");

// Read - MongooseJS Docs:
// https://mongoosejs.com/

// Read - MongooseJS mongoose.connect Docs:
// https://mongoosejs.com/docs/connections.html
// https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connect
mongoose.connect(

  // TecPros/fastpark DB url:
  "mongodb://admin:admin123@ds119374.mlab.com:19374/fastpark",
  { useNewUrlParser: true }

  // ClustererJSX/fastpark DB url:
  // "mongodb://root:root1root2@ds127604.mlab.com:27604/fastpark",
  // { useNewUrlParser: true }
);

// const mongoose = require("./mongoDBConnection.js");

// ***************************************************************

const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
// Read - bcrypt Docs:
// https://www.npmjs.com/package/bcrypt

// ***************************************************************

const db = mongoose.connection;
// Read - MongooseJS Connections Docs:
// https://mongoosejs.com/docs/connections.html
// https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connection


const Schema = mongoose.Schema;
// Read - MongooseJS Schema Doc:
// https://mongoosejs.com/docs/guide.html

const ObjectId = mongoose.Types.ObjectId;
// Read - MongooseJS ObjectId Docs:
// https://mongoosejs.com/docs/schematypes.html#objectids


db.on("error", function (err) {
  console.log("Mongoose DB Connection Error:");
  console.log(err);
});

db.once("open", function () {
  console.log("Mongoose DB Connection - Connected Successfully:");

});

// Tables:
// ------------------------

// Read - MongooseJS model Docs:
// https://mongoosejs.com/docs/models.html

// Read - MongooseJS model Docs Create / save:
// https://mongoosejs.com/docs/models.html#constructing-documents

// Read - MongooseJS model Docs Query (find, findById, findOne, where):
// https://mongoosejs.com/docs/models.html#querying

// Read - MongooseJS model Docs Query (findOneAndUpdate):
// https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate

// Read - MongooseJS model (deleting) Docs:
// https://mongoosejs.com/docs/models.html#deleting

// Read - MongooseJS model (updating) Docs:
// https://mongoosejs.com/docs/models.html#updating


// 1. Table User: (Customer)
// 1.1 Tables Schema (Structure)

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: String,
  plateNumber: {
    type: String,
    required: true
  },
  name: String,
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
});

// 1.2 
const User = mongoose.model("User", UserSchema);

// 1.3 Table User Functions:
// ------------------------

// 1.3.1 Create (Save) a user in the DB User table

const saveUser = (data, callback) => {
  hashPassword(data["password"], function (err, hashedPassword) {
    if (err) console.log("HashPassword Error", err);
    let user = new User({
      name: data["name"],
      phoneNumber: data["phoneNumber"],
      username: data["username"],
      password: hashedPassword,
      plateNumber: data["plateNumber"],
      email: data["email"]
    });
    user.save(function (err) {
      if (err) callback(null, err);
      callback(user, null);
    });
  });
};

// 1.3.2 Generating hash password using bcrypt (For User Table)

const hashPassword = function (password, callback) {
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) throw err;

    bcrypt.hash(password, salt, function (err, hash) {
      if (err) return callback(err, null);
      callback(null, hash);
    });
  });
};

//1.3.3 Checking login password with database (For User Table)

const checkPassword = (data, callback) => {
  User.findOne({ email: data.email }, function (err, res) {

    if (res) {
      //here i change callback(isMatch,error) to callback(res, err) because i need to send user information in response
      bcrypt.compare(data.password, res.password, function (err, isMatch) {
        if (err) return callback(null, err);
        callback(res._id, err);
      });
    } else {
      callback(false, null);
    }
  });
}


// ***************************************************************

// 2 Table Owner (Parks Owners):
// 2.1 Tables Schema (Structure)
// ----------------------------

const OwnerSchema = new Schema({
  name: String,
  phoneNumber: String,
  email: String,
  password: String,
  rating: String,
  image: String
});

// 2.2
const Owner = mongoose.model("Owner", OwnerSchema);

// 2.3 Table Owner Functions
// -------------------------

// 2.3.1 Fix error log in as owner
const checkPasswordOwner = (data, callback) => {
  console.log("checkPasswordOwner data: ", data);
  Owner.findOne(
    { email: data.email }, 
    function (err, resulteDB) {

    if (resulteDB) {

      //here i change callback(isMatch,error) to callback(resulteDB, err) because i need to send user information in resulteDBponse
      // bcrypt.compare(data.password, resulteDB.password, function(err, isMatch) {
      //   if (err) return callback(null, err);
      callback(resulteDB._id, null);
      //  });
    } else {
      callback(false, null);
    }
  });
}

// 2.3.2 saving owner to the Owners table
const saveOwner = (data, callback) => {
  let owner = new Owner({
    name: data["name"],
    phoneNumber: data["phoneNumber"],
    email: data["email"],
    password: data["password"],
    rating: data["rating"],
    image: data["image"]
  });
  owner.save(function (err) {
    if (err) callback(null, err);
    //returning the auto generated id from the db to be used when adding new parks
    callback(owner._id, null);
  });
};

// 2.3.3 Updating the owner rating based on rating after checkout
const updateOwnerRating = (ownerId, rating, callback) => {
  console.log(rating, "rating come from FE")
  owner.updateOne({ _id: ownerId }, { rating: rating }, function (err, res) {

    if (res) {
      callback(true, null);
    } else {
      callback(false, err);
    }
  });
};

// ***************************************************************

// 3 Table Park:
// 3.1 Tables Schema (Structure)
// -----------------------------

const ParkSchema = new Schema({
  title: String,
  description: String,
  long: String,
  lat: String,
  location: String,
  image: String,
  ownerId: { type: mongoose.Schema.ObjectId, ref: "Owner" },
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  price: String,
  startTime: String,
  endTime: String
});

// 3.2
const Park = mongoose.model("Park", ParkSchema);

// 2.3 Table Park Functions:
// ------------------------

// 2.3.1 saving parks to Parks table
const savePark = (data, callback) => {
  let park = new Park({
    title: data["title"],
    description: data["description"],
    long: data["long"],
    lat: data["lat"],
    location: data["location"],
    image: data["image"],
    ownerId: data["ownerId"],
    price: data["price"],
    startTime: data["startTime"],
    endTime: data["endTime"]
  });
  park.save(function (err) {
    if (err) throw err;
    cb(true);
  });
};

// Find All Parks on Location:
// finding all parks based on the provided location
// using aggregation to get all the owner details from owners table
const findParks = (query, cb) => {
  db.collection("parks")
    .aggregate([
      { $match: { location: query } },
      {
        $lookup: {
          from: "owners",
          localField: "ownerId",
          foreignField: "_id",
          as: "ownerdetails"
        }
      }
    ])
    .toArray(function (err, res) {
      if (err) throw err;
      cb(res);
    });
};

// Find All ownerParks:
//finding all ownerParks based on the provided ownerId
//using aggregation to get all the user details from users table

const findOwnerParks = (ownerId, callback) => {
  db.collection("parks")
    .aggregate([
      { $match: { ownerId: ObjectId(ownerId) } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userdetails"
        }
      }
    ])
    .toArray(function (err, res) {
      console.log(res, err);
      if (err) callback(err, null);
      callback(null, res);
    });
};

// Update Park: 
//updating the park document with userId based on booking and checkout

const updatePark = (parkId, userId, cb) => {
  Park.updateOne({ _id: parkId }, { userId: userId }, function (err, res) {
    if (res) {
      cb(true, null);
    } else {
      cb(false, err);
    }
  });
};

// Delete Park:
const deletePark = function (parkId, cb) {
  Park.deleteOne({ "_id": ObjectId(parkId) }, (err, res) => {
    if (err) {
      console.log("delete error", err)
    }
    cb(res)
  });
};



// ***************************************************************
// NEW TABLES:
// ***************************************************************

// 4. Table userid: (All)
// 4.1 Tables Schema (Structure)

const UserIDSchema = new Schema({

  userid: {
    type: String,
    required: true
  },

  usertype: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  firstname: {
    type: String,
    required: true
  },

  middlename: String,

  lastname: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  phoneNumber: {
    type: String,
    required: true
  }
});

// 4.2 
const UserID = mongoose.model("UserID", UserSchema);

// 4.3 Table UserID Functions:
// --------------------------

// 4.3.1 UserID - Create User:

const createUser = (data, callback) => {

  var errObj = {};

  hashPassword(
    data["password"],
    function (err, hashedPassword) {
      if (err) {
        console.log("HashPassword Error", err);
        errObj.type = "HashPassword";
        errObj.err = err;
        callback(null, err);
      } else {
        
        var UserID = new UserID({
          userid: data["userid"],
          usertype: data["usertype"],
          email: data["email"],
          firstname: data["firstname"],
          middlename: data["middlename"],
          lastname: data["lastname"],
          password: hashedPassword,
        });
  
        UserID.save(function (err, resulteDB) {  
          if (err) {
            errObj.type = "Can Not Save User";
            errObj.err = err;
            callback(null, errObj);
          } else {
            console.log("User been added");
            console.log()
            callback(resulteDB, null);
          }
        });
      }
    });

};

// 4.3.2 UserID - Delete User:

const deleteUserID = function (UserID, callback) {
  var errObj = {};
  UserID.deleteOne(
    { "_id": ObjectId(UserID) },
    function (err, resulteDB) {
      if (err) {
        // error msg
        errObj.type = "deleteUserID error";
        errObj.err = err;
        console.log("deleteUserID error: ");
        console.log(err);
        callback(null, errObj)
      }
      callback(resulteDB, null)
    }
  );
};

// 4.3.* UserID - Update User:
// (Fix) NOT Working Yet

const updateUserID = (parkId, userId, callback) => {
  var errObj = {};
  UserID.updateOne(
    { _id: parkId },
    { userId: userId },
    function (err, res) {
      if (res) {
        callback(resulteDB, null);
      } else {
        errObj.type = "updateUserID error";
        errObj.err = err;
        callback(false, errObj);
      }
    });
};


// 4.3.* UserID - Find All User:
// (Fix) NOT Working Yet
// model.collection.find({}, callback)
const findAllUserID = (query, callback) => {

  UserID.collection.find(
    {},
    function (err, resulteDB) {
      var errObj = {};
      if (err) {
        errObj.type = "Find All Users";
        errObj.err = err;
        callback(false, errObj)
      } else {
        callback(resulteDB, null);
      }
    }
  );
};
//****************************************************************** 
// table 5 credit card
const CreditCardSchema = new Schema({

  cardnum: {
    type:Number ,
    required: true
  },
  month:String,
  year:String,
  code:Number,
  name:String,
  country:String,
  zip:Number
});

var  Card = mongoose.model('Card', CreditCardSchema);

const saveCard = (data, callback) => {

  //change the value from string to number
 var card0 =  parseInt(data["cardnum"]);
var codeIn = parseInt(data["code"]);
var zipIn =parseInt( data["zip"]);

    let Card1 = new Card({
      cardnum: card0,
      month: data["month"],
      year: data["year"],
      code: codeIn,
      name: data["name"],
      country: data["country"],
      zip:zipIn
    });
    Card1.save(function (err) {
      if (err) callback(null, err);
      callback(Card1, null);
    });

};

// ***************************************************************


// Owners:
module.exports.saveOwner = saveOwner;
module.exports.findOwnerParks = findOwnerParks;
module.exports.checkPasswordOwner = checkPasswordOwner;
module.exports.updateOwnerRating = updateOwnerRating;

// Parks:
module.exports.savePark = savePark;
module.exports.findParks = findParks;
module.exports.deletePark = deletePark;
module.exports.updatePark = updatePark;

// User:
module.exports.User = User;
module.exports.saveUser = saveUser;
module.exports.checkPassword = checkPassword;

// card
module.exports.saveCard2 = saveCard;