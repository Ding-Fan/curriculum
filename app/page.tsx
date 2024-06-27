"use client";

import styles from "./page.module.css";
import { COURSES, WEEKDAYS, PERIODS } from "./CONSTANTS";
import dayjs from "dayjs";
import Course from "./components/Course";
import { twMerge } from "tailwind-merge";
import { isCurrentCourse } from "./utils";

export default function Home() {
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
                        key={course.id}
                        subject={course.subject}
                        teacher={course.teacher}
                        period={course.period}
                        weekdays={course.weekdays}
                        classroom={course.classroom}
                        className={
                          isCurrentCourse(course).result ? "bg-amber-200" : ""
                        }
                        // className="bg-sky-500"
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
