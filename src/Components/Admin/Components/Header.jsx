import { Search, Bell, Menu } from "lucide-react";

export default function Header({ toggleSidebar }) {
  return (
    <header className="w-full bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>

      {/* Search + Icons */}
      <div className="flex items-center gap-6">
        {/* Search box */}
        <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-xl gap-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm"
          />
        </div>

        {/* Notifications */}
        <button className="relative hover:bg-gray-100 p-2 rounded-lg">
          <Bell size={22} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
          A
        </div>
      </div>
    </header>
  );
}
