import mongoose from "mongoose";

import User from "./user";
import Ingredient from "./ingredient";
import Meal from "./meal";
import Section from "./section";

const connectDb = () => {
  const url = process.env.MONGODB_URL;
  return mongoose.connect(url, { useCreateIndex: true });
};

const models = { User, Ingredient, Meal, Section };

export { connectDb };

export default models;
