"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Header = ({userName} : {userName: string}) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-3 mb-5 relative bg-transparent">
      {/* Title and subtitle */}
      <div className="text-center sm:text-left mb-3 sm:mb-0">
        <p className="text-2xl sm:text-3xl font-bold text-[#1c1c1c]">
          Overview
        </p>
        <p className="text-sm sm:text-lg text-gray-600">
          Your portfolio and impact updates are ready.
        </p>
      </div>

      {/* Profile section with dropdown */}
      <div className="relative flex justify-center sm:justify-end">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 sm:gap-3 bg-white py-1.5 px-3 sm:px-4 rounded-full focus:outline-none shadow-sm hover:shadow transition-all duration-200"
        >
          <Image
            src="/dp.svg"
            alt="dp"
            width={38}
            height={38}
            className="object-cover rounded-full"
          />

          {/* Hide text on very small screens */}
          <div className="hidden xs:block text-left">
            <p className="text-[12px] sm:text-sm text-[#888]">Welcome back</p>
            <p className="text-sm sm:text-base font-semibold text-[#1c1c1c]">
              {userName}
            </p>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-10">
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
