"use client";

import dayjs from "dayjs";
import { Period } from "./type";

export const PERIODS: Period[] = [
  {
    id: 0,
    startTime: "9:20",
    endTime: "10:50",
  },
  {
    id: 1,
    startTime: "11:05",
    endTime: "12:35",
  },
  {
    id: 2,
    startTime: "13:25",
    endTime: "14:55",
  },
];

// console.log("PERIODS from CONSTANTS", PERIODS);

export const WEEKDAYS = [
  { id: 0, japanese: "日", english: "Sunday" },
  { id: 1, japanese: "月", english: "Monday" },
  { id: 2, japanese: "火", english: "Tuesday" },
  { id: 3, japanese: "水", english: "Wednesday" },
  { id: 4, japanese: "木", english: "Thursday" },
  { id: 5, japanese: "金", english: "Friday" },
  { id: 6, japanese: "土", english: "Saturday" },
];

export const COURSES = [
  {
    id: 0,
    subject: "ビジネスコミュニケーション",
    teacher: "田渕",
    classroom: "61",
    period: 0,
    weekdays: 1,
  },
  {
    id: 1,
    subject: "プログラミング応用",
    teacher: "根岸",
    classroom: "61",
    period: 0,
    weekdays: 2,
  },
  {
    id: 2,
    subject: "データベース",
    teacher: "山崎",
    classroom: "61",
    period: 0,
    weekdays: 3,
  },
  {
    id: 3,
    subject: "ソフトウェア開発",
    teacher: "根岸",
    classroom: "34",
    period: 0,
    weekdays: 4,
  },
  {
    id: 4,
    subject: "ビジネスソフト応用IA(Excel)",
    teacher: "滝口",
    classroom: "61",
    period: 0,
    weekdays: 5,
  },
  {
    id: 5,
    subject: "情報資格",
    teacher: "佐藤",
    classroom: "61",
    period: 1,
    weekdays: 1,
  },
  {
    id: 6,
    subject: "データベース",
    teacher: "山崎",
    classroom: "61",
    period: 1,
    weekdays: 2,
  },
  {
    id: 7,
    subject: "ビジネス日本語演習",
    teacher: "澤田",
    classroom: "21",
    period: 1,
    weekdays: 3,
  },
  {
    id: 8,
    subject: "ビジネスソフト応用IB(PowerPoint)",
    teacher: "森(烈)",
    classroom: "61",
    period: 1,
    weekdays: 4,
  },
  {
    id: 9,
    subject: "Linux",
    teacher: "伊藤",
    classroom: "61",
    period: 1,
    weekdays: 5,
  },
  {
    id: 10,
    subject: "12:35~13:00 HR",
    teacher: "岩崎",
    classroom: "61",
    period: 2,
    weekdays: 2,
  },
  {
    id: 11,
    subject: "プログラミング応用",
    teacher: "根岸",
    classroom: "71",
    period: 2,
    weekdays: 4,
  },
  {
    id: 12,
    subject: "スマートフォンアプリ開発",
    teacher: "深田",
    classroom: "61",
    period: 2,
    weekdays: 5,
  },
];
