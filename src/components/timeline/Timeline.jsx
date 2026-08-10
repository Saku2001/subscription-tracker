import { useEffect, useRef, useState } from "react";
import {
  format,
  addDays,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
} from "date-fns";

export default function Timeline({ selectedDate, setSelectedDate }) {
  const today = new Date();

  // STATES

  const [selectedMonth, setSelectedMonth] = useState(today);

  // REFS
  const timelineRef = useRef(null);
  const selectedDateRef = useRef(null);

  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const isPointerDown = useRef(false);
  const hasDragged = useRef(false);

  // This remembers which date we pressed
  const pressedDate = useRef(null);

  // Create the days
  const monthStart = startOfMonth(selectedMonth);
  const monthEnd = endOfMonth(selectedMonth);

  const days = [];

  let currentDay = monthStart;

  while (currentDay <= monthEnd) {
    days.push(currentDay);
    currentDay = addDays(currentDay, 1);
  }

  const selectCenterDate = () => {
    const timeline = timelineRef.current;

    if (!timeline) return;

    const timelineCenter =
      timeline.getBoundingClientRect().left + timeline.offsetWidth / 2;

    let closestDate = null;
    let closestDistance = Infinity;

    days.forEach((day) => {
      const dayElement = timeline.querySelector(
        `[data-date="${format(day, "yyyy-MM-dd")}"]`,
      );

      if (!dayElement) return;

      const dayRect = dayElement.getBoundingClientRect();

      const dayCenter = dayRect.left + dayRect.width / 2;

      const distance = Math.abs(timelineCenter - dayCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestDate = day;
      }
    });

    if (closestDate) {
      setSelectedDate(closestDate);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = addMonths(selectedMonth, 1);

    setSelectedMonth(nextMonth);
    setSelectedDate(startOfMonth(nextMonth));
  };

  const handlePreviousMonth = () => {
    const previousMonth = subMonths(selectedMonth, 1);

    setSelectedMonth(previousMonth);
    setSelectedDate(startOfMonth(previousMonth));
  };

  const todayString = format(today, "yyyy-MM-dd");
  const selectedDateString = format(selectedDate, "yyyy-MM-dd");
  const selectedMonthString = format(selectedMonth, "MMMM yyyy");

  useEffect(() => {
    selectedDateRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [selectedDate]);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-center gap-6 mt-5">
        <button onClick={handlePreviousMonth} className="text-xl">
          ←
        </button>

        <span className="font-bold">{selectedMonthString}</span>

        <button onClick={handleNextMonth} className="text-xl">
          →
        </button>
      </div>

      <div
        ref={timelineRef}
        className="flex gap-10 overflow-x-auto whitespace-nowrap scrollbar-hide cursor-grab select-none"
        onPointerDown={(e) => {
          isPointerDown.current = true;
          hasDragged.current = false;

          startX.current = e.pageX;

          scrollLeft.current = timelineRef.current.scrollLeft;

          const dateElement = e.target.closest("[data-date]");

          if (dateElement) {
            const dateString = dateElement.dataset.date;

            pressedDate.current = days.find(
              (day) => format(day, "yyyy-MM-dd") === dateString,
            );
          }
        }}
        onPointerMove={(e) => {
          if (!isPointerDown.current) return;

          const walk = e.pageX - startX.current;

          // If moved more than 5px, this is a drag
          if (Math.abs(walk) > 5) {
            hasDragged.current = true;
          }

          // Move timeline
          timelineRef.current.scrollLeft = scrollLeft.current - walk;
        }}
        onPointerUp={() => {
          isPointerDown.current = false;

          if (!hasDragged.current && pressedDate.current) {
            // Normal click
            setSelectedDate(pressedDate.current);
          }

          if (hasDragged.current) {
            // User dragged
            selectCenterDate();
          }

          pressedDate.current = null;
          hasDragged.current = false;
        }}
      >
        {days.map((day) => {
          const dayString = format(day, "yyyy-MM-dd");

          const isToday = dayString === todayString;
          const isSelected = dayString === selectedDateString;

          return (
            <div
              key={day.toISOString()}
              ref={isSelected ? selectedDateRef : null}
              data-date={dayString}
              className="flex flex-col items-center min-w-[40px]"
            >
              {/* Number */}
              <div
                className={
                  isToday
                    ? "border border-indigo-950 rounded-full w-8 h-8 flex items-center justify-center"
                    : ""
                }
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
