import { useState } from "react";

export default function Statistics({ subscriptions, onClose }) {
  // SEARCH
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // MONTHLY COST
  const monthlyCost = subscriptions.reduce((total, sub) => {
    const amount = Number(sub.amount);

    if (sub.frequency === "Monthly") {
      return total + amount;
    }

    if (sub.frequency === "Yearly") {
      return total + amount / 12;
    }

    return total;
  }, 0);

  // YEARLY COST
  const yearlyCost = subscriptions.reduce((total, sub) => {
    const amount = Number(sub.amount);

    if (sub.frequency === "Monthly") {
      return total + amount * 12;
    }

    if (sub.frequency === "Yearly") {
      return total + amount;
    }

    return total;
  }, 0);

  // MOST EXPENSIVE
  const mostExpensive = subscriptions.reduce((mostExpensive, sub) => {
    const amount = Number(sub.amount);

    let monthlyAmount = amount;

    if (sub.frequency === "Yearly") {
      monthlyAmount = amount / 12;
    }

    if (mostExpensive === null || monthlyAmount > mostExpensive.monthlyAmount) {
      return {
        ...sub,
        monthlyAmount,
      };
    }

    return mostExpensive;
  }, null);

  return (
    <div>
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Statistics</h1>

        <button onClick={onClose} className="text-indigo-950 font-medium">
          ← Timeline
        </button>
      </div>

      {/* SEARCH */}

      <div className="mt-6 mb-6">
        <input
          type="text"
          placeholder="Search subscriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded-xl p-3 outline-none"
        />
      </div>

      {/* STATISTICS CARDS */}

      <div className="grid grid-cols-2 gap-4">
        {/* MONTHLY */}

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Monthly Cost</p>

          <h2 className="text-2xl font-bold">£{monthlyCost.toFixed(2)}</h2>
        </div>

        {/* YEARLY */}

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Yearly Cost</p>

          <h2 className="text-2xl font-bold">£{yearlyCost.toFixed(2)}</h2>
        </div>

        {/* NUMBER OF SUBSCRIPTIONS */}

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Subscriptions</p>

          <h2 className="text-2xl font-bold">{subscriptions.length}</h2>
        </div>

        {/* MOST EXPENSIVE */}

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Most Expensive</p>

          <h2 className="text-2xl font-bold">
            {mostExpensive ? mostExpensive.name : "None"}
          </h2>

          <p className="text-gray-500">
            {mostExpensive
              ? `£${mostExpensive.monthlyAmount.toFixed(2)} / month`
              : "No subscriptions"}
          </p>
        </div>
      </div>

      {/* SEARCH RESULTS */}

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Your Subscriptions</h2>

        {filteredSubscriptions.length > 0 ? (
          filteredSubscriptions.map((sub) => (
            <div key={sub.id} className="border rounded-xl p-4 mb-3">
              <h3 className="font-bold text-lg">{sub.name}</h3>

              <p>
                Amount: {sub.currency} {sub.amount}
              </p>

              <p>Frequency: {sub.frequency}</p>

              <p>Billing date: {sub.date}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No subscriptions found.</p>
        )}
      </div>
    </div>
  );
}
