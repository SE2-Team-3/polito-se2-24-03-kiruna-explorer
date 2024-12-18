export const xPosCalculator = (date: string | null,yearWidths:number[]) => {
  if (date == null) return 200;
  let month = 0,
    day = 0,
    x = 200,
    y = 2004
  const year = parseInt(date.slice(0, 4));
  while (y < year) {
    x = x + yearWidths[y-2004];
    y++;
  }
  if (date.length >= 6) {
    month = parseInt(date.split("-")[1]) - 1;
    x = x + (month * yearWidths[y-2004]) / 12;
  }
  if (date.length >= 8) {
    day = parseInt(date.split("-")[2]) - 1;
    x = x + (day * yearWidths[y-2004]) / 12 / 30;
  }
  return x;
};

export const yPosCalculator = (scale: string) => {
  //const isPlan = new RegExp("^[0-9]*$");

  /*650 floor 250 ceiling
  if (isPlan.test(scale)) {
    const s = parseInt(scale);
    if (s > 100000) return 650 - 400;
    if (s > 10000) return 650 - 350;
    if (s > 5000) return 650 - 250;
    if (s > 1000) return 650 - 150;
    return 650 - 50;
  }
  */

  if (scale.includes(":")) {
    const parts = scale.split(":");
    if (parts.length === 2) {
      const ratio = parseInt(parts[1]);
      if (!isNaN(ratio)) {
        if (ratio > 100000) return 650 - 400;
        if (ratio > 10000) return 650 - 350;
        if (ratio > 5000) return 650 - 250;
        if (ratio > 1000) return 650 - 150;
        return 650 - 50;
      }
    }
  }

  if (scale === "Text") return 50 + 50;
  if (scale === "Concept") return 50 + 100;
  return 50 + 650;
};
