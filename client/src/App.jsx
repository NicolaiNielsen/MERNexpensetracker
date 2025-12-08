import React, { useState } from "react";
import { DollarSign, Plus, ShoppingCart, TrendingUp } from "lucide-react";
import StatCard from "./components/StatCard";
import SpendingChart from "./components/SpendingChart";
import CategoryChart from "./components/CategoryChart";
import TransactionList from "./components/TransactionList";
import Modal from "./components/Modal"; // import your modal
import { Wallet } from "lucide-react";

import {
  fetchExpenses,
  createExpenses,
  updateExpenses,
  deleteExpenses,
} from "./api.js";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        // call the function
        const [expData] = await Promise.all([fetchExpenses()]);

        // normalize list safely
        const normalized = (expData || []).map((e) => ({
          ...e,
          amount: Number(e.amount || 0),
          category: e.category || "Unknown",
        }));

        setExpenses(normalized); // or whatever your state setter is
      } catch (error) {
        console.error("load error", error);
      } finally {
        setLoading(false);
      }
    };

    load(); // IMPORTANT: call the function
  }, []); // empty array so it runs once

  // status card calculations
  const calculationsStats = (expenseList) => {
    // Ensure we have a valid array. If `expenseList` is null/undefined, default to empty array.
    const list = expenseList || [];

    // Calculate the total sum of all expense amounts.
    // `reduce` iterates over the array and accumulates the sum.
    // Number(e.amount || 0) ensures we convert the amount to a number and treat missing amounts as 0.
    const total = list.reduce((sum, e) => sum + Number(e.amount || 0), 0);

    // Calculate the total per category.
    // We use reduce to build an object where keys are categories and values are sums of amounts.
    const categoryTotal = list.reduce((acc, e) => {
      // If the category already exists in the accumulator, add the amount; otherwise, start with 0.
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount || 0);
      return acc; // Return accumulator for next iteration
    }, {}); // {} is the initial value for the accumulator

    // Find the highest expense amount
    // If the list is empty, highest is 0
    const highest =
      list.length > 0
        ? Math.max(...list.map((e) => Number(e.amount) || 0)) // Spread the mapped amounts into Math.max
        : 0;

    // Return an object with all calculated stats
    return {
      total, // Total of all expenses
      count: list.length, // Number of expense entries
      avg: list.length > 0 ? total / list.length : 0, // Average expense
      highest, // Highest single expense
      categoryTotal, // Total per category
    };
  };

  const stats = calculationsStats(expenses);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddExpense = (expense) => {
    console.log("New Expense:", expense);
    // TODO: add it to your state or API
  };

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 lg:py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-700 lg:text-4xl mb-1">
              Expense Tracker
            </h1>
            <p className="text-gray-700">Manage your finance with ease</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)} // <-- open modal
              className="px-4 py-2 bg-gray-600 text-white font-semibold hover:shadow-2xl transition-all flex items-center gap-2 rounded-xl"
            >
              <Plus className="w-5 h-5" />
              Add Expense
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            value={`$${stats.total.toFixed(2)}`} //whats toFixed(2) decimal places
            title="Total Spent"
            icon={Wallet}
            subtitle={"This month"}
            bgColor="bg-gradient-to-br from-indigo-500 to-indigo-600"
            iconColor="bg-indigo-700"
          />
          <StatCard
            value={`$${stats.total.toFixed(2)}`} //whats toFixed(2) decimal places
            title="Expenses"
            icon={DollarSign}
            subtitle={"This month"}
            bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
            iconColor="bg-purple-700"
          />
          <StatCard
            value={`$${stats.total.toFixed(2)}`} //whats toFixed(2) decimal places
            title="Average"
            icon={TrendingUp}
            subtitle={"This month"}
            bgColor="bg-gradient-to-br from-red-500 to-red-600"
            iconColor="bg-indigo-700"
          />
          <StatCard
            value={`$${stats.total.toFixed(2)}`} //whats toFixed(2) decimal places
            title="Highest"
            icon={ShoppingCart}
            subtitle={"This month"}
            bgColor="bg-gradient-to-br from-pink-500 to-indigo-600"
            iconColor="bg-indigo-700"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3">
            <SpendingChart />
          </div>
          <div className="lg:col-span-2">
            <CategoryChart />
          </div>
        </div>

        {/* Transaction List */}
        <TransactionList />
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddExpense}
      />
    </div>
  );
}

export default App;
