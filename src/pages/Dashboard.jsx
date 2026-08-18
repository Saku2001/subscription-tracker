import { useState } from "react";
import { format, getDaysInMonth, parseISO, startOfDay } from "date-fns";

import SubscriptionCard from "../components/subscriptions/SubscriptionCard";

import SubscriptionForm from "../components/subscriptions/SubscriptionForm";

import Timeline from "../components/timeline/Timeline";

import Statistics from "../components/statistics/Statistics";

export default function Dashboard() {
  //                                 ALL THE STATES

  const [showForm, setShowForm] = useState(false);

  const [subscription, setSubscription] = useState({
    name: "",
    domain: "",
    logo: "",
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
  console.log("SELECTED DATE:", format(selectedDate, "yyyy-MM-dd"));

  const subscriptionDate = parseISO(sub.date);

  console.log(
    "CHECKING:",
    sub.name,
    "subscription date:",
    format(subscriptionDate, "yyyy-MM-dd"),
    "frequency:",
    sub.frequency,
  );

  const selected = startOfDay(selectedDate);
  const startDate = startOfDay(subscriptionDate);

  const subscriptionDay = subscriptionDate.getDate();

  // MONTHLY
  if (sub.frequency === "Monthly") {
    const daysInSelectedMonth = getDaysInMonth(selected);

    const billingDay = Math.min(subscriptionDay, daysInSelectedMonth);

    return selected >= startDate && selected.getDate() === billingDay;
  }

  // YEARLY
  if (sub.frequency === "Yearly") {
    return (
      selected >= startDate &&
      selected.getMonth() === subscriptionDate.getMonth() &&
      selected.getDate() === subscriptionDay
    );
  }

  return false;
});
  //                                ALL THE FUNCTIONS
const handleChange = (e) => {
  setSubscription({
    ...subscription,
    [e.target.name]: e.target.value,
  });
};
const handleCompanySelect = (company) => {
  setSubscription((prev) => ({
    ...prev,
    name: company.name,
    domain: company.domain,
    logo: company.logo_url,
  }));
};

  const handleSave = () => {
  console.log("SUBSCRIPTION BEFORE SAVE:", subscription);

    if (
      !subscription.name ||
      !subscription.domain ||
      !subscription.amount ||
      !subscription.date
    ) {
      alert("Please select a subscription");
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
        <SubscriptionForm
          subscription={subscription}
          onChange={handleChange}
          onSave={handleSave}
          onCompanySelect={handleCompanySelect}
        />
      )}
      {selectedSubscriptions.map((sub) => (
        <SubscriptionCard
          key={sub.id}
          subscription={sub}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
}
