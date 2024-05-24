const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8302;

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

const connectDB = require("./config/db"); 
connectDB();

app.use('/api/authority',require('./routes/authorityRoutes'));
app.use('/api/owner',require('./routes/ownerRoutes'));
app.use("/api/recipient",require("./routes/recipientRoutes"));
app.use("/api/cloud",require("./routes/cloudRoutes"));

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})