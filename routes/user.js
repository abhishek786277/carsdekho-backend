import express from "express";
import { addArticles } from "../mongodb.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jsonWebToken from "jsonwebtoken";
import fetchuser from "./middleware.js";

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

const router = express.Router();

const validationarray = [
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }).exists(),
];

// Route 1
// Create user
router.post("/createuser", validationarray, async (req, res) => {
  const articles = addArticles();
  const errors = myValidationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.send("hell noooooo");
  }
  try {
    console.log(errors);
    console.log(req.body);
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashpass = await bcrypt.hash(req.body.password, salt);
    var Users = await articles.insertOne({
      name: req.body.name,
      password: hashpass,
      email: req.body.email,
    });

    let user = { Users: { id: Users.id } };
    const jwt = jsonWebToken;
    const jwtsecretkey = "shhhshhhhshhh";
    const auhtoken = jwt.sign(user, jwtsecretkey);
    // res.send(req.body);
    res.json(`${auhtoken}`);
  } catch (error) {
    console.log(errors, error);
    res.json({ errors: "enter a valid authentication" });
  }
});

// Route 2
// login endpoints
const loginvalidation = [
  body("email", "Enter a valid email").isEmail(),
  body("password", "password cannot be blank").exists(),
];
router.post("/login", loginvalidation, async (req, res) => {
  const errors = myValidationResult(req);
  if (!errors.isEmpty()) {
    return res.send("validation failed" + errors);
  }
  try {
    const { email, password } = req.body;
    // console.log(email,password)
    const articles = addArticles();
    let userlogin = await articles.findOne({ email });

    console.log(userlogin);
    // console.log(userlogin.id)
    // console.log(userlogin.password)
    if (!userlogin) {
      return res.send("email");
    }

    const passwordcomapre = await bcrypt.compare(password, userlogin.password);
    // console.log(passwordcomapre);
    if (!passwordcomapre) {
      return res.send("pass");
    }

    let user = { userlogin: { id: userlogin.id } };
    const jwt = jsonWebToken;
    const jwtsecretkey = "shhhshhhhshhh";
    const auhtoken = jwt.sign(user, jwtsecretkey);
    res.json(auhtoken);
    // res.send(email,password)
  } catch (error) {
    res.json({ error: "enter a valid authentication" });
    console.log(error);
  }
});

// Route 3
//get user
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    let userid = req.user.id;
    const user = await addArticles.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    res.send("error");
  }
});
export default router;
