const express=require('express')
const User=require('../models/user');
const bodyParser = require('body-parser');
const jwt=require('jsonwebtoken')

const router = express.Router();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json());

router.post('/login',async (req,res)=>{
    try{
    const {email,password}=req.body
    if(email && password)
    {
       let data=await User.findOne({email:email,password:password})
       if(data)
       {
        const token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (6000000 * 60),data:data._id}, 'secret');
        return res.status(200).json({token})
       }
       else
       {
        return res.status(401).json({message:"Invalid Credentials"})
       }
    }
    else
    {
        return res.status(400).json({message:"Login Failed deatils are missing"})
    }
}
catch(err){
   return res.status(500).send(err)
}
})

module.exports = router;