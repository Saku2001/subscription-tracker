import { useState } from "react";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);

  const [subscription, setSubscription] = useState({
    name: "",
    amount: "",
    currency: "GBP",
    frequency: "Monthly",
    date: "",
  });

  const handleChange = (e) => {
    setSubscription({ ...subscription, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white py-3 mx-20 h-80 mt-20 mb-20 rounded-2xl p-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-900 px-4 py-2 rounded-2xl text-white"
      >
        Add
      </button>
      {showForm && (
        <div className="mt-6 p-4 border rounded-lg">
          <h2>Add Subscription Form</h2>
          <input
            type="text"
            name="name"
            placeholder="Netflix"
            value={subscription.name}
            onChange={handleChange}
            className="border p-2 mt-3 block"
          />
          <input
            type="number"
            name="amount"
            placeholder="12.99"
            value={subscription.amount}
            onChange={handleChange}
            className="border p-2 mt-3 block"
          />
          <input
            type="date"
            name="date"
            value={subscription.name}
            onChange={handleChange}
            className="border p-2 mt-3 block"
          />
        </div>
      )}
    </div>
  );
}
