//--- Variables ---//

let date = null;
const CLICK_EVENT = 'click';
const NEXT = 'NEXT';
const PREVIOUS = 'PREVIOUS';
const MESSAGES = {
    LAST_MONTH: 'This is last month of the year',
    FIRST_MONTH: 'This is the first month of the year',
    NOT_AVAILABLE: 'Not available',
}
let switchValue = false; // false - default ( current location ), true - New York
let isCalendarOpen = false; // true - open, false - close
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
    'January 2022',
    'February 2022',
    'March 2022',
    'April 2022',
    'May 2022',
    'June 2022',
    'July 2022',
    'August 2022',
    'September 2022',
    'October 2022',
    'November 2022',
    'December 2022',
];

const interval = 1800;
const newYorkLocation = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});

const dateInfo = document.getElementById('date-info');
const selectedRegionTimeElement = document.getElementById('selected-region-time');
const controlSwitchElement = document.getElementById('switch');
const calendarView = document.getElementById('calendar-view');
const calendarTitle = document.getElementById('current-month');
const calendarTable = document.getElementById('calendar-table');
const btnPrevious = document.getElementById('btn-previous');
const btnNext = document.getElementById('btn-next');
const timeListElement = document.getElementById('time-list');


//--- Functions ---//

const currentDate = (value) => {
    return value ? new Date(value) : new Date();
};

const howMuchDays = (year, month) => {
    return new Date(year, (month + 1), 0).getDate();
}

const getWeekDay = (year, month) => {
    const weekDayItem = daysOfWeek[new Date(year, month, 1).getDay()]
    return daysOfWeek.indexOf(weekDayItem);
}

const getMonthTitle = (month) => {
    return months[month];
}

const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + '.' + minutes + ' ' + ampm;
}

const formatTraditionalTime = (string) => { // example string = 12.30 AM
    const timeString = string.split(' ')[0];
    let [defaultHour, defaultMinutes] = [
        Number(timeString.split('.')[0]),
        Number(timeString.split('.')[1]),
    ];

    const ampm = string.split(' ')[1];

    if(ampm === 'PM') {
        defaultHour = 12 + defaultHour;
    }

    const [hour, minutes] = [
        defaultHour,
        defaultMinutes === 0 ? 0 : 30
    ]

    return [hour, minutes];
}

const formatDateMonthDayYear = (date) => {
    const stringDate = date.toDateString().split(' ');
    const [month, day, year] = [stringDate[1], stringDate[2], stringDate[3]];

    return `${month} ${day} ${year}`;
}

const setSelectedRegionTime = (selectedDate) => {
    const [date, time] = [formatDateMonthDayYear(selectedDate), formatAMPM(selectedDate)];

    selectedRegionTimeElement.innerHTML = `${date}, ${time}`;
};

const setRoundTime = (date) => {
    return new Date(Math.floor(new Date(date).getTime()/(interval*1000)) *(interval*1000));
}

const openCalendar = () => {
    isCalendarOpen = !isCalendarOpen;
    if(isCalendarOpen) {
        calendarView.classList.add('active');
    } else {
        calendarView.classList.remove('active');
    }
};

const switchCountry = () => {
    switchValue = !switchValue;
    if(switchValue) {
        calendarView.classList.remove('active');
        controlSwitchElement.classList.add('active');

        date = currentDate(newYorkLocation);
        date = setRoundTime(date);
        setSelectedRegionTime(date);
        createCalendar(date);
        createIntervals(newYorkLocation);

    }  else {
        calendarView.classList.remove('active');
        controlSwitchElement.classList.remove('active');

        date = currentDate();
        date = setRoundTime(date);
        setSelectedRegionTime(date);
        createCalendar(date);
        createIntervals();

    };
};

