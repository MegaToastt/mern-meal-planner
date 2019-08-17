import express from "express";
import models from "../models";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const ingredients = await models.Ingredient.find();
    return res.send(ingredients);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ingredient = await models.Ingredient.findById(req.params.id);
    if (!ingredient)
      return res
        .status(404)
        .send(`Ingredient with ID ${req.params.id} not found.`);

    return res.send(ingredient);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const new_ingredient = await models.Ingredient.create({
      name: req.body.name,
      user: req.body.user
    });
    return res.send(new_ingredient);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const ingredient = await models.Ingredient.findById(req.params.id);
    if (!ingredient)
      return res
        .status(404)
        .send(`Ingredient with ID ${req.params.id} not found.`);

    ingredient.remove();

    return res.json({ message: "Ingredient deleted successfully." });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const ingredient = await models.Ingredient.findById(req.params.id).exec();
    if (!ingredient)
      return res
        .status(404)
        .send(`Ingredient with ID ${req.params.id} not found.`);

    ingredient.name = req.body.name;
    ingredient.user = req.body.user;

    await ingredient.save();
    res.json(ingredient);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const ingredient = await models.Ingredient.findById(req.params.id).exec();
    if (!ingredient)
      return res
        .status(404)
        .send(`Ingredient with ID ${req.params.id} not found.`);

    if (req.body._id) delete req.body._id;
    if (req.body.user) delete req.body.user;

    for (let b in req.body) ingredient[b] = req.body[b];

    await ingredient.save();
    return res.json(ingredient);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
