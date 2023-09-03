const currentYear = new Date().getFullYear();
export const endYear = currentYear + 10 - (currentYear % 10);

const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
] as const;


type Month = (typeof months)[number];

export const getMonthHumanReadable = (month: Month) => {
    const map: Record<Month, string> = {
        jan: 'January',
        feb: 'February',
        mar: 'March',
        apr: 'April',
        may: 'May',
        jun: 'June',
        jul: 'July',
        aug: 'August',
        sep: 'September',
        oct: 'October',
        nov: 'November',
        dec: 'December'
    };

    return map[month];
};

type EventTime =
    | {
            tag: 'year';
            year: number;
      }
    | {
            tag: 'month';
            year: number;
            month: Month;
      }
    | {
            tag: 'day';
            year: number;
            month: Month;
            day: number;
      };

const monthToIndex = (month: Month) => {
    return months.indexOf(month);
};

const daysInMonth = (year: number, month: Month) => {
    const date = new Date(year, monthToIndex(month) + 1, 0);
    return date.getDate();
};

export const getEventTimePosInYear = (event: EventTime): number => {
    if (event.tag === 'year') {
        return 0;
    }

    if (event.tag === 'month') {
        return monthToIndex(event.month) / 12;
    }

    return (
        getEventTimePosInYear({
            tag: 'month',
            year: event.year,
            month: event.month
        }) +
        (event.day - 1) / daysInMonth(event.year, event.month) / 12
    );
};

type Event = {
    time: EventTime;
    name: string;
};

export const ev = (name: string, year: number, month?: Month, day?: number): Event => ({
    name,
    time:
        month && day
            ? {
                    tag: 'day',
                    year,
                    month,
                    day
              }
            : month
            ? {
                    tag: 'month',
                    year,
                    month
              }
            : {
                    tag: 'year',
                    year
              }
});

export const todayEv = (name: string): Event => {
    const now = new Date();
    
    return ev(name, now.getFullYear(), months[now.getMonth()], now.getDate());
};