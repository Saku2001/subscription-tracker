import { useState } from "react";

export default function SubscriptionForm({ subscription, onChange, onSave }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchCompanies = async (query) => {
    if (query.trim().length < 2) {
      setCompanies([]);
      return;
    }

    try {
      setIsSearching(true);

      const response = await fetch(
        `http://localhost:5000/api/companies?q=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        throw new Error("Failed to search companies");
      }

      const data = await response.json();

      setCompanies(data);
    } catch (error) {
      console.error("Company search error:", error);
      setCompanies([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCompanySearch = (e) => {
    const value = e.target.value;

    setSearchTerm(value);

    searchCompanies(value);
  };

  const handleCompanySelect = (company) => {
    setSearchTerm(company.name);
    setCompanies([]);

    onChange({
      target: {
        name: "name",
        value: company.name,
      },
    });

    onChange({
      target: {
        name: "domain",
        value: company.domain,
      },
    });

    onChange({
      target: {
        name: "logo",
        value: company.logo_url,
      },
    });
  };

  return (
    <div className="mt-6 p-4 border rounded-lg">
      <h2>Add Subscription Form</h2>

      <div className="relative mt-3">
        <input
          type="text"
          placeholder="Search subscription..."
          value={searchTerm}
          onChange={handleCompanySearch}
          className="border p-2 w-full rounded-lg"
        />

        {isSearching && (
          <p className="text-sm text-gray-500 mt-2">Searching...</p>
        )}

        {companies.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg overflow-hidden">
            {companies.map((company) => (
              <button
                key={company.domain}
                type="button"
                onClick={() => handleCompanySelect(company)}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 text-left"
              >
                <img
                  src={company.logo_url}
                  alt=""
                  className="w-8 h-8 object-contain"
                />

                <div>
                  <p className="font-medium">{company.name}</p>

                  <p className="text-sm text-gray-500">{company.domain}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <input
        type="number"
        name="amount"
        placeholder="12.99"
        value={subscription.amount}
        onChange={onChange}
        className="border p-2 mt-3 block"
      />

      <select
        name="currency"
        value={subscription.currency}
        onChange={onChange}
        className="border p-2 mt-3 block"
      >
        <option value="GBP">GBP (£)</option>
        <option value="EUR">EUR (€)</option>
        <option value="USD">USD ($)</option>
      </select>

      <select
        name="frequency"
        value={subscription.frequency}
        onChange={onChange}
        className="border p-2 mt-3 block"
      >
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>

      <input
        type="date"
        name="date"
        value={subscription.date}
        onChange={onChange}
        className="border p-2 mt-3 block"
      />

      <button
        onClick={onSave}
        className="bg-blue-900 px-4 my-1.5 py-2 rounded-2xl text-white"
      >
        SAVE
      </button>
    </div>
  );
}
