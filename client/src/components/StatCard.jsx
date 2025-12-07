import React from "react";

function StatCard() {
  return (
    <div className="rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer transition-all hover:scale-105 hover:shadow-2xl bg-gray-700">
      {/* Icon section */}
      <div className="inline-flex p-3 rounded-xl mb-4 group-hover:rotate-12 transition-all duration-300 bg-gray-600">
        Icons
      </div>

      {/* Main text */}
      <div>
        <h3 className="text-3xl lg:text-4xl font-bold mb-1">Value</h3>
        <p className="text-sm opacity-90 font-medium">Title</p>
      </div>

      {/* Subtitle */}
      <p className="text-xs opacity-75 mt-2">Subtitle</p>
    </div>
  );
}

export default StatCard;
