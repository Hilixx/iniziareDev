const User = require('../models/Users')
const FrontEndMap = require('../models/FrontEnd')


module.exports = class frontendController{

    static async showMap(req,res){
        const userId = req.userId
        const findUser = await FrontEndMap.findOne({userId:userId})
        console.log(findUser)
        if(findUser == null){
            const userFrontend = new FrontEndMap({
                userId,
                javascript: false,
                html: false,
                css: false,
                framework: false,
                git: false,
                apiIntegration: false,
                tokens: false,
                complete: 0
            })
            await userFrontend.save()
            res.json({userId: userId, map: userFrontend})
            
        
        }else{
            res.json({userId: userId, map: findUser, exist: true})
        }
    }

    static async mapChange(req,res){

        const userId = req.userId
        const frontendmap = await FrontEndMap.findOne({userId})
        
        const userFrontend = {
            javascript : req.body.javascript,
            html : req.body.html,
            css: req.body.css,
            framework: req.body.protocols,
            git : req.body.git,
            apiIntegration : req.body.apiIntegration,
            tokens: req.body.tokens,
            
        }
        console.log(userFrontend)
        const changed = []
        let completeUpdate = 0
        if(userFrontend.javascript == 'on'){

            await frontendmap.updateOne({javascript:true})
            changed.push('javascript')
            
        }
        if(userFrontend.html == 'on'){
             
            await frontendmap.updateOne({html:true})
            changed.push('html')
        }
        if(userFrontend.css == 'on'){
           
            await frontendmap.updateOne({css:true})
            changed.push('css')
        }
        if(userFrontend.framework == 'on'){
           
            await frontendmap.updateOne({framework:true})
            changed.push('framework')
        }
        if(userFrontend.git == 'on'){
             
            await frontendmap.updateOne({git:true})
            changed.push('git')
        }
        if(userFrontend.apiIntegration == 'on'){
           
            await frontendmap.updateOne({apiIntegration:true})
            changed.push('apiIntegration')
        }
        if(userFrontend.tokens == 'on'){
             
            await frontendmap.updateOne({tokens:true})
            changed.push('tokens')
        }
       
        completeUpdate = frontendmap.complete + changed.length * 14.2
        if(completeUpdate >= 99){
            completeUpdate = 100
            await User.findOneAndUpdate({userId, frontEndBadge:true})
        }
        console.log(completeUpdate)
        await frontendmap.updateOne({complete:completeUpdate})
        res.json({message:'uptaded', userId: userId, dataUptades: changed})

        
        
    }
    

}