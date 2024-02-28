const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const { sequelize } = require('../dbconnector');

const signupController = async (req, res) => {
  // normal form signup
  const { name, email, password } = req.body;
  console.log(email, name, password);
  
  try {
    if (email === "" || password === "" || name === "")
      return res.status(400).json({ message: "Invalid field!" });

    const result = new User({ name, email, password });

    await result.save()

    // For generating token, you might need to provide a secret key
    // const token = jwt.sign(
    //   {
    //     email: result.email,
    //     id: result.user_id
    //   },
    //   'your_secret_key_here',
    //   { expiresIn: "1h" }
    // );

    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = {
  signupController,
};
