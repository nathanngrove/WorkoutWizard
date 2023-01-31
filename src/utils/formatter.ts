const weekdayFormatter = new Intl.DateTimeFormat("en-us", {
  localeMatcher: "lookup",
  weekday: "long",
});

const dateFormatter = new Intl.DateTimeFormat("en-us", {
  localeMatcher: "lookup",
  month: "long",
  day: "numeric",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-us", {
  localeMatcher: "lookup",
  hour12: true,
  hour: "2-digit",
  minute: "2-digit",
});

const dateStringFormatter = new Intl.DateTimeFormat("en-us", {
  localeMatcher: "lookup",
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  hour12: true,
  hour: "2-digit",
  minute: "2-digit",
});

export { weekdayFormatter, dateFormatter, timeFormatter, dateStringFormatter };
