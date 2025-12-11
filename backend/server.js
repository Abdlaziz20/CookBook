const express=require('express');
const dotenv=require('dotenv').config();
const connectDB=require('./config/connectionDB');
const app=express();
const cors=require('cors');
app.use(cors());
const port =process.env.PORT || 3000;

connectDB();


app.use(express.json());



app.use("/api/recipes",require('./routes/recipe'));
app.use("/api/users",require('./routes/user'));
app.use('/public', express.static('public'));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});