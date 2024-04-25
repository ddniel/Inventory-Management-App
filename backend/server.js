const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute") 
const errorHandler = require("./middleWare/errorMiddleware")
const cookieParser = require("cookie-parser")


const app = express()

const PORT = process.env.PORT || 8080;


//Middlewares

app.use(express.json()) //Para manejar archivos .json en la aplicacion
app.use(express.urlencoded({extended:false})) // Para handle data que viene via URL
app.use(bodyParser.json())
app.use(cookieParser())

//Routes Middleware
app.use("/api/users", userRoute)

//Routes

app.get("/", (req, res)=>{
    res.send("Hola Danito")
})

//Error Middleware

app.use(errorHandler)

//Conect to DataBase and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        app.listen(PORT, () =>{
            console.log(`Server running on port ${PORT}`)
        })

    })
    .catch((err) => console.log(err))


  


