import { useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("predictor");

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      <Sidebar
        sidebarOpen={sidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <div className="p-8 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
