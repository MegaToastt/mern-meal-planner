import jwt from "jsonwebtoken";
import models from "../models";

const authorize = (roles = []) => {
  if (typeof roles === "string") roles = [roles];

  return async function(req, res, next) {
    const token = req.headers["x-auth-token"] || req.headers["authorization"];
    if (!token) return res.status(401).send({ error: "Access denied" });
    const data = jwt.verify(token, process.env.JWT_KEY);
    try {
      const user = await models.User.findOne({
        _id: data._id,
        "tokens.token": token
      }).select("-password");
      if (!user) throw new Error();

      // check user roles
      if (roles.length && !roles.includes(user.role))
        return res.status(401).send({ error: "Access denied" });

      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ error: "Not authorized to access this resource" });
    }
  };
};

/*(const auth = async (req, res, next) => {
  const token = req.headers["x-auth-token"] || req.headers["authorization"];
  if (!token) return res.status(401).send({ error: "Access denied" });
  const data = jwt.verify(token, process.env.JWT_KEY);
  try {
    const user = await models.User.findOne({
      _id: data._id,
      "tokens.token": token
    }).select("-password");
    if (!user) throw new Error();

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};*/

export default authorize;
