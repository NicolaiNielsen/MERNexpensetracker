//MongoDB schemeless db
//Mongoose is a MongoDB Object Data Modeling (ODM) library for Node.js.
//ALlows me to create a JS object and save to a mongDB collection
//MongoDB stores each entry as a document or nested JSON
//Mongoose is an Object–Document Mapper (ODM) that lets you take JavaScript objects and store them as persistent documents in a MongoDB datab

const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        amount: {
            type: Number,
            required: true,
            min: 0.01,
        },
        category: {
            type: String, 
            required: true,
            enum: [
                "Food",
                "Transport",
                "Entertainment",
                "Shopping",
                "Bills",
                "Other",
            ],
        },
        date: {
            type: Date,
            default: Date.now
        }
    }, 
    { timestamps: true }
);

//expenseSchema.pre("save", ...)
//This tells Mongoose: “Before saving a document to the database, run this function.” pre hooks can modify the document or perform checks before it’s persisted.
//Document middleware

expenseSchema.pre("save", function(next) {
    if (this.amount) this.amount = Math.round(this.amount * 100) / 100; //round up to nearest decimal
    next();
});

const Expense = mongoose.model("CopyExpense", expenseSchema); //Creates a model tied to a MongoDB collection using your schem
module.exports = Expense; // Lets other files use this model to interact with the database.