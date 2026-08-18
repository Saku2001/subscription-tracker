import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Statistics({ subscriptions, onClose }) {
  // SEARCH
  const [searchTerm, setSearchTerm] = useState("");
  const [period, setPeriod] = useState("monthly");

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

  // AMOUNT DISPLAYED IN DONUT
  const displayedCost = period === "monthly" ? monthlyCost : yearlyCost;
  const chartData = subscriptions
    .map((sub) => {
      const amount = Number(sub.amount);

      const monthlyAmount = sub.frequency === "Yearly" ? amount / 12 : amount;

      return {
        name: sub.name,
        amount: monthlyAmount,
      };
    })
    .sort((a, b) => b.amount - a.amount);
  const ringData = [
    {
      name: "Total",
      value: 100,
    },
  ];

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
      {searchTerm.trim() !== "" && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Search Results</h2>

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
      )}

      {/* STATISTICS CARDS */}

      {/* DONUT CARD */}

      <div className="mt-6 border rounded-2xl p-5 bg-white">
        {/* MONTHLY / YEARLY TOGGLE */}

        <div className="flex justify-center mb-4">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setPeriod("monthly")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                period === "monthly"
                  ? "bg-indigo-950 text-white"
                  : "text-gray-500"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setPeriod("yearly")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                period === "yearly"
                  ? "bg-indigo-500 text-white"
                  : "text-gray-500"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* DONUT CONTAINER */}

        <div className="relative w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ringData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius="88%"
                outerRadius="108%"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                <Cell fill="#312e81" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* CENTER CONTENT */}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-4xl font-bold text-indigo-950">
                £{displayedCost.toFixed(2)}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {subscriptions.length} subscriptions
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* SEARCH RESULTS */}

      <div className="mt-8 border rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4">Monthly Cost by Subscription</h2>

        <ResponsiveContainer width="100%" height={150}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis type="number" tickFormatter={(value) => `£${value}`} />

            <YAxis type="category" dataKey="name" width={80} />

            <Tooltip
              formatter={(value) => [`£${Number(value).toFixed(2)}`, "Monthly"]}
            />

            <Bar dataKey="amount" fill="#312e81" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
