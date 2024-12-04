
const DiagramTable = ({ yearWidths }: { yearWidths: number[] }) => {

  const doctype = [
    "Text",
    "Concept",
    "Plan 1:100,000",
    "Plan 1:10,000",
    "Plan 1:5,000",
    "Plan 1:1,000",
    "Blueprint/actions"
  ];

  const generateYears = () => {
    return Array.from({ length: 22 }, (_, index) => 2004 + index);
  };

  const sideWidth = 200

  return (
    <table
      style={{
        width: (yearWidths.reduce((acc, width) => acc + width, 0) + sideWidth) + "px", // Somma larghezze
      }}
    >
      <thead className={"diagram-header"}>
        <tr>
          <th style={{ width: `${sideWidth}px` }} className="header-cell"></th>
            {generateYears().map((year: any, index: number) => (
              <th
                key={year}
                id={`head-${year}`}
                className="header-cell"
                style={{
                  width: `${yearWidths[index]}px`,
                  whiteSpace: "nowrap",
                  padding: "10px",
                }}
              >
                {year}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {doctype.map((type: any) => (
          <tr key={type}>
            <td className="side-cell">{type}</td>
            {yearWidths.map((_, index) => {
              return <td key={`${type}${index}`} className="bg-cell"></td>
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DiagramTable;
