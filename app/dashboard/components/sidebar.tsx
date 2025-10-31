"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, BarChart2, Globe2, User } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menu = [
    { name: "Overview", icon: <Home size={22} />, path: "/dashboard" },
    { name: "Explore", icon: <Compass size={22} />, path: "/explore" },
    { name: "Portfolio", icon: <BarChart2 size={22} />, path: "/portfolio" },
    { name: "Simulator", icon: <Globe2 size={22} />, path: "/simulator" },
    { name: "Profile", icon: <User size={22} />, path: "/profile" },
  ];

  return (
    <>
      {/* 🖥️ Desktop Sidebar */}
      <aside className="hidden md:flex w-80 bg-white rounded-2xl h-screen flex-col py-8 ml-6 mt-6 shadow-md">
        <h1 className="text-3xl font-extrabold mb-10 ml-10 text-base">
          ECOVEST
        </h1>

        <nav className="flex flex-col gap-4 w-full px-6">
          {menu.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-xl transition-all duration-150 ${
                  isActive
                    ? "bg-base text-white"
                    : "text-black hover:bg-base/20"
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div
        className="fixed bottom-0 left-0 right-0 md:hidden flex justify-around items-center py-3 
        bg-base/10 backdrop-blur-lg border-t border-white/20 shadow-2xl rounded-full z-99 mb-4"
      >
        {menu.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center text-sm font-medium transition-all duration-150  ${
                isActive
                  ? "text-base font-semibold"
                  : "text-black hover:text-base"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
