"use client";

import Courses from "./components/Courses";
import CoursesMobile from "./components/CoursesMobile";

export default function Home() {
  return (
    <main className={"p-4 w-screen md:w-full"}>
      <Courses className="hidden md:block" />
      <CoursesMobile className="block md:hidden" />
    </main>
  );
}
