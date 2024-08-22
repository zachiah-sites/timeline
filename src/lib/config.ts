import { ev, todayEv } from "$lib/Event";

const config = {
    startYear: 2000,
    events: [
        ev('Born', 2005),
        ev('Started playing piano', 2015, 'sep'),
        ev('Started working at CloudOne', 2023, 'may', 22),
        ev('Started doing jiujitsu', 2022, 'feb', 18),
        ev('Left the NIFB', 2021, 'aug', 21),
        ev('Moved to Vancouver WA', 2017, 'aug'),
        ev('Made my first money from programming', 2019, 'oct'),
        ev("Joined the NIFB", 2014, 'jun'),
        ev("Started working for Max Minds LLC", 2021, 'apr'),
        ev("Started working for Incmix", 2021, "oct"),
        ev('Started programming (pretty sure)', 2018, 'mar'),
        ev('Got my blue belt in BJJ', 2024, 'jan', 23),
        ev('Moved to Spokane Valley', 2024, 'feb', 1),
        ev('Last day working for CloudOne', 2024, 'mar', 29),
        ev("Moved to Coeur d'Alene ID", 2024, 'jul', 1),
        todayEv('Today'),
    ],
    title: "Zachiah's Life Timeline"
}

export default config;
