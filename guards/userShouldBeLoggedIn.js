require("dotenv").config();
const jwt = require("jsonwebtoken");


function userShouldBeLoggedIn(req, res, next) {
 //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcxNzQwNTU0OH0.BRmXVOv0lIPF7mbMNJmdyvbqTc9egJOkJUfmlS32Rd"
  const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");//
  const supersecret = process.env.SUPERSECRET;
  if (!token) {
    res.status(401).send({ message: "please provide a token" });
  } else {
    // const payload = jwt.verify(token, supersecret);
    // use payload
    //if there is a token => verify it
    jwt.verify(token, supersecret, async (err, payload) => {
      if (err) {
        res.status(401).send({ message: err.message });
      } else {//everything is correct!
       res.locals.user = payload.userId;
       next();//let the request to go through the next middleware
      }
    });
  }
}
module.exports = userShouldBeLoggedIn;
