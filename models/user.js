const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  address: { type: String, required: false },
  phone: { type: String, required: false },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, required: false, default: 3 },
  email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;