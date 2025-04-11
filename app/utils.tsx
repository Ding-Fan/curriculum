import dayjs from "dayjs";
import { ICourse, PeriodProcessed } from "./type";
import { COURSES } from "./CONSTANTS";

export const isCurrentCourse = (
  course: ICourse,
  periods: PeriodProcessed[]
) => {
  const currentTime = dayjs();

  const { startProcessed, endProcessed } = periods[course.period];

  // Use inclusive boundaries '[]' for isBetween
  let result =
    currentTime.isBetween(startProcessed, endProcessed, null, "[]") &&
    currentTime.day() === course.weekdays;

  // No need to return an object { result }, just return the boolean
  return result;
};

export const findCurrentCourse = (periods: PeriodProcessed[]): ICourse | null => {
  // Directly return the result of find
  return COURSES.find((course) => isCurrentCourse(course, periods)) || null;
};

export const findNextCourse = (periods: PeriodProcessed[]) => {
  const currentTime = dayjs();

  let minPositiveDiff = Infinity;
  let nextCourse: ICourse | null = null;
  const today = currentTime.day();

  COURSES.filter((c) => c.weekdays === today).forEach((course) => {
    const courseStartTime = periods[course.period].startProcessed;
    const diff = courseStartTime.diff(currentTime); // Difference in milliseconds

    // Check if the course starts after the current time (positive diff)
    // and if this difference is smaller than the current minimum positive difference
    if (diff > 0 && diff < minPositiveDiff) {
      minPositiveDiff = diff;
      nextCourse = course;
    }
  });

  return nextCourse;
};
