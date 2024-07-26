import express from "express"
import { getAllUser, getUser, loginUser, registerUser } from "../controllers/user.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import { deletPropertyById, getAllProperties, getPropertiesByUsername, getPropertyById, registerProperty, updateProperty } from "../controllers/property.controller.js"

const router = express.Router()

//user routes
router.post("/user/register", registerUser)
router.post("/user/login", loginUser)
router.get("/user/getUser", authMiddleware, getUser)
router.get("/user/getAllUser", authMiddleware, getAllUser)

//proptery routes
router.post("/property/registerProperty",authMiddleware, registerProperty)
router.get("/property/getAllProperty", getAllProperties)
router.get("/property/getPropertyById/:id",authMiddleware, getPropertyById)
router.post("/property/getPropertiesByUserName",authMiddleware, getPropertiesByUsername)
router.post("/property/updateProperty", authMiddleware, updateProperty )
router.delete("/property/deleteProperty/:id", authMiddleware, deletPropertyById)

export default router