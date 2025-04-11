"use client";

import dayjs from "dayjs";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  japanese: string;
  id: number;
};

const Weekday = ({ japanese, id }: Props) => {
  const isCurrentDay = dayjs().day() === id;
  
  // Simplified weekday styling for consistency
  const getWeekdayStyle = () => {
    const isWeekend = id === 0 || id === 6;

    if (isCurrentDay) {
      return isWeekend
        ? "bg-error/5 border border-error" // Current weekend day
        : "bg-accent/5 border border-accent"; // Current weekday
    } else {
      return isWeekend
        ? "bg-error/5 border border-error/30" // Non-current weekend day
        : "bg-base-100 border border-base-300"; // Regular weekday (matches Course card)
    }
  };

  // Determine text color based on current day and weekend status
  const textColor = isCurrentDay 
    ? (id === 0 || id === 6 ? "text-error" : "text-accent") 
    : "text-base-content";

  return (
    <div
      className={twMerge(
        "rounded-xl items-center justify-center p-4 flex gap-2 transition-all duration-300",
        getWeekdayStyle()
      )}
    >
      <div className={`text-2xl font-bold ${textColor}`}> {/* Simplified text color logic */}
        {japanese}
      </div>
      <div className={`${isCurrentDay ? "font-semibold" : ""} ${textColor}`}> {/* Simplified text color logic */}
        {dayjs().day(id).format("MM/DD")}
      </div>
    </div>
  );
};

export default Weekday;
