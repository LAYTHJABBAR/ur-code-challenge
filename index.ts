import * as fs from "fs";
import { Schedule, Timestamp } from "./src/model";

function calculateHeaterTargets(
  schedules: Schedule[],
  timestamps: Timestamp[]
): void {
  timestamps.forEach((timestamp) => {
    const schedule = schedules.find((sch) => sch.id === timestamp.scheduleId);
    if (schedule) {
      const utcTimestamp = new Date(timestamp.timestamp);
      const localTimestamp = convertToTimeZone(utcTimestamp, schedule.timeZone);
      let currentTarget: number = 0;
      let nextTarget: number = 0;
      let nextTargetTime: Date | string = "";

      schedule.schedule.forEach((entry) => {
        const entryTime = new Date(localTimestamp);
        const [hours, minutes] = entry.time.split(":");
        entryTime.setHours(Number(hours));
        entryTime.setMinutes(Number(minutes));
        if (entryTime <= localTimestamp) {
          currentTarget = entry.target;
        } else if (nextTarget === 0 || entryTime < nextTargetTime) {
          nextTarget = entry.target;
          nextTargetTime = entryTime;
        }
      });

      console.log(`${schedule.id} ${timestamp.timestamp}:`);
      console.log(
        `"${schedule.name}" target is ${currentTarget} changing to ${nextTarget} at ${nextTargetTime}`
      );
    }
  });
}

function convertToTimeZone(date: Date, timeZone: string): Date {
  const options: any = { timeZone, timeZoneName: "short" };
  const formattedDate = date.toLocaleString("en-US", options);
  return new Date(formattedDate);
}

// Read schedules.json and times.json files
const schedulesData = fs.readFileSync("./src/json/schedules.json", "utf8");
const timesData = fs.readFileSync("./src/json/times.json", "utf8");

const schedules: Schedule[] = JSON.parse(schedulesData);
const timestamps: Timestamp[] = JSON.parse(timesData);

// Calculate heater targets
calculateHeaterTargets(schedules, timestamps);
