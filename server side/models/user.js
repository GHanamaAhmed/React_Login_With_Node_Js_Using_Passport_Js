const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  tokens: {
    type: [String],
    required: true,
  },
  clientId: {
    type: String,
  },
  provider: {
    type: String,
  },
});
module.exports = mongoose.model("user", userShema);
