const Header = ({
  generateYears,
  yearWidths,
  classname,
}: {
  generateYears: any;
  yearWidths: number[];
  classname: any;
}) => {
  if (!generateYears) {
    generateYears = () => {
      return Array.from({ length: 22 }, (_, index) => 2004 + index);
    };
  }

  return (
    <table
      className={`header-table ${classname ? classname : ""}`}
      style={{
        width: yearWidths.reduce((acc, width) => acc + width, 0) + "px", // Somma larghezze
      }}
    >
      <thead>
        <tr>
          {generateYears().map((year: any, index: number) => (
            <th
              key={year}
              id={`head-${year}`}
              className="header-cell"
              style={{
                width: `${yearWidths[index]}px`,
                whiteSpace: "nowrap",
              }}
            >
              {year}
            </th>
          ))}
        </tr>
      </thead>
    </table>
  );
};

export default Header;
