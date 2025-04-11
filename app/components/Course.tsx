"use client";

import { twMerge } from "tailwind-merge";
import { WEEKDAYS } from "../CONSTANTS";
import { useEffect, useState } from "react";
import React from "react";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { periodsProcessedAtom } from "../atom";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  subject: string;
  teacher: string;
  classroom: string;
  period: number;
  weekdays: number;
  isNextCourse?: boolean;
  isCurrentCourse?: boolean;
}

const Course = React.forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  const {
    subject,
    teacher,
    classroom,
    period,
    weekdays,
    className,
    isCurrentCourse,
    isNextCourse,
    ...rest
  } = props;

  const periodsProcessed = useAtomValue(periodsProcessedAtom);

  const { startTime, endTime, startProcessed, endProcessed } =
    periodsProcessed[period];

  const [mergedClassName, setMergedClassName] = useState("");

  useEffect(() => {
    // Reintroducing border with left status line
    setMergedClassName(
      twMerge(
        "card border border-base-300 bg-paper rounded-lg overflow-hidden transition-all duration-300 relative", // Re-added border and changed background
        className
      )
    );
    // Status styling is still handled by the indicator line element below

    return () => {};
  }, [className]); // Dependencies simplified as status is handled separately

  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    if (isCurrentCourse) {
      const currentTime = dayjs();
      // Corrected: Calculate total duration from start to end
      const totalDuration = endProcessed.diff(startProcessed, "minute");
      // Corrected: Calculate duration from start to current time
      const currentDuration = currentTime.diff(startProcessed, "minute");

      // Ensure totalDuration is positive to avoid division by zero or negative numbers
      const percentage = totalDuration > 0 
        ? Math.max(0, Math.min((currentDuration / totalDuration) * 100, 100)) 
        : 0;
      setCompletionPercentage(percentage);
    }
  }, [startProcessed, endProcessed, isCurrentCourse]);

  // Progress bar remains for current course
  const progressBarColor = isCurrentCourse ? "bg-accent" : "bg-transparent"; // Only show for current

  // Determine status indicator color
  const statusIndicatorColor = isCurrentCourse
    ? "bg-accent"
    : isNextCourse
    ? "bg-accent/50"
    : "bg-transparent";

  return (
    <div ref={ref} className={mergedClassName} {...rest}>
      {/* Left Status Indicator Line */}
      <div
        className={`absolute top-0 left-0 bottom-0 w-1 ${statusIndicatorColor} rounded-l-lg`}
      ></div>

      {/* Progress bar as a thin line at the bottom (only for current) */}
      {isCurrentCourse && (
        <div
          className={`absolute bottom-0 left-0 h-1 bg-accent`} // Use accent color directly
          style={{ width: `${completionPercentage}%` }}
        ></div>
      )}
      {/* Adjusted padding for status line */}
      <div className="card-body p-4 z-10"> {/* Adjusted pl */}
        <div className="text-xs text-base-content/60">Subject</div> {/* Smaller label */}
        <div className="text-lg font-medium text-base-content">{subject}</div>

        <div className="text-xs text-base-content/60">Teacher</div> {/* Smaller label */}
        <div className="text-sm text-base-content/80">{teacher}</div>

        <div className="text-xs text-base-content/60">Classroom</div> {/* Smaller label */}
        <div className="text-3xl font-semibold text-cyan-700">{classroom}</div> {/* Changed color to secondary */}

        <div className="text-xs text-base-content/60">Period & Weekday</div> {/* Combined label */}
        <div className="text-sm text-base-content/80"> {/* Kept original emphasis */}
          {startTime} - {endTime} | {WEEKDAYS[weekdays].japanese}
        </div>
      </div>
    </div>
  );
});

Course.displayName = "Course";

export default Course;
