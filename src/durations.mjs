// Fills date-math tokens in CV source at build time, so durations stay correct
// as "present" roles age. Months are counted inclusively (Jan to Mar = 3 months),
// the same way LinkedIn counts them.
//
//   {{duration 2024-11 2026-10}}   -> 2 yrs
//   {{duration 2024-12 now}}       -> 1 yr 11 mos   (now = build date)
//   {{experience 2019-09}}         -> 7+ years      (whole years since start)

const TOKEN = /\{\{(duration|experience) ([^}]+)\}\}/g;

function month_index(text, now) {
  if (text === "now") return now.getUTCFullYear() * 12 + now.getUTCMonth();
  const match = text.match(/^(\d{4})-(\d{2})$/);
  if (!match) throw new Error(`bad month "${text}", expected YYYY-MM or now`);
  return +match[1] * 12 + (+match[2] - 1);
}

function format_months(months) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years === 1 ? "" : "s"}`);
  if (rest) parts.push(`${rest} mo${rest === 1 ? "" : "s"}`);
  return parts.join(" ");
}

export function fill_durations(source, now = new Date()) {
  return source.replace(TOKEN, (_, kind, args) => {
    const [start, end = "now"] = args.trim().split(/\s+/);
    if (kind === "experience") {
      const months = month_index("now", now) - month_index(start, now);
      if (months < 12) throw new Error(`experience since ${start} is under a year`);
      return `${Math.floor(months / 12)}+ years`;
    }
    const months = month_index(end, now) - month_index(start, now) + 1;
    if (months < 1) throw new Error(`duration ${start} to ${end} ends before it starts`);
    return format_months(months);
  });
}
