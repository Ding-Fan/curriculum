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
  
  // Get weekday-specific styling
  const getWeekdayStyle = () => {
    // Weekend styling
    if (id === 0 || id === 6) {
      return isCurrentDay 
        ? "bg-gradient-to-r from-error/30 to-error/10 border border-error" 
        : "bg-error/10 border border-error/30";
    }
    
    // Weekday styling with gradient for current day
    return isCurrentDay 
      ? "bg-gradient-to-r from-accent/40 to-accent/10 border border-accent shadow-md" 
      : "bg-base-200 border border-base-300";
  };

  return (
    <div
      className={twMerge(
        "rounded-xl items-center justify-center p-4 flex gap-2 transition-all duration-300", // Removed md:w-60
        getWeekdayStyle()
      )}
    >
      <div className={`text-2xl font-bold ${isCurrentDay ? "text-accent-focus" : "text-base-content"}`}>
        {japanese}
      </div>
      <div className={`${isCurrentDay ? "font-semibold text-accent-focus" : "text-base-content"}`}>
        {dayjs().day(id).format("MM/DD")}
      </div>
    </div>
  );
};

export default Weekday;
