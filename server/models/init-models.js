var DataTypes = require("sequelize").DataTypes;
var _decides = require("./decides");
var _doctor = require("./doctor");
var _generates = require("./generates");
var _gigs = require("./gigs");
var _hospitalstaff = require("./hospitalstaff");
var _includes = require("./includes");
var _invoice = require("./invoice");
var _lab_report = require("./lab_report");
var _medicalrecord = require("./medicalrecord");
var _patient = require("./patient");
var _prescription = require("./prescription");
var _service = require("./service");
var _uploads = require("./uploads");
var _user = require("./user");

function initModels(sequelize) {
  var decides = _decides(sequelize, DataTypes);
  var doctor = _doctor(sequelize, DataTypes);
  var generates = _generates(sequelize, DataTypes);
  var gigs = _gigs(sequelize, DataTypes);
  var hospitalstaff = _hospitalstaff(sequelize, DataTypes);
  var includes = _includes(sequelize, DataTypes);
  var invoice = _invoice(sequelize, DataTypes);
  var lab_report = _lab_report(sequelize, DataTypes);
  var medicalrecord = _medicalrecord(sequelize, DataTypes);
  var patient = _patient(sequelize, DataTypes);
  var prescription = _prescription(sequelize, DataTypes);
  var service = _service(sequelize, DataTypes);
  var uploads = _uploads(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  doctor.belongsToMany(patient, { as: 'p_id_patients', through: prescription, foreignKey: "doctor_id", otherKey: "p_id" });
  hospitalstaff.belongsToMany(invoice, { as: 'invoice_no_invoices', through: generates, foreignKey: "hstaff_id", otherKey: "invoice_no" });
  hospitalstaff.belongsToMany(lab_report, { as: 'report_id_lab_reports', through: uploads, foreignKey: "hstaff_id", otherKey: "report_id" });
  hospitalstaff.belongsToMany(service, { as: 'service_id_services', through: decides, foreignKey: "hstaff_id", otherKey: "service_id" });
  invoice.belongsToMany(hospitalstaff, { as: 'hstaff_id_hospitalstaff_generates', through: generates, foreignKey: "invoice_no", otherKey: "hstaff_id" });
  invoice.belongsToMany(service, { as: 'service_id_service_includes', through: includes, foreignKey: "invoice_no", otherKey: "service_id" });
  lab_report.belongsToMany(hospitalstaff, { as: 'hstaff_id_hospitalstaff_uploads', through: uploads, foreignKey: "report_id", otherKey: "hstaff_id" });
  patient.belongsToMany(doctor, { as: 'doctor_id_doctors', through: prescription, foreignKey: "p_id", otherKey: "doctor_id" });
  service.belongsToMany(hospitalstaff, { as: 'hstaff_id_hospitalstaffs', through: decides, foreignKey: "service_id", otherKey: "hstaff_id" });
  service.belongsToMany(invoice, { as: 'invoice_no_invoice_includes', through: includes, foreignKey: "service_id", otherKey: "invoice_no" });
  medicalrecord.belongsTo(doctor, { as: "doctor", foreignKey: "doctor_id"});
  doctor.hasMany(medicalrecord, { as: "medicalrecords", foreignKey: "doctor_id"});
  prescription.belongsTo(doctor, { as: "doctor", foreignKey: "doctor_id"});
  doctor.hasMany(prescription, { as: "prescriptions", foreignKey: "doctor_id"});
  decides.belongsTo(hospitalstaff, { as: "hstaff", foreignKey: "hstaff_id"});
  hospitalstaff.hasMany(decides, { as: "decides", foreignKey: "hstaff_id"});
  generates.belongsTo(hospitalstaff, { as: "hstaff", foreignKey: "hstaff_id"});
  hospitalstaff.hasMany(generates, { as: "generates", foreignKey: "hstaff_id"});
  patient.belongsTo(hospitalstaff, { as: "hstaff", foreignKey: "hstaff_id"});
  hospitalstaff.hasMany(patient, { as: "patients", foreignKey: "hstaff_id"});
  uploads.belongsTo(hospitalstaff, { as: "hstaff", foreignKey: "hstaff_id"});
  hospitalstaff.hasMany(uploads, { as: "uploads", foreignKey: "hstaff_id"});
  generates.belongsTo(invoice, { as: "invoice_no_invoice", foreignKey: "invoice_no"});
  invoice.hasMany(generates, { as: "generates", foreignKey: "invoice_no"});
  includes.belongsTo(invoice, { as: "invoice_no_invoice", foreignKey: "invoice_no"});
  invoice.hasMany(includes, { as: "includes", foreignKey: "invoice_no"});
  uploads.belongsTo(lab_report, { as: "report", foreignKey: "report_id"});
  lab_report.hasMany(uploads, { as: "uploads", foreignKey: "report_id"});
  invoice.belongsTo(patient, { as: "p", foreignKey: "p_id"});
  patient.hasMany(invoice, { as: "invoices", foreignKey: "p_id"});
  lab_report.belongsTo(patient, { as: "p", foreignKey: "p_id"});
  patient.hasMany(lab_report, { as: "lab_reports", foreignKey: "p_id"});
  medicalrecord.belongsTo(patient, { as: "patient", foreignKey: "patient_id"});
  patient.hasMany(medicalrecord, { as: "medicalrecords", foreignKey: "patient_id"});
  prescription.belongsTo(patient, { as: "p", foreignKey: "p_id"});
  patient.hasMany(prescription, { as: "prescriptions", foreignKey: "p_id"});
  decides.belongsTo(service, { as: "service", foreignKey: "service_id"});
  service.hasMany(decides, { as: "decides", foreignKey: "service_id"});
  includes.belongsTo(service, { as: "service", foreignKey: "service_id"});
  service.hasMany(includes, { as: "includes", foreignKey: "service_id"});

  return {
    decides,
    doctor,
    generates,
    gigs,
    hospitalstaff,
    includes,
    invoice,
    lab_report,
    medicalrecord,
    patient,
    prescription,
    service,
    uploads,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
