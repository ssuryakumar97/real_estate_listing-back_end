import Property from "../models/property.model.js"

export const registerProperty = async(req,res) => {
    // console.log(userEmail)
    try {
        const { email, location, propertyType, bhk, description, price, agentName, contactNumber } = req.body
        const property = new Property({ email,location, propertyType, bhk, description, price, agentName, contactNumber })
        await property.save()
        res.status(200).json({message: "Your property registered successfully", data: property})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const getAllProperties = async(req,res) => {
    try {
        const properties = await Property.find()
        res.status(200).json(properties)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const getPropertiesByUsername = async(req,res) => {
    try {
        const {email} = req.body
        // console.log(email)
        const userProperties = await Property.find({email})
        res.status(201).json(userProperties)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const getPropertyById = async(req,res) => {
    try {
        const {id} = req.params
        // console.log(email)
        const userProperties = await Property.findOne({_id: id})
        res.status(201).json(userProperties)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const updateProperty = async(req,res) => {
    try {
        const {_id} = req.body
        const updateProperty = await Property.findOneAndUpdate({_id},{$set: req.body},{new: true})
        res.status(200).json({message: "Property updated successfully", data: {updateProperty}})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in updating property"})
    }
}

export const deletPropertyById = async(req,res) => {
    try {
        const {id} = req.params
        const deleteProperty = await Property.deleteOne({_id:id})

        res.status(200).json({message: "Property deleted successfully", data: {deleteProperty}})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in deleting property"})
    }
}