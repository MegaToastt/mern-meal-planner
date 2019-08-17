import express from "express";
import models from "../models";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const meals = await models.Meal.find();
    res.send(meals);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const meal = await models.Meal.findById(req.params.id);
    if (!meal)
      return res.status(404).send(`Meal with ID ${req.params.id} not found.`);

    return res.send(meal);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const new_meal = await models.Meal.create({
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
      user: req.body.user
    });

    return res.send(new_meal);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const meal = await models.Meal.findById(req.params.id);
    if (!meal)
      return res.status(404).send(`Meal with ID ${req.params.id} not found.`);

    await meal.remove();

    return res.json({ message: "Meal deleted successfully." });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
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
});

router.patch("/:id", async (req, res) => {
  try {
    const meal = await models.Meal.findById(req.params.id);
    if (!meal)
      return res.status(404).send(`Meal with ID ${req.params.id} not found.`);

    if (req.body._id) delete req.body._id;
    if (req.body.user) delete req.body.user;

    for (let b in req.body) meal[b] = req.body[b];

    await meal.save();
    return res.json(meal);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
