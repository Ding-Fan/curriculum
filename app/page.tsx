"use client";

import Courses from "./components/Courses";
import CoursesMobile from "./components/CoursesMobile";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <main className={"p-4 w-screen md:w-full bg-base-100 min-h-screen transition-colors duration-300"}>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Course Schedule</h1>
        <Courses className="hidden md:block" />
        <CoursesMobile className="block md:hidden" />
        <ThemeToggle />
      </div>
    </main>
  );
}
