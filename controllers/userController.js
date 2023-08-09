const bcrypt = require("bcrypt");
const User = require("../models/users");
const jwt = require('jsonwebtoken');

const home = async (req, res) => {
  res.render("pages/Homepage", );
};
const login = async (req, res) => {
  res.render("pages/Login");
};


const login_post = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if(user) {
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      if(!validPassword){
        return res.send('Invalid Credentials')
      }
      const token = await jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES})
    }
    return res.redirect('/')
  } catch (error) {
    res.status(500).json(error);
  }
};
const signup = async (req, res) => {
  res.render("pages/Sign_up");
};
const signup_post = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
    });
    return res.redirect("/login");
  
  } catch (err) {
    res.status(500).json(err);
  }
};



module.exports = { home, signup, login, signup_post, login_post };
