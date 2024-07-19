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
        "card shadow-xl overflow-hidden",
        isNextCourse ? "bg-amber-50 dark:bg-amber-900" : "",
        className
      )
    );

    return () => {};
  }, [className]);

  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    // console.log("current course check", isCurrentCourse);

    if (isCurrentCourse) {
      const currentTime = dayjs();
      const totalDuration = startProcessed.diff(endProcessed, "minute");
      const currentDuration = currentTime.diff(endProcessed, "minute");

      const percentage = Math.min((currentDuration / totalDuration) * 100, 100);

      // console.log("percentage", percentage);

      setCompletionPercentage(percentage);
    }
  }, [startProcessed, endProcessed, isCurrentCourse]);

  // https://www.bugpilot.com/guides/en/how-to-fix-text-content-mismatch-errors-nextjs-0a2e#2-use-of-non-deterministic-javascript
  // we have to useState and useEffect
  // when we want to keep it in the client

  return (
    <div ref={ref} className={mergedClassName} {...rest}>
      <div
        className="absolute bottom-0 w-full bg-amber-200 dark:bg-amber-900"
        style={{ height: `${completionPercentage}%` }}
      ></div>
      <div className="card-body z-10">
        <div className="text-sm">Subject</div>
        <div className="text-xl font-bold">{subject} </div>

        <div className="text-sm">Teacher</div>
        <div className="text-xl font-bold">{teacher} </div>

        <div className="text-sm">Classroom</div>
        <div className="text-xl font-bold">{classroom} </div>

        <div className="text-sm">Period</div>
        <div className="text-xl font-bold">
          {startTime} - {endTime}
        </div>

        <div className="text-sm">Weekdays</div>
        <div className="text-xl font-bold">{WEEKDAYS[weekdays].japanese}</div>
      </div>
    </div>
  );
});

Course.displayName = "Course";

export default Course;
