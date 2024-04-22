import jsonWebToken from "jsonwebtoken";
const jwt = jsonWebToken;
const jwtsecretkey = "shhhshhhhshhh";
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  // console.log(token)
  if (!token) {
    return res.send("please enter a valid token");
  }
  try {
    const data = jwt.verify(token, jwtsecretkey);
    console.log(data);
    // console.log(data.userlogin)
    req.user = data.userlogin;
    next();
  } catch (error) {
    console.log(error)
    res.send(error);
  }
};

export default fetchuser;
