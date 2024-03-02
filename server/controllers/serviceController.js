const { sequelize } = require("../config/dbConnector")
const DataTypes = require('sequelize').DataTypes;

const ServiceModel = require('../models/service');
const DecidesModel = require('../models/decides');
const Service = ServiceModel(sequelize, DataTypes);
const Decides = DecidesModel(sequelize, DataTypes);
const showAllServiceDetails = async (req, res) => {

    try {
        const serviceDetails = await Service.findAll();

        res.status(200).json({ serviceDetails });
    } catch (err) {
        console.log(err)
    }
};

const addService = async(req,res) => {
 const {service_name,service_fee, hstaff_id} = req.body;
 try {
    const addedService = await Service.create({ service_name,service_fee, created_by: hstaff_id, modified_by: hstaff_id });
    console.log(addedService);
    const service_id = addedService.service_id;
    const addeddecides = await Decides.create({service_id , hstaff_id, created_by: hstaff_id, modified_by: hstaff_id });
    res.status(200).json({ addedService, addeddecides });
} catch (err) {
    res.status(500).json(err)
};
}

const updateService = async(req,res) => {
    const {service_name,service_fee, service_id, hstaff_id} = req.body;
    try{

        const serviceRecord = await Service.findOne({where : {service_id:service_id}});
        const decidesRecord = await Decides.findOne({where:{service_id:service_id,hstaff_id:hstaff_id}})
        if(serviceRecord)
        {
            serviceRecord.service_name = service_name;
            serviceRecord.service_fee = service_fee;
            serviceRecord.modified_by = hstaff_id;
            serviceRecord.save();
            if(decidesRecord)
            {
                decidesRecord.modified_by = hstaff_id;
                decidesRecord.save();
            }
            else{
               await Decides.create({hstaff_id,service_id,created_by:hstaff_id,modified_by:hstaff_id});
            }
        }
        res.status(200).json({serviceRecord, decidesRecord});
    } catch(err){
        res.status(500).json(err)
    };    
}
const deleteService = async (req, res) => {
    const { service_id } = req.body;

    try {
        const serviceRecord = await Service.findOne({ where: { service_id: service_id } });

        if (serviceRecord) {
            await Decides.destroy({ where: { service_id: service_id } });
            await serviceRecord.destroy();

            res.status(200).json({ message: 'Records deleted successfully' });
        } else {
            res.status(404).json({ message: 'Service record not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};





module.exports = {showAllServiceDetails,addService,updateService,deleteService};