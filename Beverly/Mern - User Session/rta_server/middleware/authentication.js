const User = require('./../model/user')
const jwt = require('jsonwebtoken')
const config = require('./../config/dev')
exports.authMiddleware = (req,res,next)=>{
    const token = req.headers.authorization //
    console.log('TOKEN ',token)
    if(!token){
        return res.status(422).json({error:'Please log in to access'})
    }
    const user = parseToken(token);
    if(!user){
        return res.status(422).json({err:'No valid token provided'})
    }
    User.findById(user.userId, (err,user)=>{
        if(err){
            return res.status(422).json(err)
        }
        if(user){
            res.locals.user = user
            next()
        }
        else{
            return res.status(422).json({err:'Not authorized'})
        }
    })

}

function parseToken(receivedToken){
    token = receivedToken.split(' ')[1]
    try{
        const decoded = jwt.verify(token, config.secret)
        console.log("Le token decode ", decoded)
        return decoded
    }
    catch(err){
        console.log("UNE ERREUR ",err)
        return null;
    }
  
    
}