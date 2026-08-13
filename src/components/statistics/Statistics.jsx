export default function Statistics({ subscriptions, onClose }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Statistics</h1>

        <button onClick={onClose} className="text-indigo-950 font-medium">
          ← Timeline
        </button>
      </div>

      <p>Total subscriptions: {subscriptions.length}</p>
    </div>
  );
}
