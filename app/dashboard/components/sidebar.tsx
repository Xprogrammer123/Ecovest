import { Home, Compass, BarChart2, Globe2, User } from "lucide-react";

const Sidebar = () => {
  const menu = [
    { name: "Overview", icon: <Home size={20} />, active: true },
    { name: "Explore", icon: <Compass size={20} /> },
    { name: "Portfolio", icon: <BarChart2 size={20} /> },
    { name: "Simulator", icon: <Globe2 size={20} /> },
    { name: "Profile", icon: <User size={20} /> },
  ];

  return (
    <aside className="w-72 bg-white rounded-2xl ml-4 h-screen flex flex-col items-center py-8 ml-6 mt-6 ">
      <h1 className="text-[#426b1f] text-2xl font-extrabold mb-10">ECOVEST</h1>

      <nav className="flex flex-col gap-4 w-full px-6">
        {menu.map((item, i) => (
          <button
            key={i}
            className={`flex items-center gap-3 text-[15px] font-medium py-3 px-4 rounded-xl transition-all duration-150 ${
              item.active
                ? "bg-base text-white"
                : "text-[#303030] hover:bg-[#edf0ed]"
            }`}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
