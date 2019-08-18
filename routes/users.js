import express from "express";
import models from "../models";
import auth from "../middleware/auth";
import { check, validationResult } from "express-validator";
const router = express.Router();

router.get("/", auth("Admin"), async (req, res) => {
  try {
    const users = await models.User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/me", auth(), async (req, res) => {
  res.send(req.user);
});

router.post("/logout", auth(), async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/logoutall", auth(), async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", auth("Admin"), async (req, res) => {
  try {
    const user = await models.User.findById(req.params.id);
    if (!user)
      return res.status(404).send(`User with ID ${req.params.id} not found.`);

    return res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post(
  "/",
  [
    check("username")
      .not()
      .isEmpty()
      .withMessage("Username must be provided"),
    check("email")
      .isEmail()
      .withMessage("Invalid email"),
    check("password")
      .exists()
      .isLength({ min: 7 })
      .withMessage("Invalid password")
  ],
  async (req, res) => {
    try {
      // validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      // find existing user
      let user = await models.User.findOne({ email: req.body.email });
      if (user)
        return res
          .status(400)
          .send({ errors: [{ msg: "User already registered" }] });

      if (req.body.role) delete req.body.role;

      user = new models.User(req.body);
      await user.save();

      const token = await user.generateAuthToken();

      res.header("x-auth-token", token).send({ user, token });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.User.findByCredentials(email, password);

    if (!user)
      return res
        .status(401)
        .send({ errors: [{ msg: "Login failed! Check login credentials" }] });

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", auth("Admin"), async (req, res) => {
  try {
    const user = await models.User.findById(req.params.id);
    if (!user)
      return res.status(404).send(`User with ID ${req.params.id} not found.`);

    if (req.user.role !== "Admin" && user._id !== req.user._id)
      return res.status(401).send({ error: "Not authorized" });

    await user.remove();

    return res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", auth("Admin"), async (req, res) => {
  try {
    const user = await models.User.findById(req.params.id);
    if (!user)
      return res.status(404).send(`User with ID ${req.params.id} not found.`);

    user.username = req.body.username;

    await user.save();
    return res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/:id", auth(), async (req, res) => {
  try {
    const user = await models.User.findById(req.params.id);
    if (!user)
      return res.status(404).send(`User with ID ${req.params.id} not found.`);

    if (req.user.role !== "Admin" && user._id !== req.user._id)
      return res.status(401).send({ error: "Not authorized" });

    if (req.body._id) delete req.body._id;
    if (req.body.role && req.user.role !== "Admin") delete req.body.role;

    for (let b in req.body) user[b] = req.body[b];

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
