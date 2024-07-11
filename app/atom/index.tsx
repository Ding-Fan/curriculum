import { atom } from "jotai";
import { PERIODS } from "../CONSTANTS";
import dayjs from "dayjs";
import { Period } from "../type";

export const periodsAtom = atom(PERIODS);

console.log("PERIODS", PERIODS);

const calculateInitialPeriods = (periods: Period[]) => {
  return periods.map((period) => {
    const { startTime, endTime } = period;

    return {
      ...period,
      startProcessed: dayjs(startTime, "H:mm"),
      endProcessed: dayjs(endTime, "H:mm"),
    };
  });
};

export const periodsProcessedAtom = atom((get) => {
  const periods = get(periodsAtom);
  return calculateInitialPeriods(periods);
});
