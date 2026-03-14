import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);

// hooks(middlewares)/methods/statics

// --> here use a normal function as callback

//hooka(middlewares)

userSchema.pre("save", async function () {
  console.log("before save");

  if (!this.isModified("password")) return;
  // is modified checks weather a field was changed or not before saving it.
  // here if name field was changed & save event raised --> user.name="" await user.save() --> then this isModified("password") --> false

    this.password = await bcrypt.hash(this.password, 10);

});

userSchema.post("save", function () {
  console.log("after save");
});

//methods
userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_ACCESSTOKEN_SECRET);
};

//statics
userSchema.statics.findByEmail = async function (email) {
  return await this.findOne({ email });
};

const User = mongoose.model("User", userSchema);

export default User;
