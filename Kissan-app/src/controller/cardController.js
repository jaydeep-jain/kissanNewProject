const cardModel = require("../models/cardModel");
const customerModel = require("../models/customerModel");

const createCard = async(req, res)=>{
    try{
        let data = req.body;
        let update = await cardModel.find().count();
        data.cardNumber = update + 1;
        let typeOfCard = ["Regular", "Special"];
        if(!typeOfCard.includes(data.cardType)) return res.status(400).send({status: false, message: err.message});
        if(data.status){
            let cardStatus = ["Active", "Inactive"];
            if(cardStatus.includes(data.status))return res.status(400).send({status:false, message: "Card status should be Active/Inactive"});
        }
        if(!data.customerId) return res.status(400).send({status:false, message: "please enter customer Id"});
        const getCustomerName = await customerModel.findById(data.customerId)
        if(getCustomerName.isDeleted == true) return res.status(400).send({status:false, message:"customer is not available"});
        data.customerName = getCustomerName.firstName + " " + getCustomerName.lastName;

        const card = await cardModel.create(data);
        return res.status(400).send({status:false, data:card});
    }catch(err){
        return res.status(500).send({status:false, message: err.message});
    }
}

const getCard = async (req, res)=>{
    try{   
        let cards = await cardModel.find();
        console.log(cards);

        return res.status(200).send({status:false, message: "Here is all cards", data:cards});
    }catch(err){
        return res.status(500).send({status:false, message: err.message});
    }
}

module.exports = {createCard, getCard};