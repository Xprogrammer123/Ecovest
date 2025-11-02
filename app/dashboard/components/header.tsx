"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Header = ({ userName }: { userName: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-4 py-3 mb-5 relative bg-transparent">
      {/* Left section: Overview text */}
      <div className="flex flex-col">
        <p className="text-2xl sm:text-3xl font-bold text-[#1c1c1c]">
          Overview
        </p>
        <p className="text-sm sm:text-lg text-gray-600">
          Your portfolio and impact updates are ready.
        </p>

        {/* Show welcome + name only on big screens */}
        <div className="hidden sm:flex items-center gap-2 mt-3">
          <Image
            src="/dp.svg"
            alt="profile"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-sm text-gray-500">Welcome back</p>
            <p className="text-base font-semibold text-[#1c1c1c]">
              {userName}
            </p>
          </div>
        </div>
      </div>

      {/* Right section: Profile (mobile) */}
      <div className="sm:hidden relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-white py-1.5 px-3 rounded-full shadow-sm hover:shadow transition-all duration-200"
        >
          <Image
            src="/dp.svg"
            alt="dp"
            width={36}
            height={36}
            className="object-cover rounded-full"
          />
          <ChevronDown
            className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown menu for mobile */}
        {open && (
          <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-100 z-10">
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
