import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

import { useState } from "react";

export default function Sidebar({ activeTab, setActiveTab }) {
  const [open, setOpen] = useState(true);

  const menu = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "subjects", icon: BookOpen, label: "Subjects" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "schedule", icon: Calendar, label: "Schedule" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div
      className={`h-screen bg-white shadow-xl border-r transition-all duration-300
        ${open ? "w-64" : "w-20"}
      `}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between p-5 border-b">
        <div className="flex items-center gap-3">
          <GraduationCap className="text-indigo-600" size={30} />
          {open && <h1 className="font-bold text-xl text-gray-800">GradePro</h1>}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Menu */}
      <div className="mt-5 flex flex-col gap-1 px-3">
        {menu.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer select-none text-gray-700
              transition-all duration-200
              ${
                activeTab === item.id
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <item.icon size={20} />
            {open && <span className="font-medium">{item.label}</span>}
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="absolute bottom-6 w-full px-3">
        <div className="flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer hover:bg-red-100 text-red-600">
          <LogOut size={20} />
          {open && <span className="font-medium">Logout</span>}
        </div>
      </div>
    </div>
  );
}
