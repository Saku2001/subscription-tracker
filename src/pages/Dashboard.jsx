import { useState } from "react";
import { format, getDaysInMonth } from "date-fns";

import Timeline from "../components/timeline/Timeline";

import Statistics from "../components/statistics/Statistics";

export default function Dashboard() {
  //                                 ALL THE STATES

  const [showForm, setShowForm] = useState(false);

  const [subscription, setSubscription] = useState({
    name: "",
    amount: "",
    currency: "GBP",
    frequency: "Monthly",
    date: "",
  });

  const [subscriptions, setSubscriptions] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [showStatistics, setShowStatistics] = useState(false);

  console.log(subscriptions);

  //                      FILTERED SUBS ON SELECTED DATE
const selectedSubscriptions = subscriptions.filter((sub) => {
  const subscriptionDate = new Date(sub.date);


  const subscriptionDay = subscriptionDate.getDate();

  // MONTHLY
  if (sub.frequency === "Monthly") {
    // How many days does the selected month have?
    const daysInSelectedMonth = getDaysInMonth(selectedDate);

    // If the subscription day doesn't exist in this month,
    // use the last day of the month.
    const billingDay = Math.min(subscriptionDay, daysInSelectedMonth);

    return (
      selectedDate >= subscriptionDate && selectedDate.getDate() === billingDay
    );
  }

  // YEARLY
  if (sub.frequency === "Yearly") {
    return (
      selectedDate >= subscriptionDate &&
      selectedDate.getMonth() === subscriptionDate.getMonth() &&
      selectedDate.getDate() === subscriptionDay
    );
  }

  return false;
});
  //                                ALL THE FUNCTIONS
  const handleChange = (e) => {
    setSubscription({ ...subscription, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("SAVE CLICKED");
    console.log("editingId:", editingId);
    console.log("subscription:", subscription);
    if (!subscription.name || !subscription.amount || !subscription.date) {
      alert("Please fill the required fields");
      return;
    }

    if (editingId !== null) {
      const updatedSubscriptions = subscriptions.map((sub) => {
        if (sub.id === editingId) {
          return {
            ...subscription,
            id: editingId,
          };
        }

        return sub;
      });

      setSubscriptions(updatedSubscriptions);
      setEditingId(null);
    } else {
      const newSubscription = {
        ...subscription,
        id: crypto.randomUUID(),
      };

      setSubscriptions([...subscriptions, newSubscription]);
    }

    setSubscription({
      name: "",
      amount: "",
      currency: "GBP",
      frequency: "Monthly",
      date: "",
    });

    setShowForm(false);
  };

  const handleDelete = (id) => {
    const updatedSubscriptions = subscriptions.filter((sub) => sub.id !== id);
    setSubscriptions(updatedSubscriptions);
  };

  const handleEdit = (sub) => {
    console.log("EDIT CLICKED:", sub);
    setSubscription(sub);
    setEditingId(sub.id);
    setShowForm(true);
  };

  return (
    <div className="bg-white py-3 mx-20  mt-20 mb-20 rounded-2xl p-4">
      {showStatistics ? (
        <Statistics
          subscriptions={subscriptions}
          onClose={() => setShowStatistics(false)}
        />
      ) : (
        <Timeline
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onStatistics={() => setShowStatistics(true)}
        />
      )}
      <p>Selected date: {format(selectedDate, "dd/MM/yyyy")}</p>

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
          <select
            name="currency"
            value={subscription.currency}
            onChange={handleChange}
            className="border p-2 mt-3 block"
          >
            <option value="GBP">GBP (£)</option>
            <option value="EUR">EUR (€)</option>
            <option value="USD">USD ($)</option>
          </select>
          <select
            name="frequency"
            value={subscription.frequency}
            onChange={handleChange}
            className="border p-2 mt-3 block"
          >
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
          <input
            type="date"
            name="date"
            value={subscription.date}
            onChange={handleChange}
            className="border p-2 mt-3 block"
          />
          <button
            onClick={handleSave}
            className="bg-blue-900 px-4 my-1.5 py-2 rounded-2xl text-white"
          >
            SAVE
          </button>
        </div>
      )}
      {selectedSubscriptions.map((sub) => (
        <div key={sub.id} className="mt-5 border rounded-lg p-4">
          <h3>{sub.name}</h3>
          <p>Amount: £{sub.amount}</p>
          <p>Frequency: {sub.frequency}</p>
          <p>Currency: {sub.currency}</p>
          <p>Date: {sub.date}</p>
          <button onClick={() => handleDelete(sub.id)} className="text-red-700">
            remove
          </button>
          <button
            onClick={() => handleEdit(sub)}
            className="text-blue-700 mr-4"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
