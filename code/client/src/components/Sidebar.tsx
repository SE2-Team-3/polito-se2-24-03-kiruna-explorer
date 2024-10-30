const Sidebar = ({ doctype }: any) => {
  return (
    <div className="diagram-sidebar">
      <table className="side-table">
        <tbody>
          {doctype.map((type: any) => (
            <tr key={type} className="side-cell">
              {type}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sidebar;
