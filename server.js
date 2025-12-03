const app = require('./app'); //This is how we import the app.js
require('dotenv').config(); //imports dotenv like a class, then call config on ont?
//read the .env and adds variables to process.env

const port = process.env.PORT || 8001; //fetches port from ENV
app.listen(port, () => {
    console.log("Server is running on port", port)
})
