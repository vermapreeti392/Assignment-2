const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const Objectid=Schema.ObjectId;

const postSchema=new Schema({
    title:{type: String,required: true},
    body:{type:String},
    image:{type:String},
    user:{type: Objectid, ref: 'User'}
})

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel