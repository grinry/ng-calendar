export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6 | number;

export interface DayModel {
  index: number;
  date: Date;
  weekday: Weekday;
}
