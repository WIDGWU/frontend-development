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
