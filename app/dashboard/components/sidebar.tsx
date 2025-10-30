import { Home, Compass, BarChart2, Globe2, User } from "lucide-react";

const Sidebar = () => {
  const menu = [
    { name: "Overview", icon: <Home size={22} />, active: true },
    { name: "Explore", icon: <Compass size={22} /> },
    { name: "Portfolio", icon: <BarChart2 size={22} /> },
    { name: "Simulator", icon: <Globe2 size={22} /> },
    { name: "Profile", icon: <User size={22} /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-white rounded-2xl h-screen flex-col py-8 ml-6 mt-6 shadow-md">
        <h1 className="text-3xl font-extrabold mb-10 ml-10 text-base">
          ECOVEST
        </h1>

        <nav className="flex flex-col gap-4 w-full px-6">
          {menu.map((item, i) => (
            <button
              key={i}
              className={`flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-xl transition-all duration-150 ${
                item.active
                  ? "bg-base text-white"
                  : "text-[#303030] hover:bg-[#edf0ed]"
              }`}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden flex justify-around items-center py-3 shadow-md">
        {menu.map((item, i) => (
          <button
            key={i}
            className={`flex flex-col items-center text-sm font-medium ${
              item.active ? "text-base" : "text-gray-500"
            }`}
          >
            {item.icon}
            <span className="text-xs">{item.name}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
