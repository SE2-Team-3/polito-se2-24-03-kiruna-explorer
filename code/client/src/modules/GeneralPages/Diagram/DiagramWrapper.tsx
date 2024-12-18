import {
  Node,
  Edge,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../components/UserContext";
import Document from "../../../models/document";
import Connection from "../../../models/Connection";
import API from "../../../API/API";

import {
  xPosCalculator,
  yPosCalculator,
} from "../../../components/diagramComponents/utils/positionCalculators";
import { useOccupiedPositions } from "../../../components/diagramComponents/utils/positionUtils";
import Diagram from "./Diagram";
import { useParams } from "react-router-dom";

interface DiagramWrapperProps {
  searchTitle: string;
  filteredDocuments: Document[];
  setFilteredDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
  filterTableVisible: boolean;
  setFilterTableVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DiagramWrapper = (props: DiagramWrapperProps) => {
  const selectedNode = useParams().id;
  const [show, setShow] = useState<boolean>(false);
  const [initialDocs, setInitialDocs] = useState<Document[]>([]);
  const [initialConnections, setInitialConnections] = useState<Connection[]>(
    []
  );
  const [loaded, setLoaded] = useState<boolean>(false);
  const [defaultViewport, setDefaultViewport] = useState({
    x: 0,
    y: 0,
    zoom: 1,
  });
  const [nodes, setNodes] = useNodesState<Node>([]);
  const [initialNodes, setInitialNodes] = useState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [yearWidths, setYearWidths] = useState<number[]>([]);
  const [scrollWidth, setScrollWidth] = useState<number>(1);

  const { getAvailablePosition } = useOccupiedPositions();
  const user = useContext(UserContext);
  const showEdges = user ? true : false;

  useEffect(() => {
    async function getDocs() {
      const initialDocs: Document[] = await API.getDocuments();
      props.setFilteredDocuments(initialDocs);
      setInitialDocs(initialDocs);
      const initialConnections: Connection[] = await API.getConnections();

      setInitialConnections(initialConnections);
      const years = Array.from({ length: 22 }, (_, index) => 2004 + index);
      const counts: number[] = new Array(23).fill(0);
      for (const d of initialDocs) {
        if (d.issuanceDate) {
          const year = parseInt(d.issuanceDate.slice(0, 4));
          counts[year - 2004]++;
        }
      }
      const calculatedYearWidths = years.map((y) => 75 + counts[y - 2004] * 50);
      setYearWidths(calculatedYearWidths);
      let x = 200;
      for (const y of calculatedYearWidths) x += y;
      if (x < document.documentElement.clientWidth - 75) setScrollWidth(x);
      else setScrollWidth(document.documentElement.clientWidth - 75);
      setLoaded(true);
    }
    if (!loaded) getDocs();
  }, []);

  useEffect(() => {
    const loadData = () => {
      if (initialDocs.length) {
        let newNodes: Node[] = [];
        for (const d of initialDocs) {
          let { x, y } = {
            x: xPosCalculator(d.issuanceDate, yearWidths),
            y: yPosCalculator(d.scale),
          };
          const availablePosition = getAvailablePosition(x, y);
          x = availablePosition.x;
          y = availablePosition.y;

          newNodes.push({
            id: d.documentId.toString(),
            data: {
              nodeType: d.nodeType,
              stakeholder: d.stakeholders,
              showEdges: showEdges,
            },
            width: 30,
            position: { x, y },
            zIndex: 5,
            type: "icon",
          });
          if (d.documentId.toString() == selectedNode) {
            setDefaultViewport({
              x: -2 * x - 75 + document.documentElement.clientWidth / 2,
              y: -2 * y - 100 + document.documentElement.clientHeight / 2,
              zoom: 2,
            });
          }
        }

        setNodes(newNodes);
        setInitialNodes(newNodes);
      }
      if (initialConnections.length) {
        const connectionsMap: Record<string, string[]> = {};

        for (const c of initialConnections) {
          const pairKey = `${c.documentId1}-${c.documentId2}`;
          if (!connectionsMap[pairKey]) {
            connectionsMap[pairKey] = [];
          }
          connectionsMap[pairKey].push(c.connection);
        }

        let newEdges: Edge[] = [];
        for (const [pairKey, linkTypes] of Object.entries(connectionsMap)) {
          const [source, target] = pairKey.split("-");

          if (linkTypes.length === 1) {
            newEdges.push({
              id: `${source}-${target}-${linkTypes[0]}`,
              source,
              target,
              type: linkTypes[0],
              data: { linkTypes },
              zIndex: 4,
            });
          } else {
            newEdges.push({
              id: `${source}-${target}-default`,
              source,
              target,
              type: "default",
              data: { linkTypes, label: `${linkTypes.length} conn` },
              zIndex: 4,
            });
          }
        }
        setEdges(newEdges);
      }
      setShow(true);
    };
    if (loaded) loadData();
  }, [loaded]);

  return (
    show && (
      <ReactFlowProvider>
        <Diagram
          filterTableVisible={props.filterTableVisible}
          setFilterTableVisible={props.setFilterTableVisible}
          filteredDocuments={props.filteredDocuments}
          setFilteredDocuments={props.setFilteredDocuments}
          searchTitle={props.searchTitle}
          initialNodes={initialNodes}
          setNodes={setNodes}
          setEdges={setEdges}
          scrollWidth={scrollWidth}
          nodes={nodes}
          edges={edges}
          yearWidths={yearWidths}
          defaultViewport={defaultViewport}
        />
      </ReactFlowProvider>
    )
  );
};

export default DiagramWrapper;
