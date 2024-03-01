const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const { sequelize } = require('../dbconnector');

const signupController = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(email, name, password);
  
  try {
    if (email === "" || password === "" || name === "")
      return res.status(400).json({ message: "Invalid field!" });

    const result = new User({ name, email, password });

    await result.save()

    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};


module.exports = {
  signupController,
};
