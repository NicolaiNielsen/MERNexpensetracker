import { Search, Receipt, Edit2 } from "lucide-react";
import React from "react";

const transactions = [];

function TransactionList() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Transactions</h3>
          <p className="text-sm text-gray-500 mt-1">Total</p>
        </div>
        <div className="px-4 py-2 bg-gray-700 text-white rounded-full text-sm font-bold">
          {transactions.length}
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="flex gap-3 mb-5">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <select className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:border-indigo-500 cursor-pointer">
          <option>All Categories</option>
          <option>Food</option>
          <option>Entertainment</option>
          <option>Transport</option>
        </select>
      </div>

      {/* Transaction List */}
      <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2">
        {transactions.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-600 font-semibold">No Transactions found</p>
            <p className="text-sm text-gray-400 mt-1">Try different filters</p>
          </div>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50 border border-gray-100 rounded-xl transition-all group"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm bg-indigo-100 text-indigo-500">
                <Receipt className="w-5 h-5" />
              </div>

              {/* Description & Category */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{tx.description}</p>
                <p className="text-sm text-gray-500">{tx.category}</p>
              </div>

              {/* Amount & Edit Button */}
              <div className="flex items-center gap-2">
                <div className="text-gray-800 font-bold">${tx.amount}</div>
                <button className="flex items-center gap-1 px-3 py-1 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600 transition">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionList;
