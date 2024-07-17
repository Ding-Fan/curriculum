import dayjs from "dayjs";
import { ICourse, PeriodProcessed } from "./type";
import { COURSES } from "./CONSTANTS";

export const isCurrentCourse = (
  course: ICourse,
  periods: PeriodProcessed[]
) => {
  const currentTime = dayjs();

  const { startTime, endTime } = periods[course.period];

  let result =
    currentTime.isBetween(dayjs(startTime, "H:mm"), dayjs(endTime, "H:mm")) &&
    currentTime.day() === course.weekdays;

  return { result };
};

export const findCurrentCourse = (periods: PeriodProcessed[]) => {
  let currentCourse = COURSES[0];

  currentCourse =
    COURSES.find((course) => isCurrentCourse(course, periods).result) ||
    currentCourse;

  return currentCourse;
};

export const findNextCourse = (periods: PeriodProcessed[]) => {
  const currentTime = dayjs();

  let diff = Infinity;
  const todayCourses = COURSES.filter((c) => c.weekdays === currentTime.day());
  let nextCourse = null;

  todayCourses.forEach((c) => {
    const currentDiff = dayjs(periods[c.period].startTime, "H:mm").diff(
      currentTime
    );
    if (currentDiff < diff) {
      diff = currentDiff;
      nextCourse = c;
    }
  });

  return nextCourse;
};
