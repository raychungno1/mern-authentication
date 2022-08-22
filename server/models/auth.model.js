import mongoose from "mongoose";
import bcrypt from "bcrypt";

// User Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    picture: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Normal",
      // Role tyles: Normal, Admin, etc...
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timeStamp: true }
);

userSchema.statics = {
  encryptPassword: function (password) {
    console.log("Hashing PW");
    return bcrypt.hash(password, 12);
  },
};

userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compare(password, this.password);
  },
};

export default mongoose.model("User", userSchema);
