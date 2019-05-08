const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    trips:[{
        type:Schema.Types.ObjectId,
        ref:'Trip'
    }] 
})//ehat a user will have

UserSchema.methods.isSamePassword = function(incomingPassword){
    return this.password == incomingPassword
}


module.exports = mongoose.model('User', UserSchema)