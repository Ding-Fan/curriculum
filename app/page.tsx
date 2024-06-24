"use client";

import styles from "./page.module.css";
import { COURSES, WEEKDAYS, PERIODS } from "./CONSTANTS";
import dayjs from "dayjs";
import Course from "./components/Course";
import { twMerge } from "tailwind-merge";

export default function Home() {
  function isCurrentCourse(course: Course) {
    const currentTime = dayjs();

    const [startHours, startMinutes] =
      PERIODS[course.period].startTime.split(":");
    const startTime = dayjs()
      .hour(Number(startHours))
      .minute(Number(startMinutes));

    const [endHours, endMinutes] = PERIODS[course.period].endTime.split(":");
    const endTime = dayjs().hour(Number(endHours)).minute(Number(endMinutes));

    let result =
      currentTime.isBetween(startTime, endTime) &&
      currentTime.day() === course.weekdays;

    console.log("all ", currentTime.format("HH:mm"));
    console.log("start ", startTime.format("HH:mm"));
    console.log("end ", endTime.format("HH:mm"));
    console.log("current course", course.subject);
    console.log("current result", result);

    return { result };
  }

  return (
    <main className={"p-4"}>
      <div className="flex gap-2">
        {WEEKDAYS.map((item) => {
          return (
            <div key={item.id} className="p-2">
              <div className="">{item.japanese}</div>

              <div className="flex flex-col gap-2">
                {COURSES.filter((course) => course.weekdays === item.id).map(
                  (item) => {
                    return (
                      <Course
                        key={item.id}
                        subject={item.subject}
                        teacher={item.teacher}
                        period={item.period}
                        weekdays={item.weekdays}
                        classroom={item.classroom}
                        className={
                          isCurrentCourse(item).result ? "bg-sky-500" : ""
                        }
                      />
                    );
                  },
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
