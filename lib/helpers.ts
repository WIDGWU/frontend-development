export function deriveAcademicYears(termCodes: string[]) {
  const years = new Set<number>();

  termCodes.forEach(code => {
    const year = parseInt(code.slice(0, 4), 10);
    const term = code.slice(4);

    // academic year start logic
    const academicYearStart = term === "03" ? year : year - 1;

    years.add(academicYearStart);
  });

  return Array.from(years)
    .sort((a, b) => b - a) // descending order
    .map(startYear => ({
      year: startYear,
      academicYear: `${startYear} - ${startYear + 1}`
    }));
}

export function getFiveYearRanges(termCodes: string[]) {
  // Step 1: compute academic-year start years from term codes
  const academicYearStarts = new Set<number>();

  termCodes.forEach(code => {
    const year = parseInt(code.slice(0, 4), 10);
    const term = code.slice(4);

    const start = term === "03" ? year : year - 1;
    academicYearStarts.add(start);
  });

  // Step 2: find the most recent academic year
  const sortedStarts = Array.from(academicYearStarts).sort((a, b) => b - a);
  const mostRecent = sortedStarts[0];

  // Step 3: produce 5 descending ranges
  const ranges = [];
  for (let i = 0; i < 10; i++) {
    const startYear = mostRecent - i;
    ranges.push({
      startYear,
      range: `${startYear} - ${startYear - 4}`,
    });
  }

  return ranges;
}
