const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const secret = 'any'
const BackEndMap = require('../models/BackEnd')
const FrontEndMap = require('../models/FrontEnd')

module.exports = class userController{

    static async registerUser(req,res){
        const nome = req.body.nome
        const login = req.body.login
        const password = req.body.password
        res.status(200).end(`Nome:${nome}`)
        const user = new User({nome,login,password})
        await user.save()
    }
    static async loginUser(req,res){
        const login = req.body.login
        const password = req.body.password
        const loginAuth = await User.findOne({login: login})
        const userId = loginAuth.id
        const passAuth = await User.findOne({password: password})


        if(loginAuth && passAuth){
            
            const token = jwt.sign({userId}, secret, {expiresIn:3000})
            res.status(200).end(`bem vindo: ${login} \n\ntoken: ${token}`)
        }else{
            res.status(401).end('acesso negado')
        }
        
        
    }
    static async verifyJWT(req,res,next){
        const token = req.headers['x-access-token']
        jwt.verify(token, secret, (err, decoded)=>{
            if(err) return res.redirect('/login').end('faça o login')(
                    'acesso negado'
            )
    
            req.userId = decoded.userId
            next()
        })
    }
    static async userEdit(req,res){
        const userId = req.userId
        const userUpdate = {
            nome:req.body.nome,
            description: req.body.description,
            region: req.body.region
        }
        await User.findOneAndUpdate({userId, userUpdate})
        res.json({message:"usuario atualizado", dadosAtualizados:userUpdate})
    }
    
    
    

    
}   