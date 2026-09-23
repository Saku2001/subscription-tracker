import { useState } from "react";
import { format, getDaysInMonth, parseISO, startOfDay } from "date-fns";

import SubscriptionCard from "../components/subscriptions/SubscriptionCard";
import SubscriptionForm from "../components/subscriptions/SubscriptionForm";
import Timeline from "../components/timeline/Timeline";
import Statistics from "../components/statistics/Statistics";
import Navbar from "../components/navigation/Navbar";

export default function Dashboard() {
  // ALL THE STATES

  const [showForm, setShowForm] = useState(false);
  const [activePage, setActivePage] = useState("home");

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

  console.log(subscriptions);

  // FILTERED SUBSCRIPTIONS ON SELECTED DATE

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

  // ALL THE FUNCTIONS

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
      domain: "",
      logo: "",
      amount: "",
      currency: "GBP",
      frequency: "Monthly",
      date: "",
    });

    setShowForm(false);
  };

  const handleDelete = (id) => {
    const updatedSubscriptions = subscriptions.filter(
      (sub) => sub.id !== id,
    );

    setSubscriptions(updatedSubscriptions);
  };

  const handleEdit = (sub) => {
    console.log("EDIT CLICKED:", sub);

    setSubscription(sub);
    setEditingId(sub.id);
    setShowForm(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto  py-3 px-4 sm:px-6 md:px-8 mt-4 md:mt-20 mb-20">
      {/* NAVBAR */}

      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onAddSubscription={() => setShowForm(true)}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-4 md:pt-24 pb-24">
        {/* HOME */}

        {activePage === "home" && (
          <>
            {/* TIMELINE */}

            <Timeline
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

            {/* STATISTICS SUMMARY */}

            <div className="mt-6 border-t border-gray-200/60 pt-5">
              {/* statistics summary */}
            </div>

            {/* SUBSCRIPTION CARDS */}

            {selectedSubscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.id}
                subscription={sub}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </>
        )}

        {/* STATISTICS */}

        {activePage === "statistics" && (
          <Statistics
            subscriptions={subscriptions}
            onClose={() => setActivePage("home")}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}

        {/* ALL SUBSCRIPTIONS */}

        {activePage === "subscriptions" && (
          <div>
            <h1 className="text-2xl font-bold text-indigo-950">
              All Subscriptions
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage all your subscriptions in one place.
            </p>

            <div className="mt-6">
              {subscriptions.length > 0 ? (
                subscriptions.map((sub) => (
                  <SubscriptionCard
                    key={sub.id}
                    subscription={sub}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))
              ) : (
                <p className="text-gray-500">
                  You don't have any subscriptions yet.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ADD / EDIT SUBSCRIPTION FORM */}

        {showForm && (
          <SubscriptionForm
            subscription={subscription}
            onChange={handleChange}
            onSave={handleSave}
            onCompanySelect={handleCompanySelect}
          />
        )}
      </div>
    </div>
  );
}