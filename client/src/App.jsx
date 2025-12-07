import React, { useState } from "react";
import { Plus } from "lucide-react";
import StatCard from "./components/StatCard";
import SpendingChart from "./components/SpendingChart";
import CategoryChart from "./components/CategoryChart";
import TransactionList from "./components/TransactionList";
import Modal from "./components/Modal"; // import your modal

function App() {
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
          <StatCard />
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
