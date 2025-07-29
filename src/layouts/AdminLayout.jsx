import {useState} from "react";
import {Outlet, NavLink, Link} from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import {showConfirmAlertLogout} from "../utils/swetAlert";

const menuItems = [
  {name: "Dashboard", to: "/admin", icon: <FaTachometerAlt />},
  {name: "Add Seminar", to: "/admin/add", icon: <FaPlusCircle />},
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white flex flex-col transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-slate-600">
          {!collapsed && (
            <h1 className="text-2xl font-extrabold tracking-wide select-none">
              Admin Panel
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-gray-700 transition"
            aria-label="Toggle sidebar"
          >
            <FaBars size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col flex-1 mt-6 space-y-1 px-2">
          {menuItems.map(({name, to, icon}) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({isActive}) =>
                `group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors
                 ${
                   isActive
                     ? "bg-gray-700 shadow-lg"
                     : "hover:bg-gray-800 hover:shadow-sm"
                 }`
              }
            >
              <span className="text-lg">{icon}</span>
              {!collapsed && <span>{name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto px-4 py-4 border-t border-gray-700">
          <Link
            to="/register"
            onClick={() => showConfirmAlertLogout("Yakin ingin logout?")}
            className="group w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-red-800 transition-colors"
          >
            <FaSignOutAlt size={18} />
            {!collapsed && <span>Logout</span>}
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
