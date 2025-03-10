export const getTime = (date: Date, change?: string, mode: "I" | "D" = "I", debug?: boolean): number => {
  // days hours minutes seconds
  const [days = 0, hrs = 0, mins = 0, secs = 0]: number[] = [
    ...(change ? change.split(" ").map((value: string) => (isNaN(parseInt(value)) ? 0 : parseInt(value))) : []),
  ];

  if (debug)
    console.log({
      mode: `${mode}. I -> increment or D -> decrement`,
      updates: `${days} days, ${hrs} hrs, ${mins} mins and ${secs} seconds.`,
    });

  return date.getTime() + (mode === "I" ? 1 : -1) * (((days * 24 + hrs) * 60 + mins) * 60 + secs) * 1000;
};
