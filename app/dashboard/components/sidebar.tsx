"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, Compass, BarChart2, Globe2, User } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("user")?.replace(/"/g, "");
    if (storedId) {
      setUserId(storedId);
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  // 🧩 Sidebar routes now match your folder structure
  const menu = [
    {
      name: "Overview",
      icon: <Home size={22} />,
      path: (id: string) => `/dashboard/${id}`,
    },
    {
      name: "Explore",
      icon: <Compass size={22} />,
      path: (id: string) => `/dashboard/${id}/explore`,
    },
    {
      name: "Portfolio",
      icon: <BarChart2 size={22} />,
      path: (id: string) => `/dashboard/${id}/portfolio`,
    },
    {
      name: "Simulator",
      icon: <Globe2 size={22} />,
      path: (id: string) => `/dashboard/${id}/simulator`,
    },
    {
      name: "Profile",
      icon: <User size={22} />,
      path: (id: string) => `/dashboard/${id}/profile`,
    },
  ];

  const isActiveRoute = (path: string) => pathname === path;

  if (!userId) return null; // Wait for userId to load

  return (
    <>
      {/* 🖥️ Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-6 top-6 w-80 bg-white rounded-2xl h-[calc(100vh-3rem)] flex-col py-8 shadow-md overflow-y-auto">
        <h1 className="text-3xl font-extrabold mb-10 ml-10 text-base">
          ECOVEST
        </h1>

        <nav className="flex flex-col gap-4 w-full px-6">
          {menu.map((item) => {
            const fullPath = item.path(userId);
            const isActive = isActiveRoute(fullPath);

            return (
              <Link
                key={item.name}
                href={fullPath}
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
        bg-base/10 backdrop-blur-lg border-t border-white/20 shadow-2xl rounded-full z-50 mb-4 w-[95%] ml-2.5"
      >
        {menu.map((item) => {
          const fullPath = item.path(userId);
          const isActive = isActiveRoute(fullPath);

          return (
            <Link
              key={item.name}
              href={fullPath}
              className={`flex flex-col items-center text-sm font-medium transition-all duration-150 ${
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
