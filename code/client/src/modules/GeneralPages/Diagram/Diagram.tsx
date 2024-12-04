
import { useState, useCallback } from "react";
import { useSidebar } from "../../../components/SidebarContext";
import { useNavigate } from "react-router-dom";
import { ViewportPortal, ReactFlow, addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import DiagramTable from "../../../components/diagramComponents/DiagramTable";
import { nodeTypes, edgeTypes } from "../../../components/diagramComponents/utils/nodeAndEdgeTypes";
import EdgePopup from "../../../components/diagramComponents/EdgePopup";

const Diagram = (props: any) => {

    const setNodes = props.setNodes
    const setEdges = props.setEdges
    const scrollWidth = props.scrollWidth
    const nodes = props.nodes
    const edges = props.edges
    const yearWidths = props.yearWidths

    const scrollHeight=750 > document.documentElement.clientHeight - 100 ? document.documentElement.clientHeight - 100 : 750

    const navigate = useNavigate();
    const [popupVisible, setPopupVisible] = useState(false);
    const [linkTypesForPopup, setLinkTypesForPopup] = useState<string[]>([]);
    const { isSidebarOpen } = useSidebar();

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
        []
    );

    const onConnect = useCallback(
        (params: any) => setEdges((eds: any) => addEdge(params, eds)),
        []
    );

    const onEdgeClick = useCallback((event: any, edge: any) => {
        if (edge?.type === "default" && edge?.data?.linkTypes) {
            setLinkTypesForPopup(edge.data.linkTypes);
            setPopupVisible(true);
        }
    }, []);

    const closePopup = () => {
        setPopupVisible(false);
    };

    const handleNodeClick = (nodeId: string) => {
        navigate(`/documents/${nodeId}`);
    };

    return (
        <div className={`diagram-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
            <div style={{
                width: scrollWidth + "px",
                height: scrollHeight + "px", border: "none"
            }}
                className="diagram-svg-fix">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    connectionLineStyle={{ stroke: "rgb(0, 0, 0)", strokeWidth: 2 }}
                    panOnDrag={true}
                    panOnScroll={true}
                    preventScrolling={false}
                    onConnect={onConnect}
                    defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                    translateExtent={[
                        [0, 0],
                        [yearWidths.reduce((partialSum: number, a: number) => partialSum + a, 200), 750]
                    ]}
                    nodeExtent={[
                        [200,50],
                        [+Infinity, 750]
                    ]}
                    minZoom={1}
                    onEdgeClick={onEdgeClick}
                    onNodeClick={(event, node) => handleNodeClick(node.id)}
                    nodesDraggable={true}
                >
                    {popupVisible && (
                        <EdgePopup linkTypes={linkTypesForPopup} onClose={closePopup} />
                    )}

                    <ViewportPortal>
                        <DiagramTable yearWidths={yearWidths} />
                    </ViewportPortal>
                </ReactFlow>
            </div>
        </div>
    );
}

export default Diagram