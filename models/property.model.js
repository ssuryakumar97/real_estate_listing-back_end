import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }, 
    location: {
        type: String,
        required: true
    },
    propertyType:{
        type: String,
        required: true
    },
    bhk: {
        type: String,
        default: null
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    agentName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    soldDetails: {
        type: String,
        default: "notSold"
    },
}, {timestamps: true})

export default mongoose.model("Property", propertySchema)