import { House, BarChart3, Plus, CreditCard, User } from "lucide-react";

export default function Navbar({
  activePage,
  setActivePage,
  onAddSubscription,
}) {
  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 h-20 bg-indigo-950 border-b border-indigo-900 shadow-sm">
        <div className="relative flex items-center w-full max-w-7xl mx-auto px-6 lg:px-10">
          {/* LOGO */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-950 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
            <CreditCard size={19} />
          </div>

          <span className="text-xl font-bold tracking-tight text-white">
            SubTrack
          </span>

          {/* CENTRE NAVIGATION */}
          <div className="mx-auto flex items-center gap-8">
            {/* HOME */}
            <button
              onClick={() => setActivePage("home")}
              className={`group relative flex items-center gap-2 py-2 text-sm font-medium transition-all duration-300 ${
                activePage === "home"
                  ? "text-white"
                  : "text-indigo-200 hover:text-white"
              }`}
            >
              <House size={18} />

              <span>Home</span>

              <span
                className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-white transition-all duration-300 ${
                  activePage === "home" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>

            {/* STATISTICS */}
            <button
              onClick={() => setActivePage("statistics")}
              className={`group relative flex items-center gap-2 py-2 text-sm font-medium transition-all duration-300 ${
                activePage === "statistics"
                  ? "text-white"
                  : "text-indigo-200 hover:text-white"
              }`}
            >
              <BarChart3 size={18} />

              <span>Statistics</span>

              <span
                className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-white transition-all duration-300 ${
                  activePage === "statistics"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </button>

            {/* ALL SUBSCRIPTIONS */}
            <button
              onClick={() => setActivePage("subscriptions")}
              className={`group relative flex items-center gap-2 py-2 text-sm font-medium transition-all duration-300 ${
                activePage === "subscriptions"
                  ? "text-white"
                  : "text-indigo-200 hover:text-white"
              }`}
            >
              <CreditCard size={18} />

              <span>All Subscriptions</span>

              <span
                className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-white transition-all duration-300 ${
                  activePage === "subscriptions"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="absolute right-6 lg:right-10 flex items-center gap-4">
            {/* ACCOUNT */}
            <button
              onClick={() => setActivePage("account")}
              title="Account"
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                activePage === "account"
                  ? "bg-white/15 text-white"
                  : "text-indigo-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              <User size={23} />
            </button>

            {/* ADD SUBSCRIPTION */}
            <button
              onClick={onAddSubscription}
              className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-indigo-950 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-lg"
            >
              <Plus
                size={18}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
              <span>Add Subscription</span>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE NAVBAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-[76px] bg-white/95 backdrop-blur-xl border-t border-gray-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="relative h-full flex items-center justify-around px-3">
          {/* HOME */}
          <button
            onClick={() => setActivePage("home")}
            className={`flex w-16 flex-col items-center gap-1 transition-all duration-300 ${
              activePage === "home" ? "text-indigo-950" : "text-gray-400"
            }`}
          >
            <House size={21} strokeWidth={activePage === "home" ? 2.5 : 2} />

            <span className="text-[10px] font-medium">Home</span>
          </button>

          {/* STATISTICS */}
          <button
            onClick={() => setActivePage("statistics")}
            className={`flex w-16 flex-col items-center gap-1 transition-all duration-300 ${
              activePage === "statistics" ? "text-indigo-950" : "text-gray-400"
            }`}
          >
            <BarChart3
              size={21}
              strokeWidth={activePage === "statistics" ? 2.5 : 2}
            />

            <span className="text-[10px] font-medium">Stats</span>
          </button>

          {/* ADD SUBSCRIPTION */}
          <button
            onClick={onAddSubscription}
            className="absolute left-1/2 -top-7 flex h-[62px] w-[62px] -translate-x-1/2 items-center justify-center rounded-full border-[5px] border-white bg-indigo-950 text-white shadow-lg shadow-indigo-950/25 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Plus size={29} strokeWidth={2.5} />
          </button>

          {/* ALL SUBSCRIPTIONS */}
          <button
            onClick={() => setActivePage("subscriptions")}
            className={`flex w-16 flex-col items-center gap-1 transition-all duration-300 ${
              activePage === "subscriptions"
                ? "text-indigo-950"
                : "text-gray-400"
            }`}
          >
            <CreditCard
              size={21}
              strokeWidth={activePage === "subscriptions" ? 2.5 : 2}
            />

            <span className="text-[10px] font-medium">All</span>
          </button>

          {/* ACCOUNT */}
          <button
            onClick={() => setActivePage("account")}
            className={`flex w-16 flex-col items-center gap-1 transition-all duration-300 ${
              activePage === "account" ? "text-indigo-950" : "text-gray-400"
            }`}
          >
            <User size={21} strokeWidth={activePage === "account" ? 2.5 : 2} />

            <span className="text-[10px] font-medium">Account</span>
          </button>
        </div>
      </nav>
    </>
  );
}
