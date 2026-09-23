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

  const pressedDate = useRef(null);

  // CREATE THE DAYS

  const monthStart = startOfMonth(selectedMonth);
  const monthEnd = endOfMonth(selectedMonth);

  const days = [];

  let currentDay = monthStart;

  while (currentDay <= monthEnd) {
    days.push(currentDay);
    currentDay = addDays(currentDay, 1);
  }

  // FIND CENTER DATE AFTER DRAG

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

  // MONTH NAVIGATION

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

  // DATE STRINGS

  const todayString = format(today, "yyyy-MM-dd");
  const selectedDateString = format(selectedDate, "yyyy-MM-dd");
  const selectedMonthString = format(selectedMonth, "MMMM yyyy");

  // KEEP SELECTED DATE CENTRED

  useEffect(() => {
    selectedDateRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [selectedDate]);

  return (
    <div className="relative w-full overflow-hidden bg-white/[0.08] p-4 backdrop-blur-2xl sm:p-6">
      {/* SOFT LIQUID GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -top-24
          left-1/2
          h-48
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-indigo-400/20
          blur-3xl
        "
      />

      {/* SECONDARY BLUE GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          right-[-80px]
          h-64
          w-64
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      {/* TOP GLASS REFLECTION */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/40
          to-transparent
        "
      />

      {/* INNER GLASS LIGHT */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-white/[0.08]
          via-transparent
          to-indigo-400/[0.05]
        "
      />

      {/* CONTENT */}

      <div className="relative z-10">
        {/* MONTH HEADER */}

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePreviousMonth}
            aria-label="Previous month"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              text-lg
              text-white/50
              transition-all
              duration-300
              hover:bg-white/10
              hover:text-white
              active:scale-90
            "
          >
            ←
          </button>

          <span
            className="
              min-w-[150px]
              text-center
              text-sm
              font-semibold
              tracking-wide
              text-white
              sm:text-base
            "
          >
            {selectedMonthString}
          </span>

          <button
            onClick={handleNextMonth}
            aria-label="Next month"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              text-lg
              text-white/50
              transition-all
              duration-300
              hover:bg-white/10
              hover:text-white
              active:scale-90
            "
          >
            →
          </button>
        </div>

        {/* DATE TIMELINE */}

        <div
          ref={timelineRef}
          className="
            mt-7
            flex
            cursor-grab
            select-none
            gap-8
            overflow-x-auto
            whitespace-nowrap
            px-2
            py-3
            scrollbar-hide
            active:cursor-grabbing
          "
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

            if (Math.abs(walk) > 5) {
              hasDragged.current = true;
            }

            timelineRef.current.scrollLeft = scrollLeft.current - walk;
          }}
          onPointerUp={() => {
            isPointerDown.current = false;

            if (!hasDragged.current && pressedDate.current) {
              setSelectedDate(pressedDate.current);
            }

            if (hasDragged.current) {
              selectCenterDate();
            }

            pressedDate.current = null;
            hasDragged.current = false;
          }}
          onPointerLeave={() => {
            if (!isPointerDown.current) return;

            isPointerDown.current = false;

            if (hasDragged.current) {
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
                className="
                  flex
                  min-w-[40px]
                  flex-col
                  items-center
                "
              >
                {/* DATE NUMBER */}

                <div
                  className={`
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      isToday
                        ? "border border-white/30 bg-white/[0.08] shadow-[0_0_15px_rgba(129,140,248,0.25)]"
                        : ""
                    }
                    ${
                      isSelected
                        ? "scale-110"
                        : ""
                    }
                  `}
                >
                  <span
                    className={`
                      pointer-events-none
                      transition-all
                      duration-300
                      ${
                        isSelected
                          ? "text-lg font-semibold text-white"
                          : isToday
                            ? "text-sm font-medium text-white/90"
                            : "text-sm text-white/45"
                      }
                    `}
                  >
                    {format(day, "d")}
                  </span>
                </div>

                {/* TIMELINE LINE */}

                <div
                  className={`
                    pointer-events-none
                    mt-2
                    transition-all
                    duration-500
                    ${
                      isSelected
                        ? "h-10 w-[3px] rounded-full bg-white shadow-[0_0_14px_rgba(165,180,252,0.95)]"
                        : "h-6 w-px rounded-full bg-white/25"
                    }
                  `}
                />

                {/* SELECTED DATE GLOW */}

                {isSelected && (
                  <div
                    className="
                      pointer-events-none
                      absolute
                      mt-[50px]
                      h-8
                      w-8
                      rounded-full
                      bg-indigo-400/20
                      blur-xl
                    "
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* SUBTLE BOTTOM REFLECTION */}

        <div
          className="
            pointer-events-none
            mx-auto
            mt-2
            h-px
            w-3/4
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
          "
        />
      </div>
    </div>
  );
}