const express=require('express');
const dotenv=require('dotenv').config();
const connectDB=require('./config/connectionDB');
const app=express();
const cors=require('cors');
app.use(cors());
const port =process.env.port || 3000;

connectDB();


app.use(express.json());



app.use("/api/recipes",require('./routes/recipe'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});