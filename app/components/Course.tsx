import { twMerge } from "tailwind-merge";
import { PERIODS, WEEKDAYS } from "../CONSTANTS";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  subject: string;
  teacher: string;
  classroom: string;
  period: number;
  weekdays: number;
}

const Course = ({
  subject,
  teacher,
  classroom,
  period,
  weekdays,
  className,
  ...rest
}: Props) => {
  return (
    <div
      className={twMerge(
        "card mx-1 w-[90vw] md:w-96 bg-base-100 shadow-xl",
        className,
      )}
      {...rest}
    >
      <div className="card-body">
        <div className="text-xl font-bold">Subject</div>
        <div>{subject} </div>

        <div className="text-xl font-bold">Teacher</div>
        <div>{teacher} </div>

        <div className="text-xl font-bold">Classroom</div>
        <div>{classroom} </div>

        <div className="text-xl font-bold">Period</div>
        <div>
          {PERIODS[period].startTime} - {PERIODS[period].endTime}
        </div>

        <div className="text-xl font-bold">Weekdays</div>
        <div>{WEEKDAYS[weekdays].japanese}</div>
      </div>
    </div>
  );
};

export default Course;
