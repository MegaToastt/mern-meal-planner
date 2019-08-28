import express from "express";
import models from "../models";
import auth from "../middleware/auth";
import { check, validationResult } from "express-validator";
const router = express.Router();

router.get("/", auth("Admin"), async (req, res) => {
  try {
    const ingredients = await models.Ingredient.find();
    return res.send(ingredients);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/me", auth(), async (req, res) => {
  try {
    const ingredients = await models.Ingredient.find({
      user: req.user._id
    }).select("-user");

    return res.send(ingredients);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/:id", auth(), async (req, res) => {
  try {
    const ingredient = await models.Ingredient.findById(req.params.id);
    if (!ingredient)
      return res
        .status(404)
        .send(`Ingredient with ID ${req.params.id} not found.`);

    if (req.user.role !== "Admin" && ingredient.user !== req.user._id)
      return res.status(401).send({ error: "Not authorized" });

    return res.send(ingredient);
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
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const new_ingredient = await models.Ingredient.create({
        name: req.body.name,
        user: req.user._id
      });
      return res.send(new_ingredient);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

router.delete("/:id", auth(), async (req, res) => {
  try {
    const ingredient = await models.Ingredient.findById(req.params.id);
    if (!ingredient)
      return res
        .status(404)
        .send(`Ingredient with ID ${req.params.id} not found.`);

    if (req.user.role !== "Admin" && ingredient.user !== req.user._id)
      return res.status(401).send({ error: "Not authorized" });

    await ingredient.remove();

    return res.json({ message: "Ingredient deleted successfully." });
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
      .withMessage("User must be present")
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

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

      const ingredient = await models.Ingredient.findById(req.params.id).exec();
      if (!ingredient)
        return res
          .status(404)
          .send(`Ingredient with ID ${req.params.id} not found.`);

      if (req.user.role !== "Admin" && ingredient.user !== req.user._id)
        return res.status(401).send({ error: "Not authorized" });

      if (req.body._id) delete req.body._id;
      if (req.body.user) delete req.body.user;

      for (let b in req.body) ingredient[b] = req.body[b];

      await ingredient.save();
      return res.json(ingredient);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default router;
