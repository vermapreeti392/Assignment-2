const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const Objectid=Schema.Objectid;

const UserSchema=new Schema({
    name:{type: String,required: true},
    email:{type:String, unique:true},
    password:{type:String, required:true}
})

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel