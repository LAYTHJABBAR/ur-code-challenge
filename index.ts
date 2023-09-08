import * as fs from "fs";
import { Schedule, Timestamp } from "./src/model";

// Function to calculate local time based on time zone
function calculateLocalTime(timestamp: Date, timeZone: string): Date {
  return new Date(timestamp.toLocaleString("en-US", { timeZone }));
}

// Function to find the next schedule change
function findNextScheduleChange(
  schedule: Schedule,
  timestamp: Date
): [string | null, Date | null] | any {
  const localTimestamp = calculateLocalTime(timestamp, schedule.timeZone);

  // Filter and sort the schedule entries for the current day
  const todaySchedule = schedule.schedule.filter(
    (entry) => entry.weekDays[localTimestamp.getDay()]
  );
  todaySchedule.sort((a, b) => {
    const [aHours, aMinutes] = a.time.split(":").map(Number);
    const [bHours, bMinutes] = b.time.split(":").map(Number);
    return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
  });

  for (const entry of todaySchedule) {
    const [hours, minutes] = entry.time.split(":").map(Number);
    const scheduleTime = new Date(localTimestamp);
    scheduleTime.setHours(hours, minutes, 0, 0);
    if (scheduleTime > localTimestamp) {
      return [entry.target, scheduleTime];
    }
  }

  // If no change found for today, find the first change for the next day
  const nextDay = new Date(localTimestamp);
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(0, 0, 0, 0);

  const nextDaySchedule: any = schedule.schedule.filter(
    (entry) => entry.weekDays[nextDay.getDay()]
  );
  if (nextDaySchedule.length > 0) {
    const [hours, minutes] = nextDaySchedule[0].time.split(":").map(Number);
    const scheduleTime = new Date(nextDay);
    scheduleTime.setHours(hours, minutes, 0, 0);
    return [nextDaySchedule[0].target, scheduleTime];
  }

  // If no schedule entries found, return null
  return [null, null];
}

// Read schedules.json and times.json files
const schedules: Schedule[] = JSON.parse(
  fs.readFileSync("./src/json/schedules.json", "utf8")
);
const times: Timestamp[] = JSON.parse(
  fs.readFileSync("./src/json/times.json", "utf8")
);

// Process each entry in times.json
for (const entry of times) {
  const schedule = schedules.find((s) => s.id === entry.scheduleId);
  if (schedule) {
    const [currentTarget, nextChange] = findNextScheduleChange(
      schedule,
      new Date(entry.timestamp)
    );
    if (currentTarget !== null && nextChange !== null) {
      const localNextChange = calculateLocalTime(nextChange, schedule.timeZone);
      console.log(
        `${entry.scheduleId}, ${entry.timestamp}: "${schedule.name}"`
      );
      console.log(
        `Target is: ${currentTarget}, Changing to: ${
          schedule.schedule.find((s) => s.target !== currentTarget)!.target
        }`
      );
      console.log(`at ${localNextChange}`);
      console.log(
        "#########################################################################"
      );
    }
  }
}
