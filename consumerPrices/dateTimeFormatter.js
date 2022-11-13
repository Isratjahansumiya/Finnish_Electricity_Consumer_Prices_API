import dayjs from 'dayjs';

export const dateFormatter=(dates)=>{
    const date = dayjs
      .tz(dates, "UTC")
      .tz("Europe/Helsinki")
      .format("YYYY-MM-DD");
      return date;
}

export const timeFormatter=(times)=>{
    const time = dayjs
      .tz(times, "UTC")
      .tz("Europe/Helsinki")
      .format("H:mm");
      return time;
}