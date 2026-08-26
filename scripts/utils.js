import fs from "fs";
import path from "path";
import { minify } from "html-minifier-terser";
import { config } from "./config.js";

export function parseTimestamp(input) {
  const date = new Date(input);
  const { timestamp_locale, timestamp } = config.formatting;

  const result = new Intl.DateTimeFormat(timestamp_locale, {
    day: timestamp.day,
    month: timestamp.month,
    year: timestamp.year,
    hour: timestamp.hour,
    minute: timestamp.minute,
    timeZoneName: timestamp.time_zone_name
  }).format(date);

  return result;
}

export function parseYearMonth(input) {
  if (input == null) return null;

  const [year, month] = input.split("-").map(Number);

  if (!year || !month || month < 1 || month > 12) {
    throw new Error("Invalid format. Expected YYYY-MM.");
  }

  const date = new Date(year, month - 1);

  return date;
}

export function getTimeDifference(startDate, endDate) {
  const start = startDate < endDate ? startDate : endDate;
  const end = startDate < endDate ? endDate : startDate;

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  let hours = end.getHours() - start.getHours();
  let minutes = end.getMinutes() - start.getMinutes();
  let seconds = end.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }

  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  if (hours < 0) {
    hours += 24;
    days--;
  }

  if (days < 0) {
    months--;
    const previousMonthDays = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += previousMonthDays;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function formatTimeDifference(timeDifferenceObject) {
  const parts = [];

  const units = [
    { key: "years", singular: "year" },
    { key: "months", singular: "month" },
    { key: "days", singular: "day" },
    { key: "hours", singular: "hour" },
    { key: "minutes", singular: "minute" },
    { key: "seconds", singular: "second" }
  ];

  for (const { key, singular } of units) {
    if (timeDifferenceObject[key] !== undefined && timeDifferenceObject[key] !== 0) {
      const value = timeDifferenceObject[key];
      const label = value === 1 ? singular : key;
      parts.push(`${value} ${label}`);
    }
  }

  if (parts.length === 0) {
    return "0 time elapsed";
  }

  const { list_locale, list_style, list_type } = config.formatting;

  const formatter = new Intl.ListFormat(list_locale, {
    style: list_style,
    type: list_type
  });

  return formatter.format(parts);
}

export function parseMetadataDir(metadataDirPath) {
  let metadataList = [];

  const metadataDir = path.resolve(metadataDirPath);

  if (!fs.existsSync(metadataDir)) {
    console.log("Input directory doesn't exist, aborting parsing process");
    return;
  }

  const entries = fs.readdirSync(metadataDir, { withFileTypes: true });
  const jsonFiles = entries.filter(
    (e) => e.isFile() && e.name.endsWith(".json")
  );

  if (jsonFiles.length === 0) {
    console.log("No metadata (JSON) files in input directory, aborting parsing process");
    return;
  }

  const files = fs.readdirSync(metadataDir);

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const metadataFile = fs.readFileSync(
      path.join(metadataDir, file),
      "utf8"
    );

    const metadata = JSON.parse(metadataFile);

    metadataList.push(metadata);
  }

  return metadataList;
}

export function wrapIntoParagraph(str) {
  const hasParagraph = /<p\b[^>]*>/i.test(str);

  if (hasParagraph) {
    return str;
  }

  return `<p>${str}</p>`;
}

export function metadataDescendingSorter(a, b) {
  if (Number(a.id) < Number(b.id))
    return 1; // `b` comes before `a`
  else if (Number(a.id) > Number(b.id))
    return -1; // `a` comes before `b`
  else // equal
    return 0;
}

export async function minifyHTML(inputFile) {
  const options = config.html_minifier;

  const outputFile = await minify(inputFile, {
    collapseWhitespace: options.collapse_whitespace,
    removeComments: options.remove_comments,
    minifyCSS: options.minify_css,
    minifyJS: options.minify_js
  });

  return outputFile;
}

export function minifyCSS(inputFile) {
  // TODO: Implement CSS minification here
  return inputFile;
}
