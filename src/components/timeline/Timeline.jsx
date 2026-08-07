import { useRef, useState } from "react";
import { format, addDays } from "date-fns";

export default function Timeline() {
  const today = new Date();

  //                    STATES

  const [isDragging, setIsDragging] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);

  //                    REFs

  const timelineRef = useRef(null);

  const days = [];

  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasDragged = useRef(false);

  for (let i = -10; i <= 10; i++) {
    days.push(addDays(today, i));
  }

  const todayString = format(today, "yyyy-MM-dd");
  const selectedDateString = format(selectedDate, "yyyy-MM-dd");

  return (
    <div className="mt-10">
      <h1>Timeline</h1>
      <div
        ref={timelineRef}
        className="flex gap-10 overflow-x-auto whitespace-nowrap scrollbar-hide cursor-grab"
        onPointerDown={(e) => {
          setIsDragging(true);
          hasDragged.current = false;

          startX.current = e.pageX;
          scrollLeft.current = timelineRef.current.scrollLeft;
        }}
        onPointerMove={(e) => {
          if (!isDragging) return;

          const walk = e.pageX - startX.current;

          if (Math.abs(walk) > 5) {
            hasDragged.current = true;
          }

          timelineRef.current.scrollLeft = scrollLeft.current - walk;
        }}
        onPointerUp={() => {
          setIsDragging(false);
        }}
        onPointerLeave={() => {
          setIsDragging(false);
        }}
      >
        {" "}
        {days.map((day) => {
          const dayString = format(day, "yyyy-MM-dd");

          const isToday = dayString === todayString;

          const isSelected = dayString === selectedDateString;

          return (
            <div
              key={day.toISOString()}
              className="flex flex-col items-center min-w-[40px] cursor-pointer select-none"
              onClick={() => {
                if (!hasDragged.current) {
                  console.log("clicked:", day);
                  setSelectedDate(day);
                }
              }}
            >
              {/* Number */}
              <div
                className={`${
                  isToday
                    ? "border border-indigo-950 rounded-full w-8 h-8 flex items-center justify-center"
                    : ""
                }`}
              >
                <span
                  className={`pointer-events-none ${
                    isSelected
                      ? "text-indigo-950 font-bold text-lg"
                      : "text-gray-700 text-sm"
                  }`}
                >
                  {format(day, "d")}
                </span>
              </div>

              {/* Line */}
              <div
                className={`pointer-events-none mt-2 ${
                  isSelected
                    ? "w-1 h-10 bg-indigo-950"
                    : "w-[2px] h-6 bg-gray-400"
                }`}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
