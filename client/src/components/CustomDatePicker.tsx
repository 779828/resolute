import React, { useState, useRef, useEffect } from 'react';

interface CustomDatePickerProps {
  id: string;
  name: string;
  value: string; // YYYY-MM-DD
  onChange: (name: string, value: string) => void;
  placeholder?: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ id, name, value, onChange, placeholder = 'Select date' }) => {
  const today = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(value ? parseInt(value.split('-')[0]) : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(value ? parseInt(value.split('-')[1]) - 1 : today.getMonth());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const month = String(viewMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    onChange(name, `${viewYear}-${month}-${dayStr}`);
    setIsOpen(false);
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${MONTHS[parseInt(m) - 1]} ${parseInt(d)}, ${y}`;
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const selectedDay = value ? parseInt(value.split('-')[2]) : null;
  const selectedMonth = value ? parseInt(value.split('-')[1]) - 1 : null;
  const selectedYear = value ? parseInt(value.split('-')[0]) : null;

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  return (
    <div ref={ref} className="relative" id={id}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-lg border-2 bg-background px-4 py-3 text-left text-sm transition-colors ${
          isOpen ? 'border-primary' : 'border-input'
        } ${value ? 'text-foreground' : 'text-muted-foreground'}`}
      >
        <span>{value ? formatDisplayDate(value) : placeholder}</span>
        <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-72 rounded-lg border border-border bg-card p-4 shadow-lg">
          {/* Month/Year Navigation */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-semibold text-card-foreground">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Day Headers */}
          <div className="mb-1 grid grid-cols-7 gap-1">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="py-1 text-center text-xs font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} />;
              }

              const isSelected = day === selectedDay && viewMonth === selectedMonth && viewYear === selectedYear;
              const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors ${
                    isSelected
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : isToday
                      ? 'border border-primary text-primary font-medium'
                      : 'text-card-foreground hover:bg-secondary'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Today button */}
          <button
            type="button"
            onClick={() => {
              setViewMonth(today.getMonth());
              setViewYear(today.getFullYear());
              handleSelectDay(today.getDate());
            }}
            className="mt-3 w-full rounded-md bg-secondary py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-muted"
          >
            Today
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
