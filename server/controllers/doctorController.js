const { sequelize } = require("../config/dbConnector")
const DataTypes = require('sequelize').DataTypes;
const jwt = require("jsonwebtoken")
const config = require("config")

const DoctorModel = require('../models/Doctor');

const Doctor = DoctorModel(sequelize, DataTypes);

const registerDoctorController = async (req, res) => {

    const { fname, lname, specialization, contact_no, hstaff_id } = req.body;

    try {
        password = fname + "_" + lname;
        const registerDoctor = await Doctor.create({ fname, lname, specialization, contact_no, password, hstaff_id, created_by: hstaff_id, modified_by: hstaff_id });
        res.status(200).json({ registerDoctor });
    } catch (err) {
        res.status(500).json(err)
    };
};

const signInController = async (req, res) => {
    
    // normal-auth
    const { doctor_id, password } = req.body;
    if (doctor_id === "" || password === "")
        return res.status(400).json({ message: "Invalid field!" });
    try {
        const existingUser = await Doctor.findOne({where: { 
            doctor_id: doctor_id
        }})

        if (!existingUser)
            return res.status(404).json({ message: "Doctor Id doesn't exist!" })

        const isPasswordOk = password === existingUser.password;

        console.log(existingUser.doctor_id, existingUser.password)

        if (!isPasswordOk)
            return res.status(400).json({ message: "Invalid credentials!" })

        const token = jwt.sign({
            doctor_id: existingUser.doctor_id
        }, config.get("JWT_SECRET"), { expiresIn: "1h" })

        res
            .status(200)
            .json({ result: existingUser, token })
    } catch (err) {
        console.log(err)
    }

}

module.exports = {registerDoctorController, signInController}