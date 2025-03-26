import React from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { monthDays } from '../../helpers';
import { useSelectedDateContext } from '../../hooks/selected-date-context';
import DaysOfWeekCard from '../../calendar/monthly/days-of-week.component';
import MonthlyWorkloadCard from './monthlyWorkCard';
import styles from './monthly-workload.scss';

interface MonthlyCalendarViewProps {
  calendarWorkload: Array<{ count: number; date: string }>;
  dateToDisplay?: string;
  onDateClick?: (pickedDate: Date) => void;
}

const MonthlyCalendarView: React.FC<MonthlyCalendarViewProps> = ({
  calendarWorkload,
  dateToDisplay = '',
  onDateClick,
}) => {
  const monthFormat = 'MMMM, YYYY';
  const { t } = useTranslation();
  const { selectedDate } = useSelectedDateContext();
  const daysInWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
  const monthViewDate = dateToDisplay === '' ? selectedDate : dateToDisplay;
  const daysInWeeks = daysInWeek.map((day) => t(day));

  const handleClick = (date: Date) => {
    if (onDateClick) {
      onDateClick(date);
    }
  };

  return (
    <div className={styles.calendarViewContainer}>
      <>
        <div className={styles.container}></div>
        <span className={styles.headerContainer}>{dayjs(monthViewDate).format(monthFormat)}</span>
        <div className={styles.workLoadCard}>
          {daysInWeeks?.map((day, i) => <DaysOfWeekCard key={`${day}-${i}`} dayOfWeek={day} />)}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.monthlyCalendar}>
            {monthDays(dayjs(monthViewDate)).map((dateTime, i) => (
              <div
                onClick={() => handleClick(dayjs(dateTime).toDate())}
                key={i}
                className={`${styles.monthlyWorkloadCard} ${
                  dayjs(dateTime).format('YYYY-MM-DD') === dayjs(monthViewDate).format('YYYY-MM-DD')
                    ? styles.selectedDate
                    : ''
                }`}>
                <MonthlyWorkloadCard
                  key={i}
                  date={dateTime}
                  isActive={dayjs(dateToDisplay).format('DD-MM-YYYY') === dayjs(dateTime).format('DD-MM-YYYY')}
                  count={
                    calendarWorkload.find((calendar) => calendar.date === dayjs(dateTime).format('YYYY-MM-DD'))
                      ?.count ?? 0
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default MonthlyCalendarView;
