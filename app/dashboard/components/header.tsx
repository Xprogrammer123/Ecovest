"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-3 pt-2 mb-5 relative">
      <div>
        <p className="text-3xl font-bold text-[#1c1c1c]">Overview</p>
        <p className="text-lg">Your portfolio and impact updates are ready.</p>
      </div>

      {/* Profile section with dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 bg-white py-1.5 px-2 rounded-full focus:outline-none pr-5"
        >
          <div className="rounded-full flex items-center justify-center text-white text-sm font-bold">
            <Image
              src="/dp.svg"
              alt="dp"
              width={40}
              height={40}
              className="object-cover rounded-full"
            />
          </div>
          <div className="text-left">
            <p className="text-sm text-[#888]">Welcome back</p>
            <p className="font-semibold text-[#1c1c1c]">Judah Oyedele</p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown menu */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-10">
            <ul className="text-sm text-[#1c1c1c]">
              <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer rounded-t-xl">
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer rounded-b-xl">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
