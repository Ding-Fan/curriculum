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
    setMergedClassName(
      twMerge(
        "card shadow-lg overflow-hidden transition-all duration-300",
        // Period-based color coding
        period === 0 ? "bg-primary/10 hover:bg-primary/20 border-l-4 border-primary" : "",
        period === 1 ? "bg-secondary/10 hover:bg-secondary/20 border-l-4 border-secondary" : "",
        period === 2 ? "bg-success/10 hover:bg-success/20 border-l-4 border-success" : "",
        // Status-based styling
        isCurrentCourse ? "bg-gradient-to-r from-accent/30 to-accent/10 border border-accent shadow-accent/30" : "",
        isNextCourse ? "bg-accent/10 border border-accent/50" : "",
        className
      )
    );

    return () => {};
  }, [className, period, isCurrentCourse, isNextCourse]);

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

  // Get period-specific colors for progress bar
  const getProgressBarColor = () => {
    if (isCurrentCourse) {
      return "bg-accent/50";
    }
    switch (period) {
      case 0: return "bg-primary/30";
      case 1: return "bg-secondary/30";
      case 2: return "bg-success/30";
      default: return "bg-accent/30";
    }
  };

  return (
    <div ref={ref} className={mergedClassName} {...rest}>
      <div
        className={`absolute bottom-0 w-full ${getProgressBarColor()}`}
        style={{ height: `${completionPercentage}%` }}
      ></div>
      {/* Restored font sizes, kept reduced padding, removed margins */}
      <div className="card-body z-10 p-3"> 
        <div className="text-sm text-base-content opacity-70">Subject</div>
        <div className="text-xl font-bold text-base-content">{subject}</div>

        <div className="text-sm text-base-content opacity-70">Teacher</div>
        <div className="text-lg font-semibold text-base-content">{teacher}</div>

        <div className="text-sm text-base-content opacity-70">Classroom</div>
        <div className="text-lg font-semibold text-base-content">{classroom}</div>

        <div className="text-sm text-base-content opacity-70">Period</div>
        <div className="text-lg font-semibold text-base-content">
          {startTime} - {endTime}
        </div>

        <div className="text-sm text-base-content opacity-70">Weekdays</div>
        <div className="text-lg font-semibold text-base-content">{WEEKDAYS[weekdays].japanese}</div>
      </div>
    </div>
  );
});

Course.displayName = "Course";

export default Course;
