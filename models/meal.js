import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true,
    default: 0
  },
  protein: {
    type: Number,
    default: 0
  },
  carbs: {
    type: Number,
    default: 0
  },
  fat: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  },
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

mealSchema.index({ name: 1, user: 1 }, { unique: true });

export default mongoose.model("Meal", mealSchema);
