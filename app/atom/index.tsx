import { atom } from "jotai";
import { PERIODS, Period } from "../CONSTANTS";
import dayjs from "dayjs";

export const periodsAtom = atom(PERIODS);

const calculateInitialPeriods = (periods: Period[]) => {
  return periods.map((period) => {
    const start = dayjs(period.startTime);
    const end = dayjs(period.endTime);

    if (start.isValid() && end.isValid()) {
      return {
        ...period,
        startFormatted: start.format("HH:mm"),
        endFormatted: end.format("HH:mm"),
      };
    } else {
      console.error("Invalid date in period:", period);
      return {
        ...period,
        startFormatted: "Invalid Date",
        endFormatted: "Invalid Date",
      };
    }
  });
};

export const periodsProcessedAtom = atom((get) => {
  const periods = get(periodsAtom);
  return calculateInitialPeriods(periods);
});
