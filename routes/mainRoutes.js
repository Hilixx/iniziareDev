const express = require('express')
const routes = express.Router()
const userController = require('../controller/userController')
const User = require('../models/Users')
const backendController = require('../controller/backendController')
const frontendController = require('../controller/frontendController')

routes.post('/register', userController.registerUser )
routes.post('/login', userController.loginUser)
routes.get('/home',userController.verifyJWT, (req,res)=>{
    res.status(200).json({message:"bem vindo ", userId: req.userId})
    
})
routes.get('/backendmap',userController.verifyJWT,backendController.showMap)
routes.post('/backendmap',userController.verifyJWT,backendController.mapChange)

routes.get('/frontendmap',userController.verifyJWT,frontendController.showMap)
routes.post('/frontendmap',userController.verifyJWT,frontendController.mapChange)

module.exports = routes