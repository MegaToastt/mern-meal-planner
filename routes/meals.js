import express from "express";
import models from "../models";
import auth from "../middleware/auth";
import { check, validationResult } from "express-validator";
const router = express.Router();

router.get("/", auth("Admin"), async (req, res) => {
  try {
    const meals = await models.Meal.find();
    res.send(meals);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/me", auth(), async (req, res) => {
  try {
    const meals = await models.Meal.find({ user: req.user._id }).populate(
      "ingredients"
    );
    res.send(meals);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", auth(), async (req, res) => {
  try {
    const meal = await models.Meal.findById(req.params.id).populate(
      "ingredients"
    );
    if (!meal)
      return res.status(404).send(`Meal with ID ${req.params.id} not found.`);

    if (req.user.role !== "Admin" && meal.user !== req.user._id)
      return res.status(401).send({ error: "Not authorized." });

    return res.send(meal);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post(
  "/",
  [
    auth(),
    check("name")
      .exists()
      .withMessage("Name must be present"),
    check("calories")
      .exists()
      .withMessage("Calories must be selected")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    try {
      const new_meal_data = {
        name: req.body.name,
        description: req.body.description,
        user: req.user._id,
        protein: req.body.protein,
        fat: req.body.fat,
        carbs: req.body.carbs,
        calories: req.body.calories
      };

      // const new_meal = await models.Meal.create(new_meal_data);
      const new_meal = new models.Meal(new_meal_data);
      new_meal.ingredients = await models.Ingredient.addIngredients(
        req.body.ingredients,
        req.user._id
      );

      await new_meal.save();

      // const populated_meal = await new_meal.populate("ingredients");
      const populated_meal = await models.Meal.populate(new_meal, {
        path: "ingredients",
        model: "Ingredient"
      });
      return res.send(populated_meal);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

router.delete("/:id", auth(), async (req, res) => {
  try {
    const meal = await models.Meal.findById(req.params.id);
    console.log("okok");
    if (!meal)
      return res
        .status(404)
        .send(
          { errors: [{ msg: `Meal with ID ${req.params.id} not found.` }] }``
        );

    if (
      req.user.role.toString() !== "Admin" &&
      meal.user.toString() !== req.user._id.toString()
    )
      return res.status(401).send({ errors: [{ msg: "Not authorized" }] });

    console.log("okok");
    await meal.remove();
    console.log("okok");

    return res.json({ _id: req.params.id });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put(
  "/:id",
  [
    auth("Admin"),
    check("name")
      .exists()
      .withMessage("Name must be present"),
    check("user")
      .exists()
      .withMessage("User must be selected")
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const meal = await models.Meal.findById(req.params.id);
      if (!meal)
        return res.status(404).send(`Meal with ID ${req.params.id} not found.`);

      meal.name = req.body.name;
      meal.description = req.body.description;
      meal.ingredients = req.body.ingredients;
      meal.user = req.body.user;

      await meal.save();

      res.json(meal);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

router.patch(
  "/:id",
  [
    auth(),
    check("name")
      .exists()
      .withMessage("Name must be present")
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const meal = await models.Meal.findById(req.params.id);
      if (!meal)
        return res.status(404).send(`Meal with ID ${req.params.id} not found.`);

      if (req.user.role !== "Admin" && meal.user !== req.user._id)
        return res.status(401).send({ error: "Not authorized." });

      if (req.body._id) delete req.body._id;
      if (req.body.user) delete req.body.user;

      for (let b in req.body) meal[b] = req.body[b];
      meal.ingredients = await models.Ingredient.addIngredients(
        req.body.ingredients,
        req.user._id
      );

      await meal.save();
      const populated_meal = await models.Meal.populate(meal, {
        path: "ingredients",
        model: "Ingredient"
      });
      return res.json(populated_meal);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default router;
