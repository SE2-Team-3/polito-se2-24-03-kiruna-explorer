const Header = ({ generateYears, classname }: {generateYears:any,classname:any}) => {

  if (!generateYears) {
    generateYears=()=>{
      return [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
    }
  }

  return (
    <table className={"header-table "+classname?classname:""}>
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
