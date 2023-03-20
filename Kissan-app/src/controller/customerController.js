const { default: mongoose } = require('mongoose');
const cardModel = require("../models/cardModel");
const customerModel = require("../models/customerModel");
// const { isValid, isValidNumber, mobile, email} = require("../utils/validation");

const isValid = value => typeof value != 'string' || value.trim().length === 0 ? false : true;
const isValidDOB = (value) => /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(value)
const mobile = value => /^[6-9]\d{9}$/.test(value);
const email = value => /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value);


const createCustomer = async (req, res) => {
    try {
        // ====================requesting data from body==================
        let data = req.body;
        if (!data) return res.status(400).send({ status: false, message: "please provide required data" });
        // ==========================validations and value checking====================
        if (!data.firstName) return res.status(400).send({ staus: false, message: "please enter first name" });
        if (!isValid(data.firstName)) return res.status(400).send({ status: false, message: "invalid first name type" })
        if (!data.lastName) return res.status(400).send({ staus: false, message: "please enter last name" });
        if (!isValid(data.lastName)) return res.status(400).send({ status: false, message: "invalid last name type" });
        if (!data.mobileNumber) return res.status(400).send({ staus: false, message: "please enter mobile number" });
        if (!mobile(data.mobileNumber)) return res.status(400).send({ status: false, message: "mobile number is not valid" })
        if (!data.DOB) return res.status(400).send({ staus: false, message: "please enter date of birth" });
        if (!isValidDOB(data.DOB)) return res.status(400).send({ status: false, mmessage: "DOB is not valid" });
        if (!data.emailID) return res.status(400).send({ staus: false, message: "please enter email" });
        if (!email(data.emailID)) return res.status(400).send({ status: false, message: "email is not valid" });
        if (!data.address) return res.status(400).send({ staus: false, message: "please enter address" });
        let statusHere = ["Active", "Inactive"]
        if(!statusHere.includes(data.status))   return res.status(400).send({status:false, message: "status should be Active or Inactive"});
         // ========================creatimg data===============================
        const customer = await customerModel.create(data);
        return res.status(201).send({status: true, message:"Customer registered Successfully", data:customer});
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

const getActiveCustomer = async (req, res)=>{
    try{
        let customer = await customerModel.find({$and:[{status: "Active"},{isDeleted:false}]});
        return res.status(200).send({status:false, data:customer});
    }catch(err){
        return res.status(400).send({status:false, message:err.message});
    }
}

const deleteCustomer = async(req, res)=>{
    let customerId = req.params.customerId;
    if(!mongoose.isValidObjectId(customerId))return res.status(400).send({staus:false, message: "Customer id is invalid"});
       let data =  await customerModel.findByIdAndUpdate(customerId, {$set:{isDeleted:true}},{new:true})
       console.log(data)
        return res.status(200).send({sataus:true, message:"Data is Deleted!!"})
}

module.exports = {createCustomer, getActiveCustomer, deleteCustomer};