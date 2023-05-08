import dayjs from "dayjs";

export const convertDateTimeToUnix = (date: string, duration: string) => {
  // @ts-ignore
  const dateToConvert = dayjs(date)
   // @ts-ignore
    .set("hour", duration.split(":")[0])
     // @ts-ignore
    .set("minute", duration.split(":")[1])
    .format("DD-MM-YYYY HH:mm");

    console.log('DATE', dayjs(dateToConvert).unix().toString())
  return dayjs(dateToConvert).unix().toString();
};

export function getDatesBetween(startDate: any, endDate: any) {
  const dates = [];
  let currentDate = dayjs(startDate);
  let currentEndDate = dayjs(endDate);

  while (
    currentDate.isBefore(currentEndDate) ||
    currentDate.isSame(currentEndDate)
  ) {
    dates.push(currentDate.format("DD-MM-YYYY"));
    currentDate = currentDate.add(1, "day");
  }

  return dates;
}
