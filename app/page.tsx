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
      scrollToCurrent();
    } else if (nextCourseId > -1) {
      scrollToNext();
    }
  }, [currentCourseId, scrollToCurrent, scrollToNext, nextCourseId]);

  return (
    <main className={"p-4"}>
      <div className="flex gap-2">
        {WEEKDAYS.map((weekday) => {
          return (
            <div key={weekday.id} className="p-2">
              <div className="">{weekday.japanese}</div>

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
