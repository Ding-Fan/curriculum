interface Period {
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
