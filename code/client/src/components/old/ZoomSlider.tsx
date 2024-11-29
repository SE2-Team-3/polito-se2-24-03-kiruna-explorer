"use client";
 
import * as React from "react";
import { Maximize, Minus, Plus } from "lucide-react";
 
import {
  Panel,
  useViewport,
  useStore,
  useReactFlow,
  PanelProps,
} from "@xyflow/react";
 
import { Slider } from "@radix-ui/react-slider";
 
const ZoomSlider = React.forwardRef<
  HTMLDivElement,
  Omit<PanelProps, "children">
>(({ className, ...props }) => {
  const { zoom } = useViewport();
  const { zoomTo, zoomIn, zoomOut, fitView } = useReactFlow();
 
  const { minZoom, maxZoom } = useStore(
    (state) => ({
      minZoom: state.minZoom,
      maxZoom: state.maxZoom,
    }),
    (a, b) => a.minZoom !== b.minZoom || a.maxZoom !== b.maxZoom,
  );
 
  return (
    <Panel
      className={"flex bg-primary-foreground text-foreground"}
      {...props}
    >
      <Slider
        className="w-[140px]"
        value={[zoom]}
        min={minZoom}
        max={maxZoom}
        step={0.01}
        onValueChange={(values) => zoomTo(values[0])}
      />
    </Panel>
  );
});
 
ZoomSlider.displayName = "ZoomSlider";
 
export { ZoomSlider };