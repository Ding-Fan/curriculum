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
    <div {...props}>
      <div className="grid grid-cols-[repeat(7,16rem)] gap-2">
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
      <div className="grid grid-cols-[repeat(7,16rem)] gap-2">
        {WEEKDAYS.map((weekday) => {
          return (
            <div key={weekday.id}>
              <div className="flex flex-col gap-2">
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
                        className={twMerge("w-60")}
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
