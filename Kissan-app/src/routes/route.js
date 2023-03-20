const express = require("express");
const router = express.Router();
const {createCustomer, getActiveCustomer, deleteCustomer} = require("../controller/customerController");
const {createCard, getCard} = require("../controller/cardController");

// router.get("/hey", (req, res)=>{
//     res.send("hey i'm here");
// });
// ===========customer Api's==============
router.post("/kissan/createCustomer", createCustomer);
router.get("/kissan/getCustomerList", getActiveCustomer);
router.delete("/kissan/removeCustomer/:customerId", deleteCustomer);

// ===============card api===========
router.post("/kissan/createCard", createCard);
router.get("/kissan/getCards", getCard);



module.exports = router;