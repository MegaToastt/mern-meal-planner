import mongoose, { models } from "mongoose";

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

ingredientSchema.statics.addIngredients = async (ingArray, userId) => {
  try {
    let ingredients = [];
    for (const ing of ingArray) {
      if (ing._id) {
        ingredients.push(mongoose.Types.ObjectId(ing._id));
      } else {
        delete ing._id;
        const new_ingredient = await Ingredient.create({
          ...ing,
          user: userId
        });
        ingredients.push(mongoose.Types.ObjectId(new_ingredient._id));
      }
    }
    return ingredients;
  } catch (error) {
    console.log(error);
  }
};

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
export default Ingredient;
