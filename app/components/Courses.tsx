"use client";

import React from "react";
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

const Courses = (props: Props) => {
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
    } else if (nextCourseId > -1) {
      (scrollToNext as () => void)();
    }

    // Re-enable scroll restoration when the component unmounts
    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, [currentCourseId, scrollToCurrent, scrollToNext, nextCourseId]);

  return (
    <div {...props} className={twMerge("transition-all duration-300", props.className)}>
      {/* Status indicators */}
      <div className="flex justify-end gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent/50 rounded-full"></div>
          <span className="text-sm text-base-content">Current Course</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent/20 rounded-full"></div>
          <span className="text-sm text-base-content">Next Course</span>
        </div>
      </div>
      
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-3 mb-3">
        {WEEKDAYS.map((weekday) => {
          return (
            <Weekday
              key={weekday.id}
              japanese={weekday.japanese}
              id={weekday.id}
            />
          );
        })}
      </div>
      
      {/* Course grid */}
      <div className="grid grid-cols-7 gap-3">
        {WEEKDAYS.map((weekday) => {
          return (
            <div key={weekday.id} className="transition-all duration-300">
              <div className="flex flex-col gap-3">
                {COURSES.filter((course) => course.weekdays === weekday.id).map(
                  (course) => {
                    return (
                      <Course
                        ref={
                          setRef(course.id) as React.RefObject<HTMLDivElement>
                        }
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
    </div>
  );
};

export default Courses;
