require("dotenv").config();
var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const supersecret = process.env.SUPERSECRET;
const saltrounds = process.env.SALT_ROUNDS;
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")

/* GET test. */
router.get("/", function(req, res) {
  res.send({ message: "Express" });
});

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const passwordHash = await bcrypt.hash(password, +saltrounds);
  try {
    const sql = `INSERT INTO users (username, password, email) VALUES ('${username}', '${passwordHash}' , '${email}' )`;
    await db(sql);
    res.send({ message: "it worked" });
  } catch (err) {
    res
      .status(500)
      .send({ myMessage: "registration failed", serverError: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // find the user
    const results = await db(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    // if user doesn't exist, return error
    if (!results.data.length) {
      res.status(401).send({ error: "user not found" });

    } else {//we found a user with the received username
      const user = results.data[0];
      const userPassword = user.password;
      //else check password
      const passwordCorrect = await bcrypt.compare(password, userPassword);
      if (!passwordCorrect) {
        res.status(401).send({ error: "password incorrect" });
      } else {
        //create token and return it
        const tokenPayload = { userId: user.id };
        const token = jwt.sign(tokenPayload, supersecret);
        res.send({
          token: token,
          username
        });
      }
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// WE JUST STARTED THIS AT THE END OF CLASS BUT IT IS NOT WORKING YET
router.post("/loginCheck", async (req, res) => {
  //
  //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcxNzQwNTU0OH0.BRmXVOv0lIPF7mbMNJmdyvbqTc9egJOkJUfmlS32Rd"
  const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");//
  if (!token) {
    res.status(403).send({ message: "please provide a token" });
  } else {
    // const payload = jwt.verify(token, supersecret);
    // use payload
    jwt.verify(token, supersecret, async (err, payload) => {
      if (err) {
        res.status(401).send({ message: err.message });
      } else {
        res.send({protectedData: "This is a private data!"});
      }
    });
  }
});

router.get("/profile",userShouldBeLoggedIn,async(req, res)=>{
  console.log(res.locals.userId);
  res.send({protectedData: "This is your profile info!"})

})

module.exports = router;
