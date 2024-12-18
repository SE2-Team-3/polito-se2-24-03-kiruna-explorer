import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import API from "../../API/API";
import { Button, Col, Row } from "react-bootstrap";
import { iconMap, colorMap } from "./Icon";
import Logo from "../../assets/icons/logo.svg";

interface LegendProps {
  isLegendVisible: boolean;
  setIsLegendVisible: Dispatch<SetStateAction<boolean>>;
}

const edgeTypes: string[] = [
  "direct consequence",
  "collateral consequence",
  "prevision",
  "update",
];

const Legend: FC<LegendProps> = ({ isLegendVisible, setIsLegendVisible }) => {
  const [stakeholdersList, setStakeholdersList] = useState<string[]>([]);
  const [nodeTypesList, setNodeTypesList] = useState<string[]>([]);

  useEffect(() => {
    async function init() {
      try {
        const stakeholders = await API.getStakeholders();
        const nodeTypes = await API.getNodeTypes();

        setStakeholdersList(stakeholders);
        setNodeTypesList(nodeTypes);
      } catch (error) {
        console.error("Error fetching legend data:", error);
      }
    }
    init();
  }, []);

  return (
    <div className={`legend-popup ${isLegendVisible ? "visible" : ""}`}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Legend</h3>
        {/* Close Button */}
        <Button
          variant="outline-danger"
          onClick={() => setIsLegendVisible(false)}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>

      {/* Stakeholders */}
      <div className="filter-group">
        <h6>Stakeholders</h6>
        <Row>
          {stakeholdersList.map((stakeholder, index) => (
            <Col
              key={index}
              xs={12}
              style={{
                display: "flex",
                alignItems: "left",
              }}
            >
              <div
                style={{
                  backgroundColor: colorMap[stakeholder] || "#000",
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                  borderRadius: "5px",
                }}
              ></div>
              <span>{stakeholder}</span>
            </Col>
          ))}
        </Row>
      </div>

      {/* Node Type */}
      <div className="filter-group">
        <h6>Node Types</h6>
        <Row>
          {nodeTypesList.map((nodeType, index) => (
            <Col key={index} xs={12}>
              <img
                src={iconMap[nodeType] || Logo}
                alt={`${nodeType} icon`}
                style={{ marginRight: "10px", width: "20px", height: "20px" }}
              ></img>
              <span>{nodeType}</span>
            </Col>
          ))}
        </Row>
      </div>
      {/* Connection Type */}
      <div className="filter-group">
        <h6>Connection Types</h6>
        <Row>
          {edgeTypes.map((edgeType, index) => {
            let strokeDasharray = "";
            switch (edgeType) {
              case "direct consequence":
                strokeDasharray = "0"; // Solid line
                break;
              case "collateral consequence":
                strokeDasharray = "5,5"; // Dashed line
                break;
              case "prevision":
                strokeDasharray = "2,2"; // Dotted line
                break;
              case "update":
                strokeDasharray = "10,5,2,5"; // Dash-dot pattern
                break;
              default:
                strokeDasharray = "0";
            }

            return (
              <Col
                key={index}
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                {/* SVG Line */}
                <svg width="35" height="10" style={{ marginRight: "5px" }}>
                  <line
                    x1="0"
                    y1="5"
                    x2="40"
                    y2="5"
                    stroke="black"
                    strokeWidth="3"
                    strokeDasharray={strokeDasharray}
                  />
                </svg>
                <span>{edgeType}</span>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Legend;
