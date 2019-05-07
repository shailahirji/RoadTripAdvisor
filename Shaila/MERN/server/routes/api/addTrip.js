const UserSession= require('../../models/UserSession');
const Trip= require('../../models/Trip');
var ObjectId = require('mongodb').ObjectID;
const bcrypt=require('bcrypt');

module.exports=(app)=>{
    /*
    Add trip
    */
        app.post('/api/account/AddTrip', (req,res,next)=>{
            const {body}=req;
            const{startDest,endDest,token,waypoints}=body;
       
            if(!startDest){
                return res.send({
                    success:false,
                    message:'Error: start dest cannot be blank.'
                });
            }
            if(!endDest){
                return res.send({
                    success:false,
                    message:'Error: End dest cannot be blank.'
                });
            }
            if(!token){
                return res.send({
                    success:false,
                    message:'Error: No token!.'
                });
            }
            
            //save the new trip 
            const newTrip = new Trip();
            newTrip.tripName=startDest+"-"+endDest;
            newTrip.startDest=startDest;
            newTrip.endDest=endDest;
            waypoints.map(way=>{newTrip.waypoints.push(way);})
        
            //get tripOwner Id via the token 
            UserSession.find({
                _id:ObjectId(token)
            },(err,user)=>{
                if(err){
                
                    return res.send({
                        success:false,
                        message:'token didnt match a user '
                    });
                }else if(user){
                    newTrip.tripOwnerID=user[0].userId //store the id of the user whose trip this is 
                }

                //check if the trip with the name exists, if it does, update the wappoints array, dont create new trip 

                Trip.findOneAndUpdate({tripOwnerID:user[0].userId,tripName:startDest+"-"+endDest},{$set:{waypoints:newTrip.waypoints}},function(err,doc){
                    if(err){
                        console.log("Something wrong when updating data");
                        return res.send({
                            success:false,
                            message:'Error: Something went wrong when updating data'
                        })
                    }if(!doc){
                        newTrip.save((err,trip)=>{
                            if(err){
                                return res.send({
                                    success:false,
                                    message:'Server error'
                                });
                            }
                            return res.send({
                                success:true,
                                message:'Added trip'
                            })
                        }) 
                    }else{
                    console.log("updated successfully")
                    return res.send({
                        success:true,
                        message:'Updated trip'
                    })
                }
                });

        
            })
                    
        });

       
}