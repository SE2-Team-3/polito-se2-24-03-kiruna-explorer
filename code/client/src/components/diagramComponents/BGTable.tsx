function BGTable({ yearWidths }: { yearWidths: number[] }) {
  console.log(yearWidths.reduce((acc, width) => acc + width, 0));
  return (
    <table
      style={{
        transform: "translate(200px,50px)",
        position: "absolute",
        zIndex: 1,
        width: yearWidths.reduce((acc, width) => acc + width, 0) + "px", // Somma larghezze
      }}
    >
      <tbody>
        {Array(7)
          .fill(null)
          .map((_, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                height: "100px",
                borderBottom: "dashed 1px",
              }}
            >
              {yearWidths.map((width, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    width: `${width}px`, // Usa la larghezza da yearWidths
                    borderRight: "dashed 1px",
                  }}
                ></td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default BGTable;
