// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   country: String,
// });

// export default mongoose.model('User', userSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String },
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;