const createCalendar = (currentDate) => {
    calendarTable.innerHTML = '';
    const [year, month, currentDay] = [
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
    ];

    const currentMonthNumberOfDays = howMuchDays(year, month);
    const currentWeekDay = getWeekDay(year, month) - 1;
    const previousMonthNumberOfDays = howMuchDays(year, month - 1);
    const tableTitle = getMonthTitle(month);
    const lastDayOfWeek = daysOfWeek.length - 1;

    const table = document.createElement('table');
    const th = document.createElement('td');
    const td = document.createElement('td');

    for (let i = 0; i < daysOfWeek.length; i++) {
        const item = daysOfWeek[i];
        const tr = document.createElement('tr');
        tr.classList.add('calendar-table__header');
        tr.append(item);
        th.append(tr);
    }

    table.append(th);
    for( let i = (previousMonthNumberOfDays - currentWeekDay); i <= previousMonthNumberOfDays; i++) {
        const tr = document.createElement('tr');
        tr.classList.add('calendar-table__item', 'no-active', 'previous-month');
        tr.append(i);
        td.append(tr);
    }

    for (let day = 1; day <= currentMonthNumberOfDays; day++) {
        const tr = document.createElement('tr');
        tr.classList.add('calendar-table__item');

        if (day === currentDay) {
            tr.classList.add('active');
            tr.append(day);
        } else {
            tr.append(day);
        }

        td.append(tr);
    }
    const weekDayOfLastMonthDay = new Date(year, month, currentMonthNumberOfDays).getDay();

    if(!(weekDayOfLastMonthDay === lastDayOfWeek)) {
        const numberRemainingDays = lastDayOfWeek - weekDayOfLastMonthDay;
        for (let day = 1; day <= numberRemainingDays; day++) {
            const tr = document.createElement('tr');
            tr.classList.add('calendar-table__item', 'no-active', 'next-month');
            tr.append(day);
            td.append(tr);

        }
    }

    table.append(td);

    calendarTitle.innerHTML = tableTitle;
    calendarTable.append(table);
}

const createIntervals = () => {
    timeListElement.innerHTML = '';

    const [year, month, currentDay, hour, minutes] = [
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours() - 1,
        date.getMinutes(),
    ];
    const intervalTime = new Date(year, month, currentDay, hour, minutes);
    const iterationNumber = minutes === 30 ? ((24 - hour) * 2) - 1 : (24 - hour) * 2;

    for (let i = 1; i < iterationNumber; i++) {
        intervalTime.setMinutes(intervalTime.getMinutes() + 30);
        const timeToString = formatAMPM(intervalTime);
        const li = document.createElement('li');

        if(formatAMPM(date) !== timeToString) {
            li.classList.add('time-list__item');

        } else {
            li.classList.add('time-list__item', 'active');

        }

        li.append(timeToString);
        timeListElement.append(li);
    }
}

const changeMonth = (value) => {
    const titleValue = calendarTitle.innerHTML;

    if(value === NEXT) {
        if(titleValue === months[months.length - 1]) {
            alert(MESSAGES.LAST_MONTH);

        } else {
            date.setMonth(date.getMonth() + 1);
            createCalendar(date);
            setSelectedRegionTime(date);
        }

    } else if(value === PREVIOUS) {
        if(titleValue === months[0]) {
            alert(MESSAGES.FIRST_MONTH);

        } else {
            date.setMonth(date.getMonth() - 1);
            createCalendar(date);
            setSelectedRegionTime(date);
        }

    }
};

const setActiveDate = (event) => {
    const classes = event.target.classList.value;
    const currentDay = event.target.innerHTML;

    if (classes.indexOf('calendar-table__header') !== -1) {
        return;
    }
    if(classes.indexOf('no-active') === -1) {
        date.setDate(currentDay);
        createCalendar(date);
        setSelectedRegionTime(date);
    } else {
        if(classes.indexOf('previous-month') !== -1) {
            date.setMonth(date.getMonth() - 1);
            date.setDate(currentDay);
            createCalendar(date);
            setSelectedRegionTime(date);


        } else if(classes.indexOf('next-month') !== -1) {
            date.setMonth(date.getMonth() + 1);
            date.setDate(currentDay);
            createCalendar(date);
            setSelectedRegionTime(date);

        }
    }
};

const setActiveTime = (event) => {
    const timing = event.target.innerHTML
    console.log(timing);
    if(timing.indexOf('li') === -1 ) {
        const [hour, minutes] = formatTraditionalTime(event.target.innerHTML);

        const [year, month, currentDay] = [
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
        ];

        date = new Date(year, month, currentDay, hour, minutes);
        date = setRoundTime(date);
        setSelectedRegionTime(date);
        createIntervals();
    }
}




const loadedPage = () => {
    date = currentDate();
    date = setRoundTime(date);
    setSelectedRegionTime(date);
    calendarView.classList.add('active');
    createCalendar(date);
    createIntervals();
};

//--- Event Handling ---//

window.onload = loadedPage;

dateInfo.addEventListener(CLICK_EVENT, openCalendar);

btnPrevious.addEventListener(CLICK_EVENT, () => changeMonth(PREVIOUS));
btnNext.addEventListener(CLICK_EVENT, () => changeMonth(NEXT));

calendarTable.addEventListener(CLICK_EVENT, setActiveDate);
timeListElement.addEventListener(CLICK_EVENT, setActiveTime);

controlSwitchElement.addEventListener(CLICK_EVENT, switchCountry);
