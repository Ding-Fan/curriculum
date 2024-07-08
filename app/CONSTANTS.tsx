"use client";

export type Period = {
  id: number;
  startTime: string;
  endTime: string;
};

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
    subject: "Web デザイン I",
    teacher: "岩本",
    classroom: "43",
    period: 0,
    weekdays: 1,
  },
  {
    id: 1,
    subject: "英語 I",
    teacher: "トベ　サラミ",
    classroom: "21",
    period: 0,
    weekdays: 2,
  },
  {
    id: 2,
    subject: "ネットワーク I",
    teacher: "深田",
    classroom: "24",
    period: 0,
    weekdays: 3,
  },
  {
    id: 3,
    subject: "ビジネス日本語練習 I",
    teacher: "吉田",
    classroom: "21",
    period: 0,
    weekdays: 4,
  },
  {
    id: 4,
    subject: "プログラミング I",
    teacher: "根岸",
    classroom: "61",
    period: 0,
    weekdays: 5,
  },
  {
    id: 5,
    subject: "Web デザイン I",
    teacher: "岩本",
    classroom: "43",
    period: 1,
    weekdays: 1,
  },
  {
    id: 6,
    subject: "ビジネスソフト I A (Excel)",
    teacher: "森（烈）",
    classroom: "61",
    period: 1,
    weekdays: 2,
  },
  {
    id: 7,
    subject: "ビジネスソフト I B (Word)",
    teacher: "伊藤",
    classroom: "24",
    period: 1,
    weekdays: 3,
  },
  {
    id: 8,
    subject: "コンピューターシステム I",
    teacher: "山崎",
    classroom: "31",
    period: 1,
    weekdays: 4,
  },
  {
    id: 9,
    subject: "プログラミング I",
    teacher: "根岸",
    classroom: "61",
    period: 1,
    weekdays: 5,
  },
  {
    id: 10,
    subject: "ビジネス日本語 I",
    teacher: "澤田",
    classroom: "41",
    period: 2,
    weekdays: 1,
  },
  {
    id: 11,
    subject: "ビジネス基礎 I",
    teacher: "森（大）",
    classroom: "21",
    period: 2,
    weekdays: 2,
  },
  {
    id: 12,
    subject: "12:35~13:00 HR",
    teacher: "岩崎",
    classroom: "24",
    period: 2,
    weekdays: 3,
  },
];
