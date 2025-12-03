const app = require('./app'); // CommonJS require - correct path
require('dotenv').config(); // CommonJS require and config

const port = process.env.PORT || 8001; // fetches port from ENV
app.listen(port, () => {
    console.log("Server is running on port", port)
})


//Linting referer til at analysere kode for fejl, stil osv., lidt som en stavekontrol for 