const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unnique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
      type: String,
      required: true,
  },
  role:{
      type: String,
      default: "user"
}
});

module.exports= mongoose.model("User", userSchema)


