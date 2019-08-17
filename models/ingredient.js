import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    // unique: true,
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
  // meals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }]
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

export default mongoose.model("Ingredient", ingredientSchema);
