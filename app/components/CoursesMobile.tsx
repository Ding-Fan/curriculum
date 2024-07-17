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
    <div
      {...props}
      className={twMerge("flex flex-col gap-2 w-screen", props.className)}
    >
      {WEEKDAYS.map((weekday) => {
        return (
          <div key={weekday.id} className="p-2">
            <div
              className={twMerge(
                "bg-gray-200 rounded-2xl items-center justify-center p-4 flex gap-2 ",
                dayjs().day() === weekday.id ? "bg-amber-200" : ""
              )}
            >
              <div className="text-2xl">{weekday.japanese}</div>
              <div className="">{dayjs().day(weekday.id).format("MM/DD")}</div>
            </div>

            <div className="flex flex-col gap-2">
              {COURSES.filter((course) => course.weekdays === weekday.id).map(
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
