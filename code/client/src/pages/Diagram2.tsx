import { ReactFlow, Background, Node } from "@xyflow/react"
import FunctionIcon from "../components/Icon";
import { ViewportPortal } from "@xyflow/react";
import Header from "../components/Header";

import Sidebar from "../components/Sidebar";
import { ZoomSlider } from "../components/ZoomSlider";

const Diagram2=()=> {

    const nodes:Node[]=[
        {
            id:"1",
            data: {label:"Node 1 1",showEdges:true},
            position: {x:1,y:1}
        },
        {
            id:"2",
            data: {label:"Node -1 1",showEdges:true},
            position: {x:-1,y:1}
        },
        {
            id:"3",
            data: {label:"Node -1 -1",showEdges:true},
            position: {x:-1,y:-1}
        },
        {
            id:"1",
            data: {label:"Node 1 -1",showEdges:true},
            position: {x:1,y:-1}
        },
    ]

    const generateYears = () => {
        const years = [];
        for (let year = 2004; year <= 2025; year++) {
          years.push(year);
        }
        return years;
      };

      const doctype = [
        "Text",
        "Concept",
        "Plan 1:100,000",
        "Plan 1:10,000",
        "Plan 1:5,000",
        "Plan 1:1,000",
        "Blueprint/actions",
      ];

    return(
        <div style={{width:"2560px",height:"500px"}}>
            <ReactFlow
            nodes={[]}
            edges={[]}
            nodeTypes={{icon:FunctionIcon}}
            connectionLineStyle={{ stroke: "rgb(0, 0, 0)", strokeWidth: 2 }}
            zoomOnScroll={false}
            zoomOnPinch={true}
            panOnDrag={true}
            panOnScroll={true}
            preventScrolling={false}
            translateExtent={[
                [0,0],
                [2560,800]
            ]}
            >                    
            <Background/>
            <ViewportPortal>
                <Header generateYears={generateYears} style={{ transform: 'translate(1000px, 0px)', position: 'absolute' }}/>
                <Sidebar doctype={doctype}></Sidebar>
                <ZoomSlider style={{ transform: 'translate(1000px, 0px)', position: 'absolute' }}/>
            </ViewportPortal>
                </ReactFlow>
        

        <h1>Sotto diagramma</h1>
        </div>
    )
}

export default Diagram2