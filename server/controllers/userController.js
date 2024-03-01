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

    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
const signinController = async (req, res) => {
        const { email, password } = req.body;
        
        if (email === "" || password === "")
            return res.status(400).json({ message: "Invalid field!" });
        try {
            const existingUser = await User.findOne({where:{ email}});  //{where:{ email}}
            if (!existingUser)
                return res.status(404).json({ message: "Email doesn't exist!" })

            res
                .status(200)
                .json({ result: existingUser}) //, token 
        } catch (err) {
            res
                .status(500)
                .json({ message: "Something went wrong!" ,details: err.message })
        }
    };

//}

// const forgotPasswordController = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email: email });
//         console.log(user);
//         if (!user) {
//             return res.send({ Status: "Entered email doesn't exist" });
//         }
//         const token = jwt.sign({ email: user.email, id: user._id }, config.get("JWT_SECRET"), { expiresIn: "1h" })

//         const resetLink = `http://localhost:3000/hokieforu/reset-password/${user._id}/${token}`;
//         const subject = 'HokieForU: Reset Password Link';

//         await emailController.sendNotificationMail(user.email, subject, resetLink);
//         return res.send({ Status: "Success" });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({ Status: "Error" });
//     }
// }

// const resetPasswordController = async (req, res) => {
//     const { id, token } = req.params
//     const { password } = req.body

//     console.log(id, token, password)

//     jwt.verify(token, config.get("JWT_SECRET"), (err, decoded) => {
//         if (err) {
//             return res.json({ Status: "Error with token" })
//         } else {
//             bcrypt.hash(password, 12)
//                 .then(hash => {
//                     User.findByIdAndUpdate({ _id: id }, { password: hash })
//                         .then(u => res.send({ Status: "Success" }))
//                         .catch(err => res.send({ Status: err }))
//                 })
//                 .catch(err => res.send({ Status: err }))
//         }
//     })
// }

const getUserDetailsController = async (req, res) => {
    const { userEmail } = req.body;
    try {
        const userDetails = await User.findOne({ email: userEmail });
        res.status(200).json(userDetails)

    } catch (error) {
        res.status(400).send("Error fetching User Details");
    }

};   

module.exports = {
  signupController,
  signinController,
};
