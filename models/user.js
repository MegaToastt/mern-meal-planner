import mongoose from "mongoose";
import models from "./";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email Address" });
      }
    },
    index: true
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    select: false
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  role: {
    type: String
  }
});

userSchema.pre("remove", async function(next) {
  try {
    const meals = await models.Meal.find({ user: this._id });
    meals.forEach(async meal => await meal.remove());
    const ingredients = await models.Ingredient.find({ user: this._id });
    ingredients.forEach(async ingredient => await ingredient.remove());
    next();
  } catch (error) {
    console.log(error);
  }
});

userSchema.pre("save", async function(next) {
  // hash password before saving
  const user = this;
  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 8);
  next();
});

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // search for user by email and password
  const user = await User.findOne({ email }).select("+password");
  if (!user) return null;

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (isPasswordMatch) return user;
  else return null;
};

const User = mongoose.model("User", userSchema);
export default User;
