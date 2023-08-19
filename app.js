const mongoose = require('mongoose')
const express = require('express');                                           
const app = express();  

require("dotenv").config();                                                   
   

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const cors = require('cors');
app.use(cors());
                                                 
const PORT = 3000; 

const db = require('./db/connection');
const api=require('./routes/router');
app.use('/api',api);

//------------------------------------------------------------------

const path = require('path');

app.use(express.static(path.join(__dirname,'frontend')))

app.get('*', async(req, res)=> {
        res.sendFile(path.join(__dirname ,'frontend','index.html'))});

//--------------------------------------------------------------------------

app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
})
