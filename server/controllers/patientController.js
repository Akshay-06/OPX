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

const HospitalstaffModel = require('../models/Hospitalstaff');

const Hospitalstaff = HospitalstaffModel(sequelize, DataTypes);

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
      const patient = await Patient.findOne({where : {p_id: p_id}});
      const hospitalstaff = await Hospitalstaff.findOne({where: {hstaff_id: patient.hstaff_id},attributes:['fname','lname']});
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
                      const today = new Date();
                      const invoiceDate = today.toISOString().split('T')[0]; 
                      const paymentStatus = 0;

                      Invoice.create({
                          p_id: p_id,
                          billing_address: patient.address,
                          amount: totalCost,
                          invoice_date: invoiceDate,
                          payment_status: paymentStatus,
                          created_by: hospitalstaff.fname + ' ' + hospitalstaff.lname, 
                          modified_by: hospitalstaff.fname + ' ' + hospitalstaff.lname
                      }).then(() => {
                          res.status(200).json({ message: "Invoice created successfully" });
                      }).catch(error => {
                          console.error(`Error creating invoice: ${error.message}`);
                          res.status(500).json({ error: 'Internal Server Error' });
                      });
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

const showAllPatientDetails = async (req, res) => {

  try {
      const patientDetails = await Patient.findAll();

      res.status(200).json({ patientDetails });
  } catch (err) {
      console.log(err)
  }
};

module.exports = {registerPatientController,generateInvoice,showAllPatientDetails}