import express from "express";
import cors from "cors";
import models, { connectDb } from "./models";
import usersRoute from "./routes/users";
import mealsRoute from "./routes/meals";
import ingRoute from "./routes/ingredients";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("hello"));

app.use("/users", usersRoute);
app.use("/meals", mealsRoute);
app.use("/ingredients", ingRoute);

const port = process.env.PORT || 3001;
connectDb().then(async () => {
  app.listen(port, (req, res) =>
    console.log(`Server running on port ${port}...`)
  );
});
