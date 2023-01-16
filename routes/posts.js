const express=require('express')
const Post=require('../models/post');
const bodyParser = require('body-parser');
const jwt=require('jsonwebtoken')

const router = express.Router();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json());

router.get('/posts',async (req,res)=>{
    try{
    const post=await Post.find()
    return res.status(200).send(post)
    }
    catch(err){
      return res.status(500).json({message: err.message})
    }
})


router.post('/posts',async (req,res)=>{
    const {title,body,image}= req.body
    try{
        if(title && body && image)
        {
        const post=await Post.create({title,body,image,user:req.user})
        return res.status(201).json({meassage:'Post created Successfully',post})
        }
        else
        {
            return res.status(400).json({meassage:'details are missing'})
        }
    }catch(err){
        return res.status(400).json({meassage: err.meassage})
    }
})

router.put('/posts/:id',async(req,res)=>{
    try{
       const {body,title,image}= req.body
       let post=await Post.updateOne({_id: req.params.id},{$set : {body,title,image}})
       return res.status(201).json({meaasge:'updated post',post})
    }
    catch(err){
        return res.status(400).json({meassage: err.meassage})
    }
})

router.delete('/posts/:id',async(req,res)=>{
    try{
        let post=await Post.deleteOne({_id:req.params.id})
        return res.status(201).json({meaasge:'post deleted',post})
    }
    catch(err){
        return res.status(400).json({meassage: err.meassage})
    }
})

module.exports= router