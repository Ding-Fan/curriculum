"use client";

import dayjs from "dayjs";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  japanese: string;
  id: number;
};

const Weekday = ({ japanese, id }: Props) => {
  return (
    <div
      className={twMerge(
        "bg-gray-200 rounded-2xl items-center justify-center p-4 flex gap-2  md:w-60",
        dayjs().day() === id ? "bg-amber-200" : ""
      )}
    >
      <div className="text-2xl">{japanese}</div>
      <div className="">{dayjs().day(id).format("MM/DD")}</div>
    </div>
  );
};

export default Weekday;
