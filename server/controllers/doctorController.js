const { sequelize } = require("../config/dbConnector")
const DataTypes = require('sequelize').DataTypes;

const DoctorModel = require('../models/Doctor');

const Doctor = DoctorModel(sequelize, DataTypes);

const registerDoctorController = async (req, res) => {

    const { fname, lname, specialization, contact_no } = req.body;

    try {
        const registerDoctor = await Doctor.create({ fname, lname, specialization, contact_no, created_by: 'admin', modified_by: 'admin' });

        res.status(200).json({ registerDoctor });
    } catch (err) {
        res.status(500).json(err)
    };
};

module.exports = {registerDoctorController,}