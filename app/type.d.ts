import { Dayjs } from "dayjs";

interface Period {
  id: number;
  startTime: string;
  endTime: string;
}

interface PeriodProcessed extends Period {
  startProcessed: Dayjs;
  endProcessed: Dayjs;
}

interface ICourse {
  id: number;
  subject: string;
  teacher: string;
  classroom: string;
  period: number;
  weekdays: number;
}
