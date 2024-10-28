
const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

const router = express.Router();


router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;


  if (!name || !email || !password) {
    return res.status(400).json("Please fill in all fields");
  }

 
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    
    res.json("Registered successfully");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json("Error occurred during signup.");
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const person = await UserModel.findOne({ email });
    if (!person) {
      return res.status(404).json("No record existed");
    }


    const isMatch = await bcrypt.compare(password, person.password);
    if (isMatch) {
    res.json("Success");
    
    
      } else {
      res.json("The password is incorrect");
      
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json("Server error during login");
  }
});


// Route to get user info by ID
router.get("/user/:_id", async (req, res) => {
  try {
      const user = await UserModel.findById(req.params._id);
      if (!user) {
          return res.status(404).json("User not found");
      }
      res.json(user); 
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json("Server error");
  }
});

module.exports = router;
