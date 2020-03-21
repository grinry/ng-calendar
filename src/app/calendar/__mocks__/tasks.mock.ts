import { TaskModel } from '../models/task.model';
import * as moment from 'moment';

type State = 'approved' | 'rejected' | 'none';
type Type = 'hours' | 'expense' | 'additional';

interface ExpenseContext {
  quantity: number;
  price: number;
}

interface HoursContext {
  firstTaskStart: Date;
  lastTaskEnd: Date;
}

const createTask = (
  date: Date,
  event: string,
  type: Type,
  state: State,
  hours: HoursContext = {firstTaskStart: null, lastTaskEnd: null},
  expense: ExpenseContext = {quantity: 0, price: 0},
): TaskModel => {
  return {
    date,
    quantity: expense.quantity,
    price: expense.price,
    eventType: event,
    isExpenseType: type === 'expense',
    isHoursEventType: type === 'hours',
    isAdditionalHoursEventType: type === 'additional',
    isWorkHour: type === 'hours',
    isApproved: state === 'approved',
    isRejected: state === 'rejected',
    tasksCount: 1,
    firstTaskStart: hours.firstTaskStart,
    lastTaskEnd: hours.lastTaskEnd,
  };
};

const createExpense = (date: Date, event: string, state: State, quantity: number, price: number) => {
  return createTask(
    date,
    event,
    'expense',
    state,
    {firstTaskStart: null, lastTaskEnd: null},
    {quantity, price},
  );
};

const createWorkHour = (startAt: Date, endAt: Date, event: string, state: State) => {
  return createTask(
    startAt,
    event,
    'hours',
    state,
    {firstTaskStart: startAt, lastTaskEnd: endAt},
  );
};

const createAdditionalHours = (startAt: Date, endAt: Date, event: string, state: State, quantity: number) => {
  return createTask(
    startAt,
    event,
    'additional',
    state,
    {firstTaskStart: startAt, lastTaskEnd: endAt},
    {quantity, price: 0},
  );
};

const day1date = moment().endOf('day');
const day2date = moment().endOf('day').subtract(1, 'day');
const day3date = moment().endOf('day').subtract(2, 'day');

const day1 = [
  createWorkHour(
    day1date.clone().subtract(10, 'hours').toDate(),
    day1date.clone().subtract(7, 'hours').toDate(),
    'Cleaning pipes',
    'approved',
  ),
  createWorkHour(
    day1date.clone().subtract(7, 'hours').toDate(),
    day1date.clone().subtract(2, 'hours').toDate(),
    'Woodcutting',
    'none',
  ),
  createExpense(
    day1date.clone().toDate(),
    'Buying nails',
    'approved',
    100,
    0.01,
  ),
  createExpense(
    day1date.clone().toDate(),
    'Buying pencils',
    'approved',
    2,
    2.3,
  ),
  createAdditionalHours(
    day1date.clone().subtract(2, 'hours').toDate(),
    day1date.clone().subtract(1, 'hours').toDate(),
    'No idea why',
    'approved',
    2,
  ),
];

const day2 = [
  createWorkHour(
    day2date.clone().subtract(13, 'hours').toDate(),
    day2date.clone().subtract(6, 'hours').toDate(),
    'Job A',
    'approved',
  ),
  createWorkHour(
    day2date.clone().subtract(5, 'hours').toDate(),
    day2date.clone().subtract(1, 'hours').toDate(),
    'Job B',
    'approved',
  ),
  createExpense(
    day2date.clone().toDate(),
    'Exsense A',
    'approved',
    3,
    12,
  ),
  createExpense(
    day2date.clone().toDate(),
    'Expense B',
    'approved',
    1,
    32,
  ),
  createAdditionalHours(
    day2date.clone().subtract(2, 'hours').toDate(),
    day2date.clone().subtract(1, 'hours').toDate(),
    'Some additional hours',
    'approved',
    8,
  ),
];

const day3 = [
  createWorkHour(
    day3date.clone().subtract(13, 'hours').toDate(),
    day3date.clone().subtract(6, 'hours').toDate(),
    'Some done task',
    'approved',
  ),
  createWorkHour(
    day3date.clone().subtract(2, 'hours').toDate(),
    day3date.clone().subtract(1, 'hours').subtract(15, 'minutes').toDate(),
    'Working at something badly',
    'rejected',
  ),
  createExpense(
    day3date.clone().toDate(),
    'Exsense A',
    'approved',
    3,
    12,
  ),
];

export const mockedTasks: Array<TaskModel> = [...day1, ...day2, ...day3];
