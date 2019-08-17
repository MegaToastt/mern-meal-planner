import mongoose from "mongoose";
import Meal from "./meal";

const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

sectionSchema.pre("remove", next => {
  Meal.remove({ meals: this._id }).exec();
  next();
});

export default mongoose.model("Section", sectionSchema);
