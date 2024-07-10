import { Dayjs } from "dayjs";

interface Period {
  id: number;
  startTime: Dayjs;
  endTime: Dayjs;
}

interface PeriodProcessed extends Period {
  startFormatted: string;
  endFormatted: string;
}

interface Course {
  id: number;
  subject: string;
  teacher: string;
  classroom: string;
  period: number;
  weekdays: number;
}
