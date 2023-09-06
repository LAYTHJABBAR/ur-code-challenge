import * as fs from "fs";
import { Schedule, Timestamp } from "./src/model";

/**
 * Calculates heater targets based on schedules and timestamps.
 * @param schedules - Array of Schedule objects
 * @param timestamps - Array of Timestamp objects
 */
function calculateHeaterTargets(schedules: Schedule[], timestamps: Timestamp[]): void {
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

/**
 * Converts a date to a specific time zone.
 * @param date - The date to convert
 * @param timeZone - The target time zone
 * @returns The converted date in the target time zone
 */
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