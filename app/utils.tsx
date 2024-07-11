import dayjs from "dayjs";
import { Course, PeriodProcessed } from "./type";

export const isCurrentCourse = (course: Course, periods: PeriodProcessed[]) => {
  const currentTime = dayjs();

  const { startTime, endTime } = periods[course.period];

  let result =
    currentTime.isBetween(dayjs(startTime, "H:mm"), dayjs(endTime,"H:mm")) &&
    currentTime.day() === course.weekdays;

  return { result };
};

export const isNextCourse = (course: Course, periods: PeriodProcessed[]) => {
  const currentTime = dayjs();

  const { startTime } = periods[course.period];

  const result =
    currentTime.isBefore(dayjs(startTime, "H:mm")) && currentTime.day() === course.weekdays;
  return { result };
};
