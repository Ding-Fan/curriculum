import dayjs from "dayjs";
import { Course, PeriodProcessed } from "./type";

export const isCurrentCourse = (course: Course, periods: PeriodProcessed[]) => {
  const currentTime = dayjs();

  const { startTime, endTime } = periods[course.period];

  let result =
    currentTime.isBetween(startTime, endTime) &&
    currentTime.day() === course.weekdays;

  return { result };
};

export const isNextCourse = (course: Course, periods: PeriodProcessed[]) => {
  const currentTime = dayjs();

  const { startTime } = periods[course.period];

  const result =
    currentTime.isBefore(startTime) && currentTime.day() === course.weekdays;
  return { result };
};
