import styles from "./page.module.css";
import { COURSES } from "./CONSTANTS";

import Course from "./components/Course";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="flex flex-col gap-2">
        {COURSES.map((item) => {
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
        })}
      </div>
    </main>
  );
}
