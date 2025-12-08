//Node.js is a javascript runtime enviroment that allows you to run JS outside the browser. 
//A runtime enviroment is the conext in which ur code runs. 
//For instance python needs a python interpreter or like JVM for java
//The difference between compoling and intepreting
//** Compiled languages are traslated into machine code (binary instructons on the CPU before it runs and it builds a .exe file that can run) 
// interprested languages are execited line by line


// JS IS howerver mostly interpreted but some engines do JI compilation (Just in time)
//Basicially JS is first checks the syntax using AST and then inteprets the code line by line, turning the syntax in executuable byte code. 
//at the same time it compiles common functions or loops operations for faster execution, but how is it faster?
// //JIT is basically faster snce it doesnt b
// JIT sees “hot” code and converts it into machine code directly optimized for your CPU.

// No interpreter in the middle. The CPU can execute it directly, with fewer checks and jumps.

// Result: much faster execution.
const express = require('express'); // CommonJS
const cors = require('cors'); //library that allows cross client communication my sever

//App  express is an object that gives us evertyhing we need to build a webserver in node
//allows us to define routes. app.get or app.post
// attach middleware app.use cpmtrpæs wjat ajeååems nweween the request and routes.
// for instance prefixes our '/api/v2/expenses' requests to 

//App.js is blueprint it define 
const expenseRouter = require("./routers/expenseRouters") 
require('dotenv').config();

const app = express(); // creates express application cd instance like a class?

//Middleware aka that functions that sits in the request-response cycle and acces to both th the request and res.
//App.use is used to register middleware
app.use(express.json());
app.use(cors());

//API Routes
app.use('/api/v2/expenses', expenseRouter)

app.get('/', (req, res) => { // basicially an empty http
    console.log("Work");
    console.log(res.json);
})

module.exports = app; // CommonJS export - the app instance so it can be imported elsewhere.