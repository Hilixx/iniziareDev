const User = require('../models/Users')
const BackEndMap = require('../models/BackEnd')


module.exports = class backendController{

    static async showMap(req,res){
        const userId = req.userId
        const findUser = await BackEndMap.findOne({userId:userId})
        console.log(findUser)
        if(findUser == null){
            const userBackend = new BackEndMap({
                userId,
                api: false,
                databases: false,
                tokens: false,
                protocols: false,
                git: false,
                cloudComputation: false,
                apiTest: false,
                unitTest: false,
                docker: false,
                complete: 0
            })
            await userBackend.save()
            res.json({userId: userId, map: userBackend})
            
        
        }else{
            res.json({userId: userId, map: findUser, exist: true})
        }
    }

    static async mapChange(req,res){

        const userId = req.userId
        const backendmap = await BackEndMap.findOne({userId})
        
        const userBackend = {
            api : req.body.api,
            databases : req.body.databases,
            tokens: req.body.tokens,
            protocols: req.body.protocols,
            git : req.body.git,
            cloudComputation : req.body.cloudComputation,
            apiTest: req.body.apiTest,
            unitTest : req.body.unitTest,
            docker : req.body.docker,
        }
        console.log(userBackend)
        const changed = []
        let completeUpdate = 0
        if(userBackend.api == 'on'){

            await backendmap.updateOne({api:true})
            changed.push('api')
            
        }
        if(userBackend.databases == 'on'){
             
            await backendmap.updateOne({databases:true})
            changed.push('databases')
        }
        if(userBackend.tokens == 'on'){
           
            await backendmap.updateOne({tokens:true})
            changed.push('tokens')
        }
        if(userBackend.protocols == 'on'){
           
            await backendmap.updateOne({protocols:true})
            changed.push('protocols')
        }
        if(userBackend.git == 'on'){
             
            await backendmap.updateOne({git:true})
            changed.push('git')
        }
        if(userBackend.cloudComputation == 'on'){
           
            await backendmap.updateOne({cloudComputation:true})
            changed.push('cloudComputation')
        }
        if(userBackend.apiTest == 'on'){
             
            await backendmap.updateOne({apiTest:true})
            changed.push('apiTest')
        }
        if(userBackend.unitTest == 'on'){
             
            await backendmap.updateOne({unitTest:true})
            changed.push('unitTEst')
        }
        if(userBackend.docker == 'on'){
             
            await backendmap.updateOne({docker:true})
            changed.push('docker')
        }   
        completeUpdate = backendmap.complete + changed.length * 11.1
        if(completeUpdate == 99.9){
            completeUpdate = 100
            await User.findOneAndUpdate({userId, backEndBadge:true})
        }
        console.log(completeUpdate)
        await backendmap.updateOne({complete:completeUpdate})
        res.json({message:'uptaded', userId: userId, dataUptades: changed})

        
        
    }
    

}