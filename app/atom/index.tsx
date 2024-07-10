import { atom } from "jotai";
import { PERIODS } from "../CONSTANTS";
import dayjs from "dayjs";
import { Period } from "../type";

export const periodsAtom = atom(PERIODS);

console.log("PERIODS", PERIODS);

const calculateInitialPeriods = (periods: Period[]) => {
  return periods.map((period) => {
    const { startTime, endTime } = period;

    if (startTime.isValid() && endTime.isValid()) {
      return {
        ...period,
        startFormatted: startTime.format("HH:mm"),
        endFormatted: endTime.format("HH:mm"),
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
