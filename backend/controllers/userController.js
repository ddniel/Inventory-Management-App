const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const registerUser = asyncHandler(async(req, res) => { // Async handler es un package que instalas para no tener que usar try an catch cuando usas async
    
    const {name, email, password} = req.body

    //validation
    if (!name || !email || !password){
        res.status(400)
        throw new Error("Please fill in all required fields")
    }

    if (password.length < 6){
        res.status(400)
        throw new Error("Password must be more than 6 characters")
    }

    //Check if user email already exists
    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error("Email has already been registed")
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password
    })

    if (user){
        const {_id, name, email, photo, phone, bio} = user
        res.status(201).json({
            _id, name, email, photo, phone, bio

        })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }

})

module.exports = {
    registerUser,
}