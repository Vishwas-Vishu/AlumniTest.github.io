const path = require("path");
const express = require("express");
const hbs = require("hbs");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

require("dotenv").config();

const app = express();
var port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
console.log(publicDirectoryPath);
const viewsPath = path.join(__dirname, "./views");
console.log(viewsPath);

app.set("view engine", "ejs");
app.set("views", viewsPath);

app.use(express.static(publicDirectoryPath));
app.use(bodyParser.urlencoded({ extended: true }));

const requireLogin = (req, res, next) => {
  if (!req.session.admin_id) {
    return res.redirect("/");
  }
  next();
};

//database connection
// const db = process.env.MONGO_URL || "mongodb+srv://DBIT_Alumni:DBITALUMNI@dbitalumni.yrw3w.mongodb.net/TELEGRAM?retryWrites=true&w=majority"
const db = process.env.MONGO_URL || "mongodb+srv://Vishwas_123:4qdWIvgyQ7kJiy3O@cluster0.jkqpt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

const secret = process.env.SECRET || "squirrel";

const store = MongoStore.create({
  mongoUrl: db,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret,
  },
});

store.on("error", function (e) {
  console.log("Session Store Error", e);
});

const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure:true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

const User = require("../models/Users");
const Faculty = require("../models/Faculty");
const Admin = require("../models/Admin");

// var fromMessage = []

// const msg = {
//     to : "jackfrostvaishnav@gmail.com",
//     from:
// }
app.get("", (req, res) => {
  res.render("index");
});

// app.get('/telegram',(req, res) => {
//     res.render('telegram')
// })

app.post("/student", (req, res) => {
  nameS = req.body.name;
  usn = req.body.usn;
  gyear = req.body.gyear;
  contact = req.body.contact;
  branch = req.body.branch;
  email = req.body.email;
  number_code = req.body.number_code;

  var d = new Date();
  var date = d.getDate();
  var year = d.getFullYear();
  var month = d.getMonth();

  //   number = number_code + "-" + contact;
  //console.log(number)`

  newdate = date + "-" + month + "-" + year;
  const newUser = {
    name: nameS.toUpperCase(),
    usn: usn.toUpperCase(),
    g_year: gyear,
    branch: branch.toUpperCase(),
    code: number_code,
    contact: contact,
    email: email,
    date: newdate,
  };

  mongodb: User.create(newUser, function (err, newCreated) {
    if (err) {
      console.log(err);
    } else {
      res.render("telegram");
    }
  });

  // console.log(nameS,usn,year,contact,branch,newdate);
});

app.post("/faculty", (req, res) => {
  fname = req.body.fname;
  desg = req.body.desg;
  dep = req.body.dep;
  doj = req.body.doj;
  mail = req.body.mail;
  numberCode = req.body.number;
  contact = req.body.contact;

  var d = new Date();
  var date = d.getDate();
  var year = d.getFullYear();
  var month = d.getMonth();

  //   number = number_code + "-" + contact;
  //console.log(number)`

  newdate = date + "-" + month + "-" + year;
  const newFaculty = {
    fname: fname.toUpperCase(),
    desg: desg.toUpperCase(),
    dep: dep.toUpperCase(),
    doj: doj,
    code: numberCode,
    contact: contact,
    mail: mail,
    date: newdate,
  };

  mongodb: Faculty.create(newFaculty, function (err, newCreated) {
    if (err) {
      console.log(err);
    } else {
      res.render("telegram");
    }
  });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { password, adminname } = req.body;
  const admin = new Admin({ adminname, password });
  await admin.save();
  req.session.admin_id = admin._id;
  res.redirect("/show");
});

// app.get("/login", (req, res) => {
//   res.render("login");
// });

app.post("/login", async (req, res) => {
  // res.send(req.body);
  const { adminname, password } = req.body;
  const foundUser = await Admin.findAndValidate(adminname, password);
  if (foundUser) {
    req.session.admin_id = foundUser._id;
    res.redirect("/show");
  } else {
    res.redirect("/");
  }
});

app.post("/logout", (req, res) => {
  // req.session.user_id = null;
  req.session.destroy();
  res.redirect("/");
});

app.get("/show", requireLogin, async (req, res) => {
  if (req.query.search) {
    count = 1;
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    var users = await User.find({
      $or: [{ name: regex }, { branch: regex }, { g_year: regex }],
    });
    const use = await User.find({}).countDocuments({});
    // var users = await User.find({ branch: regex });
    res.render("show", { users, use });
  } else {
    count = 1;
    const users = await User.find({});
    const use = await User.find({}).countDocuments();
    // console.log(use);
    res.render("show", { users, use });
  }
});

app.get("/showfaculty", requireLogin, async (req, res) => {
  if (req.query.search) {
    count = 1;
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    var faculty = await Faculty.find({
      $or: [{ fname: regex }, { dep: regex }],
    });
    const fac = await Faculty.find({}).countDocuments({});
    // var users = await User.find({ branch: regex });
    res.render("showfaculty", { faculty, fac });
  } else {
    count = 1;
    const faculty = await Faculty.find({});
    const fac = await Faculty.find({}).countDocuments();
    // console.log(use);
    res.render("showfaculty", { faculty, fac });
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}   

app.listen(port, () => {
  console.log( `Server is up on port {port}` );
});
