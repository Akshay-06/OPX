const express = require('express');
const bodyParser = require('body-parser');
//const {hospitalstaff} = require('./models/hospitalstaff.js');

const router = express.Router();
router.use(bodyParser.json());

router.post('/addStaff',async(req,res)=>{
    const{fname,lname,role,department,contact_no} = req.body();

    try{

        const newStaff = await hospitalstaff.create({
            fname,
            lname,
            role,
            department,
            contact_no,    
        });
        res.json(newStaff);
    }
    catch (error){
        console.error('Error inserting data into database:',error);
        res.status(500).json({error:'Internal Server Error'});
    }
});
module.exports = router;