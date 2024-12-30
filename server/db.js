const dotenv = require("dotenv");
const mongoose = require("mongoose")

dotenv.config();

function dbConnection() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Mongodb connected"))
    .catch((error) => console.log("Errorconnecting to mongodb", error));
}

module.exports = {
      dbConnection,
}
