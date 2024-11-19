import { ReactFlow, Node, Edge } from "@xyflow/react"
import { ViewportPortal } from "@xyflow/react";
import Header from "../components/Header";

import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useCallback } from "react";
import { applyNodeChanges } from "@xyflow/react";
import FunctionIcon from "../components/Icon";
import { addEdge, Connection } from "react-flow-renderer";

const nodeTypes={icon:FunctionIcon}

const initialNodes:Node[]=[
    {
        id:"1",
        data: {label:"Node 100 100",showEdges:true},
        position: {x:100,y:100}
    },
    {
        id:"2",
        data: {label:"Node 100 200",showEdges:true},
        position: {x:100,y:200}
    },
    {
        id:"3",
        data: {label:"Node 200 300",showEdges:true},
        position: {x:200,y:300}
    },
]

const initialEdges:Edge[]=[]

const Diagram2=()=> {

    const [nodes,setNodes]=useState<Node[]>(initialNodes)
    const [edges,setEdges]=useState<Edge[]>(initialEdges)

    const onNodesChange = useCallback(
        (changes: any) => {
          const updatedNodes = applyNodeChanges(changes, nodes);
          setNodes(updatedNodes);
        },
        [nodes]
    );

    const onConnect = useCallback(
        (connection: Connection) => {
          setEdges((eds) => addEdge(connection, eds));
        },
        [nodes]
    );

    return(
        <div style={{width:"2560px",height:"500px"}}>
            <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={{icon:FunctionIcon}}
            connectionLineStyle={{ stroke: "rgb(0, 0, 0)", strokeWidth: 2 }}
            zoomOnScroll={false}
            zoomOnPinch={true}
            panOnDrag={true}
            panOnScroll={true}
            preventScrolling={false}
            onNodesChange={onNodesChange}
            onConnect={onConnect}
            translateExtent={[
                [0,0],
                [2560,800]
            ]}
            >                    
            <ViewportPortal>
                <Header generateYears={null} classname="header-trans"/>
                <Sidebar doctype={null} classname="sidebar-trans"/>
                <h1 className="point-trans">+</h1>
            </ViewportPortal>
                </ReactFlow>
        

        <h1>Sotto diagramma</h1>
        </div>
    )
}

export default Diagram2