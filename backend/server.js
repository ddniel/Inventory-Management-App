const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute") 
const productRoute = require("./routes/productRoute")
const contactRoute = require('./routes/contactRoute')
const errorHandler = require("./middleWare/errorMiddleware")
const cookieParser = require("cookie-parser")
const path = require('path')


const app = express()

const PORT = process.env.PORT || 8080;


//Middlewares

app.use(express.json()) //Para manejar archivos .json en la aplicacion
app.use(express.urlencoded({extended:false})) // Para handle data que viene via URL
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "https://inventory-manager.vercel.app"],
    credentials: true

}))

app.use("/uploads", express.static(path.join(__dirname, 'uploads')))

//Routes Middleware
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/contactus", contactRoute)

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


  


