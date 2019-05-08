//start the server

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const User = require('./model/user')
const Trip = require('./model/trip')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const {authMiddleware} = require('./middleware/authentication')
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())//middleware

app.post('/login', function(req,res){
    const {email,password} = req.body;
    console.log("THE EMAIL ",email)
    User.findOne({email}, (err,user)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        if(!user){
            return res.status(422).json({error:'User does not exist'})
        }
        if(user.isSamePassword(password)){
            const payload = {userId: user._id,
            email:user.email} 
            const token = jwt.sign(payload, config.secret,{expiresIn:'1h'})
            return res.status(200).json({token:token})
        
        }
        else{
            return res.status(422).json({error:'Wrong email/password'})
        }
    })
})




app.post('/user',function(req, res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    console.log("WE ARE CALLED")
    const newUser = new User({
        username: username,
        email: email,
        password: password
    })

    newUser.save((err)=>{
       if(err){
           return res.status(300).json({error:err})
       }
        res.json({newUser})
    })
}
)

app.post('/trip',authMiddleware, function(req,res){
    const location = req.body.location;
    const destination = req.body.destination;
    const user = req.body.user;

    const trip = new Trip({
        location:location,
        destination:destination,
        user:user
    })

    Trip.create(trip,(err, newTrip) =>{
        if(err){
            return res.status(300).json({error:err})
        }
        User.findById(user, (err, user)=>{
            if(err){
                return res.status(300).json({error:err})
            }
            if(!user){
                return res.status(300).json({error:'No user was found'})
            }
            User.update({_id:user.id},{
                $push:{
                    trips: newTrip
                }
            },
            function(){

            })
        })
        res.json({newTrip})
    })

})

app.get('/trip', authMiddleware,function(req,res){
    const userId = res.locals.user;
    User.findById(userId).populate('trips').exec((err,user)=>{
        if(user){
            console.log('SHOUL WORK ', user)
            Trip.find
            return res.status(200).json({trips:user.trips})
        }else{
            if(err)
               return res.status(200).json({error:err}) 
            res.status(300).json({error:'user not found'})
        }
    })
})

app.get('/', function(req,res){

    res.json({
        message:'Hey !'
    })
})

//promise
mongoose.connect(config.DB).then(()=>{
    app.listen(3600, function(){
        console.log("Server started on port 3600")
    })
}).catch(err => console.log(err))

