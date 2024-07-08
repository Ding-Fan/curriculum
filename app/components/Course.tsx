"use client";

import { twMerge } from "tailwind-merge";
import { WEEKDAYS } from "../CONSTANTS";
import { useEffect, useState } from "react";
import React from "react";
import dayjs from "dayjs";
import { useAtom } from "jotai";
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
    ...rest
  } = props;

  const [periodsProcessed] = useAtom(periodsProcessedAtom);

  const { startFormatted, endFormatted, startTime, endTime } =
    periodsProcessed[period];

  const [mergedClassName, setMergedClassName] = useState("");

  useEffect(() => {
    setMergedClassName(twMerge("card shadow-xl overflow-hidden", className));

    return () => {};
  }, [className]);

  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    // console.log("current course check", isCurrentCourse);

    if (isCurrentCourse) {
      const currentTime = dayjs();
      const totalDuration = startTime.diff(endTime, "minute");
      const currentDuration = currentTime.diff(endTime, "minute");

      const percentage = Math.min((currentDuration / totalDuration) * 100, 100);

      // console.log("percentage", percentage);

      setCompletionPercentage(percentage);
    }
  }, [startTime, endTime, isCurrentCourse]);

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
        <div className="text-xl font-bold">Subject</div>
        <div>{subject} </div>

        <div className="text-xl font-bold">Teacher</div>
        <div>{teacher} </div>

        <div className="text-xl font-bold">Classroom</div>
        <div>{classroom} </div>

        <div className="text-xl font-bold">Period</div>
        <div>
          {startFormatted} - {endFormatted}
        </div>

        <div className="text-xl font-bold">Weekdays</div>
        <div>{WEEKDAYS[weekdays].japanese}</div>
      </div>
    </div>
  );
});

Course.displayName = "Course";

export default Course;
