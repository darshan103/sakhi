import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
} from "../controllers/authController.js";

import {requireSignIn,isAdmin} from "../middlewares/authMiddleware.js";

// route object
const router = express.Router()

// routing
// Register || method-POST
router.post('/register', registerController)

// Login || POST
router.post('/login', loginController)

// Forgot password
router.post('/forgot-password', forgotPasswordController)

// test route
router.get('/test', requireSignIn, isAdmin, testController)

// protected user route auth
router.get('/user-auth', requireSignIn, (req,res)=>{
    res.status(200).send({ok:true});
})

// protected admin route auth
router.get('/admin-auth', requireSignIn,isAdmin, (req,res)=>{
    res.status(200).send({ok:true});
})



export default router