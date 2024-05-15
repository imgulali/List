import moment from "moment";

export const getHoursDifference = (dateTime1, dateTime2) => {
  const date1 = moment(dateTime1);
  const date2 = moment(dateTime2);

  const differenceInHours = Math.abs(date2.diff(date1, "hours"));

  return differenceInHours;
};
