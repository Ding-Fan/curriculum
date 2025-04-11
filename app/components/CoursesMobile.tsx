"use client";

import React from "react";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { WEEKDAYS, COURSES } from "../CONSTANTS";
import Course from "./Course";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { periodsProcessedAtom } from "../atom";
import useScrollTo from "../hooks/useScrollTo";
import { findNextCourse, findCurrentCourse } from "../utils";
import { ICourse } from "../type";
import Weekday from "./Weekday";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const CoursesMobile = (props: Props) => {
  const [currentCourseRef, scrollToCurrent] = useScrollTo();
  const [nextCourseRef, scrollToNext] = useScrollTo();
  const [nextCourseId, setNextCourseId] = useState(-1);
  const [currentCourseId, setCurrentCourseId] = useState(-1);
  const periodsProcessed = useAtomValue(periodsProcessedAtom);

  const setRef = (id: number) => {
    if (id === currentCourseId) {
      return currentCourseRef;
    } else if (id === nextCourseId) {
      return nextCourseRef;
    }
  };

  useEffect(() => {
    // we need to disable scroll restoration
    // because it will conflict with our own scroll manipulation

    // Disable scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const nextCourse = findNextCourse(periodsProcessed);
    const currentCourse = findCurrentCourse(periodsProcessed);

    if (nextCourse) {
      setNextCourseId((nextCourse as ICourse).id);
    }

    if (currentCourse) {
      setCurrentCourseId(currentCourse.id);
    }

    if (currentCourseId > -1) {
      (scrollToCurrent as () => void)();
      // console.log("currentCourseId", currentCourseId);
    } else if (nextCourseId > -1) {
      (scrollToNext as () => void)();
      // console.log("nextCourseId", nextCourseId);
    }

    // Re-enable scroll restoration when the component unmounts
    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, [currentCourseId, scrollToCurrent, scrollToNext, nextCourseId]);

  return (
    <div {...props} className={twMerge("flex flex-col gap-4", props.className)}>
      {/* Status indicators */}
      <div className="flex justify-end gap-4 mb-2 px-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-accent/50 rounded-full"></div>
          <span className="text-xs text-base-content">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-accent/20 rounded-full"></div>
          <span className="text-xs text-base-content">Next</span>
        </div>
      </div>
      
      {WEEKDAYS.map((weekday, index) => {
        const coursesForDay = COURSES.filter((course) => course.weekdays === weekday.id);
        // Don't render the day if there are no courses
        if (coursesForDay.length === 0) {
          return null;
        }
        return (
          // Added border-b for separation, increased padding and gap
          <div key={weekday.id} className="p-4 border-b border-base-300 last:border-b-0"> 
            <Weekday japanese={weekday.japanese} id={weekday.id} />
            <div className="flex flex-col gap-3 mt-3"> {/* Increased gap and added margin-top */}
              {coursesForDay.map(
                (course) => {
                  return (
                    <Course
                      ref={setRef(course.id) as React.RefObject<HTMLDivElement>}
                      key={course.id}
                      subject={course.subject}
                      teacher={course.teacher}
                      period={course.period}
                      weekdays={course.weekdays}
                      classroom={course.classroom}
                      isCurrentCourse={course.id === currentCourseId}
                      isNextCourse={course.id === nextCourseId}
                      className={twMerge("w-full")}
                    />
                  );
                }
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CoursesMobile;
