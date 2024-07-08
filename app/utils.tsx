import dayjs from "dayjs";
import { PERIODS, PERIODS_PROCESSED } from "./CONSTANTS";

export const isCurrentCourse = (course: Course) => {
  const currentTime = dayjs();

  const { startTime, endTime } = PERIODS_PROCESSED[course.period];

  let result =
    currentTime.isBetween(startTime, endTime) &&
    currentTime.day() === course.weekdays;

  return { result };
};

export const isNextCourse = (course: Course) => {
  const currentTime = dayjs();
  const [startHours, startMinutes] =
    PERIODS[course.period].startTime.split(":");
  const startTime = dayjs()
    .hour(Number(startHours))
    .minute(Number(startMinutes));
  const result =
    currentTime.isBefore(startTime) && currentTime.day() === course.weekdays;
  return { result };
};
