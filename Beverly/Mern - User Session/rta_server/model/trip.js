const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const TripSchema = new Schema({
    location:{
        type:String
    },
    destination:{
        type:String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Trip', TripSchema)