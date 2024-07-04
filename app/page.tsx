"use client";

import styles from "./page.module.css";
import { COURSES, WEEKDAYS, PERIODS } from "./CONSTANTS";
import dayjs from "dayjs";
import Course from "./components/Course";
import { twMerge } from "tailwind-merge";
import { isCurrentCourse, isNextCourse } from "./utils";
import useScrollTo from "./hooks/useScrollTo";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentCourseRef, scrollToCurrent] = useScrollTo();
  const [nextCourseRef, scrollToNext] = useScrollTo();
  const [nextCourseId, setNextCourseId] = useState(-1);
  const [currentCourseId, setCurrentCourseId] = useState(-1);

  const setRef = (id: number) => {
    if (id === currentCourseId) {
      return currentCourseRef;
    } else if (id === nextCourseId) {
      return nextCourseRef;
    }
  };

  useEffect(() => {
    COURSES.forEach((course, index) => {
      if (isNextCourse(course).result) {
        setNextCourseId(index);
      }
      if (isCurrentCourse(course).result) {
        setCurrentCourseId(index);
      }
    });
    if (currentCourseId > -1) {
      (scrollToCurrent as () => void)();
    } else if (nextCourseId > -1) {
      (scrollToNext as () => void)();
    }
  }, [currentCourseId, scrollToCurrent, scrollToNext, nextCourseId]);

  return (
    <main className={"p-4 "}>
      <div className="grid grid-cols-[repeat(7,16rem)] gap-2">
        {WEEKDAYS.map((weekday) => {
          return (
            <div key={weekday.id} className="w-fit p-2">
              <div
                className={twMerge(
                  "bg-gray-200 rounded-2xl items-center justify-center p-4 flex gap-2 w-60",
                  dayjs().day() === weekday.id ? "bg-amber-200" : ""
                )}
              >
                <div className="text-2xl">{weekday.japanese}</div>
                <div className="">
                  {dayjs().day(weekday.id).format("MM/DD")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-[repeat(7,16rem)] gap-2">
        {WEEKDAYS.map((weekday) => {
          return (
            <div key={weekday.id} className="p-2">
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
                        className={twMerge(
                          "w-60",
                          isNextCourse(course).result ? "bg-amber-50" : "",
                          isCurrentCourse(course).result ? "bg-amber-200" : ""
                        )}
                      />
                    );
                  }
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
