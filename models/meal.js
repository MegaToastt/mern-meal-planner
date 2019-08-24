import mongoose from "mongoose";
import Ingredient from "./ingredient";

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // calories: {
  // type: Number,
  // required: true
  // },
  // protein: {
  // type: Number
  // },
  // carbs: {
  // type: Number
  // },
  // fats: {
  // type: Number
  // },
  description: {
    type: String
  },
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

mealSchema.index({ name: 1, user: 1 }, { unique: true });

// mealSchema.pre("remove", async function(next) {
// console.log("pre remove meal");
// this.model("ingredients").remove();
// next();
// });

export default mongoose.model("Meal", mealSchema);
