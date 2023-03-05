import {FC, useMemo, useState} from 'react';
import style from './PickDate.module.scss';

interface PickDateProps {
  value: Date;
  onChange: (value: Date) => void;
}

interface DateCellItem {
  day: number;
  month: number;
  year: number;
  isToday?: boolean;
  isSelected?: boolean;
}

const getDaysAmountInAMonth = (year: number, month: number) => {
  const nextMonthDate = new Date(year, month + 1, 1);
  nextMonthDate.setMinutes(-1);
  return nextMonthDate.getDate();
};

const daysOfTheWeek = ['Mon', 'Thu', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const getPreviousMonthDays = (year: number, month: number) => {
  const dateCells: DateCellItem[] = [];
  const currentMonthFirstDay = new Date(year, month, 1);
  const dayOfTheWeek = currentMonthFirstDay.getDay();
  const prevMonthCellsAmount = dayOfTheWeek - 1;
  const daysAmountInPrevMonth = getDaysAmountInAMonth(year, month - 1);
  const [cellYear, cellMonth] =
    month === 0 ? [year - 1, 11] : [year, month - 1];
  for (let i = 0; i < prevMonthCellsAmount; i += 1) {
    dateCells.push({
      year: cellYear,
      month: cellMonth,
      day: daysAmountInPrevMonth - i,
    });
  }
  return dateCells;
};
const getNextMonthDays = (year: number, month: number) => {
  const currentMonthFirstDay = new Date(year, month, 1);
  const dayOfTheWeek = currentMonthFirstDay.getDay();
  const prevMonthCellsAmount = dayOfTheWeek - 1;
  const daysAmount = getDaysAmountInAMonth(year, month);
  const nextMonthDays = 42 - daysAmount - prevMonthCellsAmount;
  const dateCells: DateCellItem[] = [];
  const [cellYear, cellMonth] = month === 0 ? [year + 1, 0] : [year, month + 1];
  for (let i = 1; i < nextMonthDays; i += 1) {
    dateCells.push({
      year: cellYear,
      month: cellMonth,
      day: i,
    });
  }
  return dateCells;
};
const getCurrentMonthDays = (
  year: number,
  month: number,
  numberOfDays: number,
) => {
  const dateCells: DateCellItem[] = [];
  for (let i = 1; i <= numberOfDays; i += 1) {
    dateCells.push({
      year,
      month,
      day: i,
    });
  }
  return dateCells;
};

const PickDate: FC<PickDateProps> = ({value, onChange}) => {
  const [panelYear, setPanelYear] = useState(() => value.getFullYear());
  const [panelMonth, setPanelMonth] = useState(() => value.getMonth());

  const [year, month, day] = useMemo(() => {
    const currentYear = value.getFullYear();
    const currentMonth = value.toLocaleString('en', {month: 'short'});
    const currentDay = value.getDate();
    return [currentYear, currentMonth, currentDay];
  }, [value]);

  const dateCells = useMemo(() => {
    const items: DateCellItem[] = [];
    const daysInAMonth = getDaysAmountInAMonth(panelYear, panelMonth);
    const currentMonthDays = getCurrentMonthDays(
      panelYear,
      panelMonth,
      daysInAMonth,
    );
    const prevMonthDays = getPreviousMonthDays(panelYear, panelMonth);
    const nextMonthDays = getNextMonthDays(panelYear, panelMonth);
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  }, [panelYear, panelMonth]);

  return (
    <div className={style.calendar}>
      <div>
        Date: {day} {month} {year}
      </div>
      <div className={style.cells}>
        {daysOfTheWeek.map((e) => (
          <div className={style.cell}>{e}</div>
        ))}
        {dateCells.map((e) => (
          <div className={style.cell}>{e.day}</div>
        ))}
      </div>
    </div>
  );
};

export default PickDate;
