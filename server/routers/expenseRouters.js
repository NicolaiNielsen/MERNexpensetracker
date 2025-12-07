//React dont fully repload pages, instead it renders components that matches the url
//This is not a redirect 

//React works with routers fungerer på 2 månder, til frotend og backend
//React routes render forskellige componenets
//react til at retunrere forskellige data
//De mapper begge en url path til ngoet bestemt

//<Route path="/expenses" element={<ExpensesPage />} /> omdirigere brugeren til en bestemt side /expesnse
///backend serveren returnerer kode router.get('/', expenseRouter.getAllExpense)
const express = require('express')
const router = express.Router();
const expenseController = require("../controllers/expenseControllers")

router
.get('/', expenseController.getAllExpense)
.post("/", expenseController.createExpense);

router
.put("/:id", expenseController.updateExpense)
.delete("/:id", expenseController.deleteExpense);


module.exports = router;