const mongoose = require('mongoose')

const connectDB = async() => { //Asynchronous arrow function allows us to wait for a repsonse before executing next lines of code. 
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI.replace("<DATABASE_PASSWORD>", process.env.DATABASE_PASSWORD)) // The pw could just be stored in the .env but this offers more flexibility
        console.log("DB Connected")
    } catch (error) {
        console.log("Couldnt connect to mongoDV", error.message)
        process.exit(1)
    }
}


module.exports = connectDB;