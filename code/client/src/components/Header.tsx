const Header = ({ generateYears }: any) => {
  return (
    <table className="header-table">
      <tbody>
        <tr>
          {generateYears().map((year: any) => (
            <td key={year} className="header-cell">
              {year}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Header;
