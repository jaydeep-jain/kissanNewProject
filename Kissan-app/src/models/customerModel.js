const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const customerSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    DOB: { type: String, required: true, trim: true },
    emailID: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    status: { type: String, default:"Active", trim: true, enum: ["Active", "Inactive"] },
    isDeleted:{type:Boolean, default:false}
}, { timestamps: true });

module.exports = mongoose.model("customer", customerSchema);