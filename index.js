// import routes from "./routes/user.js"
import express from "express";
import "dotenv/config";
import { main, addArticles } from "./mongodb.js";
import router from "./routes/user.js";
import cors from "cors"
main();
const app = express();
// Middleware to pass Json bodies
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("connected");
});
app.use("/user", router)



app.listen(3000, () => {
  console.log("server connected");
});
