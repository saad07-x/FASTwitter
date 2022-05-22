const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cors = require("cors");
const { urlencoded } = require("express");
// const bcrypt = require("bcryptjs");
// const { userInfo } = require('os')

//importing user models
// const user  = require('../models/users.js')

//enable cors
app.use(cors());

app.use(express.static("../public"));
// app.use(express.static('views'))
// app.engine('ejs', require('ejs').__express);
app.set("views", "../public/views");
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.set('view engine','ejs')
const PORT = 3000;

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log(`CONNECTION OPEN AT PORT: ${PORT}`);
  console.log(__dirname);
});

app.get("/", (req, res) => {
  res.send("test");
});

// display all users
app.get("/users", async (req, res) => {
  const users = await user.find({});
  // console.log(users)
  // const x =1
  res.render("user-list.ejs", { users });
});

// create user
app.post("/newUser", async (req, res) => {
  // console.log(req.body)
  const newUser = new user(req.body);
  await newUser.save();
  res.redirect(`/user/${newUser._id}`);
  console.log(req.body);
});

// app.post("/hasbulla",(req,res) =>{
//     // res.send('hehe')
//     res.redirect('/index.html')
//     // console.log('hehe')
// })

//login
app.post("/login", async (req, res) => {
  // console.log('hehe')
  const { username, pwd } = req.body;
  console.log(username, pwd);
  // res.render('Hello',{username})
  //checking username
  const User = await user.findOne({ username });
  if (username == User.username && pwd == User.pwd) {
    // res.send('yay')
    // res.send('hello,',{username})
    // res.send('hehe')
    res.render("home.ejs", { User });
    // res.render('home.ejs',{User})
    // res.redirect("/views/home.ejs")
    // res.redirect('/index.html')
  } else {
    return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
  }
  // if (!User) {
  //     return res
  //       .status(400)
  //       .json({ errors: [{ msg: "Invalid credentials" }] });
  //   }
  // else{
  //     res.send('i need you')
  // }
  // //checking password
  // const isMatch = await bcrypt.compare(pwd, User.pwd);
  // if (!isMatch) {
  //     return res
  //       .status(400)
  //       .json({ errors: [{ msg: "Invalid credentials" }] });
  //   }
  // //redirecting to home page if credentials match
  // else{
  //     res.render('home.ejs')
  // }

  // console.log('hehe')
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

//error page
// app.get('*',(res,req)=>{
//     res.status(404).render('404.ejs')
// })

// -------------------------- MONGODB ------------------------------
// connecting to mongo
mongoose
  .connect("mongodb://localhost:27017/FASTwitter", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(" connection to MONGODB successful!");
  })
  .catch((err) => {
    console.log("connection refused");
    console.log(err);
  });

//creating schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  // pwd -> password
  pwd: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("user", userSchema);
const user1 = new user({
  name: "Saad Berry",
  username: "saad",
  email: "HEHE@pomd.com",
  pwd: "abc",
});
// user1.save().then( user1 => {

//     // console.log(user1)
// })
// .catch(e => {
//     console.log("ERROR!")
//     console.log(e)
// })
