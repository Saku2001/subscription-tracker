export default function Statistics({ subscriptions, onClose }) {
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

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Statistics</h1>

        <button onClick={onClose} className="text-indigo-950 font-medium">
          ← Timeline
        </button>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Monthly Cost</p>

          <h2 className="text-2xl font-bold">£{monthlyCost.toFixed(2)}</h2>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Yearly Cost</p>

          <h2 className="text-2xl font-bold">£{yearlyCost.toFixed(2)}</h2>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Subscriptions</p>

          <h2 className="text-2xl font-bold">{subscriptions.length}</h2>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-gray-500">Most Expensive</p>

          <h2 className="text-2xl font-bold">£0.00</h2>
        </div>
      </div>
    </div>
  );
}