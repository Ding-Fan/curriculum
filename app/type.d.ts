import { Dayjs } from "dayjs";

interface Period {
  id: number;
  startTime: Dayjs;
  endTime: Dayjs;
}

interface PeriodProcessed {
  startFormatted: string;
  endFormatted: string;
  id: number;
  startTime: string;
  endTime: string;
}

interface Course {
  id: number;
  subject: string;
  teacher: string;
  classroom: string;
  period: number;
  weekdays: number;
}
