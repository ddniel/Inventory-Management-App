const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express()

const PORT= process.env.PORT || 5000;

//Conect to DataBase and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        app.listen(PORT, () =>{
            console.log(`Server running on port ${PORT}`)
        })

    })
    .catch((err) => console.log(err))


  


