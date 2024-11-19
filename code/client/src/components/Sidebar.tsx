const Sidebar = ({ doctype, classname }:{doctype:any,classname:any}) => {

  if (!doctype) {
    doctype = [
      "Text",
      "Concept",
      "Plan 1:100,000",
      "Plan 1:10,000",
      "Plan 1:5,000",
      "Plan 1:1,000",
      "Blueprint/actions",
    ];
  }

  return (
    <div className={"diagram-sidebar "+classname?classname:""}>
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
