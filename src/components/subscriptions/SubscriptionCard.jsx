export default function SubscriptionCard({ subscription, onEdit, onDelete }) {
  return (
    <div className="mt-5 border rounded-lg p-4">
      <h3>{subscription.name}</h3>

      <p>
        Amount: {subscription.currency} {subscription.amount}
      </p>

      <p>Frequency: {subscription.frequency}</p>

      <p>Currency: {subscription.currency}</p>

      <p>Date: {subscription.date}</p>

      <button
        onClick={() => onDelete(subscription.id)}
        className="text-red-700"
      >
        Remove
      </button>

      <button
        onClick={() => onEdit(subscription)}
        className="text-blue-700 mr-4"
      >
        Edit
      </button>
    </div>
  );
}
