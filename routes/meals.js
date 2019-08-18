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

router.get("/:id", auth(), async (req, res) => {
  try {
    const meal = await models.Meal.findById(req.params.id);
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
      .withMessage("Name must be present")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    try {
      const new_meal = await models.Meal.create({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        user: req.user._id
      });

      return res.send(new_meal);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

router.delete("/:id", auth(), async (req, res) => {
  try {
    const meal = await models.Meal.findById(req.params.id);
    if (!meal)
      return res.status(404).send(`Meal with ID ${req.params.id} not found.`);

    if (req.user.role !== "Admin" && meal.user !== req.user._id)
      return res.status(401).send({ error: "Not authorized." });

    await meal.remove();

    return res.json({ message: "Meal deleted successfully." });
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

      await meal.save();
      return res.json(meal);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default router;
