import React from "react";
import { useSidebar } from "../../components/SidebarContext";
import "../style.css";

const UrbanPlanner: React.FC = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className={`main-page ${isSidebarOpen ? "sidebar-open" : ""}`}></div>
  );
};

export default UrbanPlanner;
