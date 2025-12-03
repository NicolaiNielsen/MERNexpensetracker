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
const express = require('express') //Import express library for building webservers in node. 

const app = express(); //creates express application instance like a class?

app.get('/', (req, res) => { //basicially an empty hhtp
    console.log("Work");
})

module.exports = app; //the app instance so it can be imported elsewhere.