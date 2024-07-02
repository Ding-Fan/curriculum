"use client";

import { twMerge } from "tailwind-merge";
import { PERIODS, WEEKDAYS } from "../CONSTANTS";
import { useEffect, useState } from "react";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  subject: string;
  teacher: string;
  classroom: string;
  period: number;
  weekdays: number;
}

const Course = React.forwardRef((props: Props, ref) => {
  const { subject, teacher, classroom, period, weekdays, className, ...rest } =
    props;
  const [mergedClassName, setMergedClassName] = useState("");

  useEffect(() => {
    setMergedClassName(
      twMerge("card mx-1 w-[90vw] md:w-96 shadow-xl", className)
    );

    return () => {};
  }, [className]);

  return (
    <div className={mergedClassName} {...rest}>
      <div className="card-body">
        <div className="text-xl font-bold">Subject</div>
        <div>{subject} </div>

        <div className="text-xl font-bold">Teacher</div>
        <div>{teacher} </div>

        <div className="text-xl font-bold">Classroom</div>
        <div>{classroom} </div>

        <div className="text-xl font-bold">Period</div>
        <div>
          {PERIODS[period].startTime} - {PERIODS[period].endTime}
        </div>

        <div className="text-xl font-bold">Weekdays</div>
        <div>{WEEKDAYS[weekdays].japanese}</div>
      </div>
    </div>
  );
});

export default Course;
