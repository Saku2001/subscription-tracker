import { format, addDays } from "date-fns";

export default function Timeline() {
  const today = new Date();

  const days = [];

  for (let i = -10; i <= 10; i++) {
    days.push(addDays(today, i));
  }

  const todayString = format(today, "yyyy-MM-dd");
  console.log(days);

  return (
    <div className="mt-10">
      <h1>Timeline</h1>
      <div className="flex gap-10 overflow-x-auto whitespace-nowrap">
        {" "}
        {days.map((day) => {
          const dayString = format(day, "yyyy-MM-dd");
          const isToday = dayString === todayString;
          return (
            <div
              key={day.toISOString()}
              className="flex flex-col items-center min-w-[40px]"
            >
              <span
                className={`${
                  isToday
                    ? "text-blue-600 font-bold text-lg"
                    : "text-gray-700 text-sm"
                }`}
              >
                {format(day, "d")}
              </span>

              <div
                className={`mt-2 ${
                  isToday ? "w-1 h-10 bg-blue-600" : "w-[2px] h-6 bg-gray-400"
                }`}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
