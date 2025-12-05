const express = require('express')
const router = express.Router();
const expenseRouter = require("../controllers/expenseControllers")

router.get('/', expenseRouter.getAllExpense)

module.exports = router;