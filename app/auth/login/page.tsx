"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        credentials: "include", // sends cookie automatically
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      // ✅ Logged in successfully
      console.log("User:", data.user);

      // Example redirect after login:
      window.location.href = `/dashboard/${data.user.id}`;
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-screen h-screen">
      {/* LEFT SIDE */}
      <div className="login h-full flex flex-col justify-between p-12 w-full md:w-[75%] bg-transparent">
        <h1 className="font-semibold text-white text-2xl">ECOVEST</h1>
        <div>
          <h2 className="text-white mb-5 text-5xl md:text-6xl">
            Invest in what <br /> powers tomorrow.
          </h2>
          <p className="text-white/50">
            We connect you to verified impact-focused startups driving real
            change across Africa, while helping you grow your portfolio with
            purpose.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="h-full items-center gap-5 justify-center p-10 md:p-24 flex-col flex w-full bg-white">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl">Welcome Back</h2>
          <p className="text-black/50">
            Enter your email and password to continue.
          </p>
        </div>

        <button className="border-2 max-w-md w-full justify-center items-center text-black font-medium border-base p-3 flex hover:bg-base hover:text-white transition-all duration-300 gap-2 rounded-full">
          <Image
            src="/google.svg"
            alt="google"
            width={24}
            height={24}
            className=""
          />
          Continue with Google
        </button>

        <form
          onSubmit={handleLogin}
          className="max-w-md w-full flex flex-col gap-5"
        >
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
            <p className="text-base">At least 8 characters</p>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="p-3 mt-4 max-w-md w-full rounded-full border-2 border-base hover:bg-transparent hover:text-black justify-center items-center transition-all duration-300 bg-base text-white"
          >
            {loading ? <div className="loader-light"></div> : "Login"}
          </button>
        </form>

        <div className="text-black/50">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-base font-semibold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
