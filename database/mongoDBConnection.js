// ***************************************************************

// Read - MongooseJS Doc:
// https://mongoosejs.com/

const mongoose = require("mongoose");

mongoose.connect(
    // TecPros/fastpark DB url:
    "mongodb://admin:admin123@ds119374.mlab.com:19374/fastpark",
    { useNewUrlParser: true }

    // ClustererJSX/fastpark DB url:
    //   "mongodb://root:root1root2@ds127604.mlab.com:27604/fastpark",
    //   { useNewUrlParser: true }

);

module.exports = mongoose

// ***************************************************************