import {FC, useMemo, useState} from 'react';

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

const getPreviousMonthDays = (year: number, month: number) => {
  const currentMonthFirstDay = new Date(year, month, 1);
  const dayOfTheWeek = currentMonthFirstDay.getDay();
  const prevMonthCellsAmount = dayOfTheWeek - 1;
};
const getNextMonthDays = () => {};
const getCurrentMonthDays = (
  year: number,
  month: number,
  numberOfDays: number,
) => {
  const dateCells: DateCellItem[] = [];
  for (let i = 1; i < numberOfDays; i += 1) {
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
    return items;
  }, [panelYear, panelMonth]);

  const nextYear = () => {};
  const prevYear = () => {};
  const nextMonth = () => {};
  const prevMonth = () => {};

  return (
    <div>
      {day} {month} {year}
    </div>
  );
};

export default PickDate;
