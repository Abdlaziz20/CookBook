const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const User=require('../modules/usetSchema');
const router=express.Router();




router.post('/register', async(req, res) => {
   const{email,password}=req.body;
   if(!email || ! password){
       return res.status(400).json({message:'Email and password are required'});
   }
 let user= await User.findOne({email});
 if(user){
    return res.status(400).json({message:'User already exists'});
 }
 const hashedPassword= await bcrypt.hash(password,10);
const  newuser= new User({
   email,
   password:hashedPassword
 });
 await newuser.save();

 let token =jwt.sign({email,id:newuser._id},process.env.SECRET_KEY,{expiresIn:'1w'});
return res.status(201).json({message:'User created',token,user:newuser});
});







router.post('/signin', async(req, res) => {
    const {email , password}=req.body;
    if(!email || ! password){
       return res.status(400).json({message:'Email and password are required'});
   }
let user= await User.findOne({email});
if(user && await bcrypt.compare(password,user.password)){
    let token=jwt.sign({email,id:user._id},process.env.SECRET_KEY,{expiresIn:'1w'});
    return res.status(200).json({message:'User signed in',token,user});
}
return res.status(400).json({message:'Invalid email or password'});
});





router.get('/:id', async (req, res) => {
    const user= await User.findById(req.params.id); 
    if(!user){
        res.status(404).json({message:"usernot found"})
    }
res.status(200).json({user})
});



router.put('/:id', (req, res) => {
res.send('Update user with ID: ' + req.params.id);
});
router.delete('/:id', (req, res) => {
    res.send('Delete user with ID: ' + req.params.id);
});
module.exports=router;
