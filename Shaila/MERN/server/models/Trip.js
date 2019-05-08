//anything you need platform to save 
const mongoose= require('mongoose');

const TripSchema= new mongoose.Schema({
    tripOwnerID:{
        type:String,
        default:''
    },
    tripName:{
        type:String,
        default:''
    },
    startDest:{
        type:String,
        default:''
    },
    endDest:{
        type:String,
        default:''
    },
    waypoints:[]
   
});

module.exports=mongoose.model('Trip',TripSchema);