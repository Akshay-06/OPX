const { sequelize } = require("../config/dbConnector")
const DataTypes = require('sequelize').DataTypes;

const PatientModel = require('../models/Patient');

const Patient = PatientModel(sequelize, DataTypes);

const PrescriptionModel = require('../models/prescription');
const Prescription = PrescriptionModel(sequelize, DataTypes);

const ServiceModel = require('../models/service');
const Service = ServiceModel(sequelize,DataTypes);

const InvoiceModel = require('../models/invoice');
const Invoice = InvoiceModel(sequelize,DataTypes);

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

const generateInvoice = async (req, res) => {
  const { p_id } = req.body;
  try {
      const prescription = await Prescription.findOne({
          where: { p_id: p_id },
          attributes: ['labtests'],
          order:[['created_at','DESC']],
          limit:1 
      });
      if (prescription) {
          const services = prescription.dataValues.labtests.split(",");
          let serviceFee;
          const consultationService = Service.findOne({ where: { service_name: "Consultation" }, attributes: ['service_fee'] });
          const otherServiceCosts = Service.findAll({ where: { service_name: services.map(test => test.trim()) }, attributes: ['service_fee'] });
          Promise.all([consultationService, otherServiceCosts])
              .then(([consultationServiceData, otherServiceCostsData]) => {
                  if (consultationServiceData) {
                      serviceFee = consultationServiceData.service_fee;
                      let totalCost = 0;
                      if (otherServiceCostsData.length > 0) {
                          totalCost = otherServiceCostsData.reduce((acc, service) => acc + parseFloat(service.service_fee), 0);
                       }
                       else {
                          res.status(200).json({ totalCost: serviceFee });
                          return;
                      }
                      // Add the service fee to the total cost
                      totalCost += parseFloat(serviceFee);
                      totalCost = totalCost.toFixed(2);
                      res.status(200).json({ totalCost });
                  } else {
                      // Handle case where consultation service fee is not found
                      console.log("Consultation service fee not found");
                      res.status(404).json({ error: "Consultation service fee not found" });
                  }
              })
              .catch(error => {
                  // Handle any errors that occur during the process
                  console.error(`Error fetching service data: ${error.message}`);
                  res.status(500).json({ error: 'Internal Server Error' });
              });
              
      }
  }
  catch (error) {
      // Handle any errors that occur during the process
      console.error(`Error fetching prescription data: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}
  

module.exports = {registerPatientController,generateInvoice}