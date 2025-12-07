const Expense = require('./../models/expenseModel')

exports.getAllExpense = async(req, res) => {
    try {
        const expense = await Expense.find()
        res.json({success: true, count: expense.length, data:expense})
        
    } catch (error) {
        res.status(500).json({succes: false, message: error.message});
    }
}

exports.createExpense = async(req, res) => {
    try {
        const {description, amount, category, date} = req.body;
        const expense = new Expense({description, amount, category, date})
        const newExpense = await expense.save();

        res.status(201).json({sucess: true, data: newExpense})
    } catch (error) {
        res.status(500).json({succes: false, message: error.message});
    }
}

exports.updateExpense = async(req, res) => {
    try {
        const updateExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        if (!updateExpense) return res.status(404).json({succes: false, message: "Not found"})

        console.log("Update function called with params: " + req.params.id);

        res.status(201).json({sucess: true, data: updateExpense});
    } catch (error) {
        res.status(500).json({succes: false, message: error.message});
    }
};

exports.deleteExpense = async(req, res) => {
    try {
        const deleted = await Expense.findByIdAndDelete(req.params.id);

        if(!deleted) return res.status(404).json({succes: false, message: "Not found"})
        console.log("Delete function called with params: " + req.params.id);
        res.status(201).json({sucess: true, data: deleted, message: "Deleted succesfully"})
    } catch (error) {
        res.status(500).json({succes: false, message: error.message});
    }
};


/* so you have routes where u define ur url api endspoint? They are called routes cuz they map to speicific uri? THen you have the controller that controls what happens with route? */


// async → marks a function that will return a promise.
//A Promise is an object that represents a value that might not be available yet, but will be at some point in the future.
// await → pauses execution until the promise resolves (or rejects).