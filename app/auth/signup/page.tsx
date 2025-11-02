"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          credentials: "include", // cookie-based auth
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullName, email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Failed to register. Please try again.");
        setLoading(false);
        return;
      }

      console.log("User registered:", data.user);
      window.location.href = `/auth/login`;
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center w-screen h-screen">
      {/* LEFT SIDE — Banner (background image stays on large screens only) */}
      <div className="login hidden lg:flex h-full flex-col justify-between p-12 w-1/2 bg-cover bg-center">
        <h1 className="font-semibold text-white text-2xl">ECOVEST</h1>
        <div>
          <h2 className="text-white mb-5 text-5xl xl:text-6xl leading-tight">
            Invest in what <br /> powers tomorrow.
          </h2>
          <p className="text-white/60 text-lg max-w-md">
            We connect you to verified impact-focused startups driving real
            change across Africa, while helping you grow your portfolio with
            purpose.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE — Form (visible on all screens) */}
      <div className="flex flex-col items-center justify-center gap-6 p-8 md:p-16 w-full lg:w-1/2 bg-white h-full">
        <div className="text-center">
          <h2 className="text-4xl md:text-4xl font-bold">
            Create an account with Ecovest
          </h2>
          <p className="text-black/50 mt-2">
            Sign up with Ecovest to access the latest investing finds
          </p>
        </div>

        <button className="border-2 max-w-md w-full justify-center items-center text-black font-medium border-base p-3 flex hover:bg-base hover:text-white transition-all duration-300 gap-2 rounded-full">
          <Image src="/google.svg" alt="google" width={24} height={24} />
          Continue with Google
        </button>

        <form
          onSubmit={handleRegister}
          className="max-w-md w-full flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-base/8 outline-0 border border-base/50 rounded-xl w-full p-3"
              placeholder="Enter your fullname..."
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-base/8 outline-0 border border-base/50 rounded-xl w-full p-3"
              placeholder="Enter your email..."
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-base/8 outline-0 border border-base/50 rounded-xl w-full p-3"
              placeholder="Enter your password..."
              required
            />
            <p className="text-sm text-gray-500">At least 8 characters</p>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="p-3 mt-4 max-w-md w-full rounded-full border-2 border-base hover:bg-transparent hover:text-black transition-all duration-300 bg-base text-white"
          >
            {loading ? <div className="loader-light"></div> : "Create Account"}
          </button>
        </form>

        <div className="text-black/50 text-center">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-base font-semibold text-base"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
