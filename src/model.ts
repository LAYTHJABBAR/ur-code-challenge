// This code defines three interfaces: Schedule, ScheduleEntry, and TimeEntry.

// The Schedule interface has four properties: id (string), name (string), timeZone (string), and schedule (an array of ScheduleEntry objects).

// The ScheduleEntry interface has three properties: time (string), target (number), and weekDays (an array of booleans representing the days of the week).

// The TimeEntry interface has two properties: scheduleId (string) and timestamp (string).

// These interfaces can be used to define the structure of objects that will be used in the code.

// Explanation stepwise:
// 1. The code exports the Schedule, ScheduleEntry, and TimeEntry interfaces, making them accessible to other parts of the codebase.

// 2. The Schedule interface defines the structure of a schedule object, which includes an id, name, timeZone, and an array of schedule entries.

// 3. The ScheduleEntry interface defines the structure of a schedule entry object, which includes a time, target, and an array representing the days of the week.

// 4. The TimeEntry interface defines the structure of a time entry object, which includes a scheduleId and a timestamp.

// These interfaces can be used to create objects that adhere to the defined structure, ensuring type safety and consistency within the codebase.

// Interface for defining a schedule
export interface Schedule {
  id: string; // Unique identifier for the schedule
  name: string; // Name of the schedule
  timeZone: string; // Time zone of the schedule
  schedule: ScheduleEntry[]; // Array of schedule entries
}

// Interface for defining a schedule entry
export interface ScheduleEntry {
  time: string; // Time of the schedule entry
  target: number; // Target value for the schedule entry
  weekDays: boolean[]; // Array of booleans representing weekdays
  timeZone: string; //Time of the schedule zone
}

// Interface for defining a time entry
export interface Timestamp {
  scheduleId: string; // ID of the schedule associated with the time entry
  timestamp: string; // Timestamp of the time entry
}

export interface Options {
  timeZone: string;
  timeZoneName: string;
}
