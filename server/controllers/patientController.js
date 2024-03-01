const { sequelize } = require("../config/dbConnector")
const DataTypes = require('sequelize').DataTypes;

const PatientModel = require('../models/Patient');

const Patient = PatientModel(sequelize, DataTypes);

const registerPatientController = async (req, res) => {

    const { fname, lname, age, contact_no,email, password, address, hstaff_id } = req.body;

    if (email === "" || password === "" || fname === ""|| lname === ""|| age === ""|| contact_no === ""|| address === ""|| hstaff_id === "")
    return res.status(400).json({ message: "Invalid field!" });

    try {
        const registerPatient = await Patient.create({ fname, lname, age, contact_no, email, password, address, hstaff_id, created_by: 'admin', modified_by: 'admin' });

        res.status(200).json({ registerPatient});
    } catch (err) {
        res.status(500).json(err)
    };
};

module.exports = {registerPatientController,}