const mongoose=require('mongoose');
const connectDB=async()=>{
await mongoose.connect(process.env.mongo_uri)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.error("MongoDB connection error:", err));


}
module.exports=connectDB;