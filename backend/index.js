const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { request } = require("express");
const cors = require("cors");

require("./user");

// const { request } = require("express");
// const mongoose = require("mongoose");
// const path = require("path");
// const app = express();
// const { urlencoded } = require("express");
// const bcrypt = require("bcryptjs");
// const { userInfo } = require('os')

//importing user models
// const user  = require('../models/users.js')

//enable cors and bodypraser
app.use(bodyParser.json());
app.use(cors());

const user = mongoose.model("user");
const mongoUri =
  "mongodb+srv://berry:123@cluster0.0sscl.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected hehehehe");
});
mongoose.connection.on("error", (err) => {
  console.log("Error");
});

app.use(express.static("../public"));
app.set("views", "../public/views");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("test");
});

// display all users
app.get("/users", async (req, res) => {
  let users = await user
    .find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(users)
  // const x =1
  res.render("user-list.ejs", { users });
});

// create user
app.post("/newUser", async (req, res) => {
  // console.log(req.body)
  const newUser = new user({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    pwd: req.body.pwd,
  });
  newUser
    .save()
    .then((data) => {
      console.log(data);
      res.send("success");
    })
    .catch((err) => {
      console.log(err);
    });
});

//login
app.post("/login", async (req, res) => {
  // console.log('hehe')
  const { username, pwd } = req.body;
  console.log(username, pwd);
  // res.render('Hello',{username})
  //checking username
  const User = await user.findOne({ username });
  if (username == User.username && pwd == User.pwd) {
    // res.send("Logged in");
    console.log("logged in");
    res.render("home.ejs", { User });
  } else {
    res.send("Login Failed");
    console.log("Failed");
    return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
  }
});

// search a user by their ID
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  user_info = await user.findById(id);
  console.log(user_info);
  // res.send("USER FOUND! :p")
  res.render("user_info.ejs", { user_info });
});

//home page
app.get("/home", (req, res) => {
  res.send("home page");
});

app.get("/test", async (req, res) => {
  const users = await user.find();
  //  console.log(users)
  // const x =1
  res.render("test.ejs");
});

const PORT = 3000;
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log(`CONNECTION OPEN AT PORT: ${PORT}`);
  console.log(__dirname);
});

// mongoose
//   .connect("mongodb://localhost:27017/FASTwitter", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log(" connection to MONGODB successful!");
//   })
//   .catch((err) => {
//     console.log("connection refused");
//     console.log(err);
//   });

//creating schema

// const user1 = new user({
//   name: "Saad Berry",
//   username: "saad",
//   email: "HEHE@pomd.com",
//   pwd: "abc",
// });
