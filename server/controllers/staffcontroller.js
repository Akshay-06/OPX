const { sequelize } = require("../config/dbConnector")
const DataTypes = require('sequelize').DataTypes;
const jwt = require("jsonwebtoken")
const config = require("config")

const HospitalstaffModel = require('../models/hospitalstaff');

const Hospitalstaff = HospitalstaffModel(sequelize, DataTypes);

const showAllStaffDetails = async (req, res) => {

    try {
        const staffDetails = await Hospitalstaff.findAll();

        res.status(200).json({ staffDetails });
    } catch (err) {
        console.log(err)
    }
};

const addStaffController = async (req, res) => {

    const { fname, lname, jobrole, department, contact_no, email, password } = req.body;

    try {
        const addedStaff = await Hospitalstaff.create({ fname, lname, jobrole, department, contact_no, email, password, created_by: 'admin', modified_by: 'admin' });

        res.status(200).json({ addedStaff });
    } catch (err) {
        res.status(500).json(err)
    };
};


const signInController = async (req, res) => {
    
        // normal-auth
        const { email, password } = req.body;
        if (email === "" || password === "")
            return res.status(400).json({ message: "Invalid field!" });
        try {
            const existingUser = await Hospitalstaff.findOne({where: { 
                email: email
            }})

            if (!existingUser)
                return res.status(404).json({ message: "Email doesn't exist!" })

            const isPasswordOk = password === existingUser.PASSWORD;

            console.log(existingUser.email, existingUser.PASSWORD)

            if (!isPasswordOk)
                return res.status(400).json({ message: "Invalid credentials!" })

            const token = jwt.sign({
                email: existingUser.email,
                id: existingUser._id
            }, config.get("JWT_SECRET"), { expiresIn: "1h" })

            res
                .status(200)
                .json({ result: existingUser, token, status: 200 })
        } catch (err) {
            console.log(err)
        }

}


module.exports = { showAllStaffDetails, addStaffController, signInController};