import styles from "./page.module.css";
import { COURSES, WEEKDAYS } from "./CONSTANTS";

import Course from "./components/Course";

export default function Home() {
  return (
    <main className={"p-4"}>
      <div className="flex gap-2">
        {WEEKDAYS.map((item) => {
          return (
            <div key={item.id} className="min-w-[100vw] p-2">
              <div className="">{item.japanese}</div>

              <div className="flex flex-col gap-2">
                {COURSES.filter((course) => course.weekdays === item.id).map(
                  (item) => {
                    return (
                      <Course
                        key={item.id}
                        subject={item.subject}
                        teacher={item.teacher}
                        period={item.period}
                        weekdays={item.weekdays}
                        classroom={item.classroom}
                      />
                    );
                  },
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
