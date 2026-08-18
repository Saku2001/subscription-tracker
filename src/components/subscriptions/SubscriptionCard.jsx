export default function SubscriptionCard({ subscription, onDelete, onEdit }) {
  const { name, logo, amount, currency, frequency, date, domain } =
    subscription;

  return (
    <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Top section */}
      <div className="flex items-center justify-between gap-4">
        {/* Company */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Logo */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-gray-50 p-2">
            <img
              src={logo}
              alt={`${name} logo`}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Name + domain */}
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-gray-900">
              {name}
            </h3>

            <p className="truncate text-sm text-gray-500">{domain}</p>
          </div>
        </div>

        {/* Price */}
        <div className="shrink-0 text-right">
          <p className="text-xl font-bold text-indigo-950">
            {currency === "GBP" && "£"}
            {currency === "EUR" && "€"}
            {currency === "USD" && "$"}
            {Number(amount).toFixed(2)}
          </p>

          <p className="text-xs text-gray-500">
            / {frequency === "Monthly" ? "month" : "year"}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-gray-100" />

      {/* Bottom information */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Billing date</p>

          <p className="text-sm font-medium text-gray-800">{date}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(subscription)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-indigo-950 hover:bg-indigo-50"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(subscription.id)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
