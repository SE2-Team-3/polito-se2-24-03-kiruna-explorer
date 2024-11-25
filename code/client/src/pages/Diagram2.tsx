import { ReactFlow, Node, Edge, Position } from "@xyflow/react"
import { ViewportPortal } from "@xyflow/react";
import Header from "../components/Header";

import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import FunctionIcon from "../components/Icon";
import { addEdge } from "@xyflow/react";
import '@xyflow/react/dist/style.css';

const xPosCalculator=(date:string)=>{
    let month=0, day=0
    const year=parseInt(date.slice(0,4))-2004
    if (date.length>=6) month=parseInt(date.split('-')[1])-1
    if (date.length>=8) day=parseInt(date.split('-')[2])-1
    return 200+year*200+(month*200/12)+(day*200/12/30)
}

const yPosCalculator=(scale:string)=>{
    const isPlan=new RegExp("^[0-9]*$")

    //650 floor 250 ceiling
    if (isPlan.test(scale)) {
        const s=parseInt(scale)
        if (s>100000) return 650-400
        if (s>10000) return 650-350
        if (s>5000) return 650-250
        if (s>1000) return 650-150
        return 650-50
    }

    if (scale==="Text") return 50+50
    if (scale==="Concept") return 50+100
    return 50+650
}

const nodeTypes = { icon: FunctionIcon }

const initialNodes:Node[]=[
    {
        id:"n1",
        data: {label:"1",showEdges:true},
        width:30,
        position: {x:xPosCalculator("2004"),y:yPosCalculator("Text")},
    },
    {
        id:"n2",
        data: {label:"2",showEdges:true},
        width:30,
        position: {x:xPosCalculator("2012-07"),y:yPosCalculator("4000")}
    },
    {
        id:"n3",
        data: {label:"3",showEdges:true},
        width:30,
        position: {x:xPosCalculator("2009-03-28"),y:yPosCalculator("Concept")}
    },
]

const initialEdges:Edge[]=[
    {
        id:"e-n1-n2",
        source: "n1",
        target: "n2"
    }
]

const Diagram2=()=> {

    const [nodes,setNodes]=useState<Node[]>(initialNodes)
    const [edges,setEdges]=useState<Edge[]>(initialEdges)

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );

    const onEdgesChange = useCallback(
        (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    return(
        <>
            <h1>Sopra diagramma</h1>
            <div style={{width:"100vw",height:"50vh",border:"solid 1px green"}}>
                <div style={{height:"100%"}}>
                    <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    connectionLineStyle={{ stroke: "rgb(0, 0, 0)", strokeWidth: 2 }}
                    panOnDrag={true}
                    panOnScroll={true}
                    preventScrolling={false}
                    onConnect={onConnect}
                    translateExtent={[
                        [0,0],
                        [5000,800]
                    ]}
                    minZoom={1}
                    >                    
                        <ViewportPortal>
                            <Header generateYears={null} classname="header-trans"/>
                            <Sidebar doctype={null} classname="sidebar-trans"/>

                            <h1 className="point-trans">T</h1>
                            <h2 style={{transform:`translate(${xPosCalculator("2004-06")}px,${yPosCalculator("Blueprint")}px)`,position:"absolute"}}>Prova</h2>
                        </ViewportPortal>
                    </ReactFlow>
                

                </div>

            <h1>Sotto diagramma</h1>
            </div>
        </>
    )
}

export default Diagram2