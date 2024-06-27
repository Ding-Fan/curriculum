import dayjs from "dayjs";
import { PERIODS } from "./CONSTANTS";

export const isCurrentCourse = (course: Course) => {
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

  console.log("current ", currentTime.format("HH:mm"));
  console.log("start ", startTime.format("HH:mm"));
  console.log("end ", endTime.format("HH:mm"));
  console.log("current course", course.subject);
  console.log("current result", result);

  return { result };
};
