const app = require('./app'); // CommonJS require - correct path
const connectDB = require('./config/db');
const mongoose = require('mongoose');
require('dotenv').config(); // CommonJS require and config

//DATABASE connection
connectDB();

const port = process.env.PORT || 8001; // fetches port from ENV

const server = app.listen(port, () => {
    console.log("Server is running on port", port)
});

process.on("SIGINT", async() => {
    await mongoose.connection.close();
    server.close(()  => {
        process.exit(1)
    });
});
//Linting referer til at analysere kode for fejl, stil osv., lidt som en stavekontrol for 