"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Onboard = () => {
  const [income, setIncome] = useState(50000);
  const [goal, setGoal] = useState<string | null>(null);
  const [risk, setRisk] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleFinish = () => {
    if (!goal || !risk) {
      setError("Please select your goal and risk level before proceeding.");
      return;
    }
    setError(null);
    setShowModal(true);
  };

  const handleContinue = () => {
    const userPlan = { income, goal, risk };
    console.log("User plan:", userPlan);
    setShowModal(false);
    router.push("/dashboard");
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const percentage = ((income - 50000) / (1000000 - 50000)) * 100;

  return (
    <div className="flex justify-center w-screen items-center h-screen">
      {/* Left side */}
      <div className="login h-full flex flex-col justify-between p-12 w-[75%] bg-green-900 text-white">
        <h1 className="font-semibold text-2xl">ECOVEST</h1>
        <div>
          <h2 className="mb-5 text-6xl font-bold leading-tight">
            Invest in what <br /> powers tomorrow.
          </h2>
          <p className="text-white/70">
            We connect you to verified impact-focused startups driving real
            change across Africa, while helping you grow your portfolio with
            purpose.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="h-full items-center gap-1 justify-center p-24 flex-col flex w-full bg-white">
        <div className="text-center">
          <h2 className="text-5xl mb-2">Let’s personalize your plan</h2>
          <p className="text-black/50 text-lg">
            This helps us tailor realistic and impactful investment paths
          </p>
        </div>

        {/* Investment paths form */}
        <div className="w-full max-w-md mt-8 space-y-8">
          {/* Monthly income slider */}
          <div className="relative">
            <label className="block mb-2 font-medium text-gray-700">
              Select your monthly income
            </label>

            {/* Tooltip */}
            <div
              className="absolute -bottom-2.5 text-sm bg-base text-white px-2 py-1.5 rounded-md transform -translate-x-1/2"
              style={{
                left: `calc(${percentage}% + (${8 - percentage * 0.15}px))`,
              }}
            >
              ₦{income.toLocaleString()}
              {/* Triangle */}
              <div
                className="absolute left-1/2 -top-2 w-0 h-0 -translate-x-1/2 
                 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent 
                 border-r-transparent border-b-base"
              ></div>
            </div>

            <input
              type="range"
              min="50000"
              max="1000000"
              step="10000"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full accent-base cursor-pointer border-none border"
            />

            <div className="flex justify-between text-sm font-semibold mt-1">
              <span>50,000</span>
              <span>1,000,000</span>
            </div>
          </div>

          {/* Select your goal */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Select your goal
            </label>
            <div className="flex justify-between bg-gray-100 p-1 rounded-xl">
              {["Build wealth", "Support sustainability", "Both"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`flex-1 py-2 rounded-xl transition whitespace-nowrap ${
                    goal === g
                      ? "bg-base text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  } ${g === "Support sustainability" ? "px-4" : "px-2"}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Select your risk level */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Select your risk level
            </label>
            <div className="flex justify-between bg-gray-100 p-1 rounded-xl">
              {["Low", "Medium", "High"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRisk(r)}
                  className={`flex-1 py-2 rounded-xl transition ${
                    risk === r
                      ? "bg-base text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Finish button and error */}
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={handleFinish}
              className="w-1/3 bg-base text-white py-3 rounded-xl font-medium transition flex justify-center items-center gap-2 hover:bg-green-800"
            >
              Finish <span>→</span>
            </button>

            {error && (
              <p className="text-green-700 bg-green-100 border border-green-300 rounded-lg text-sm px-3 py-2 animate-fadeIn w-fit">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>

     
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4 text-base">
              Plan Saved Successfully
            </h2>
            <p className="text-gray-600 mb-6">
              <strong>Income:</strong> ₦{income.toLocaleString()} <br />
              <strong>Goal:</strong> {goal} <br />
              <strong>Risk:</strong> {risk}
            </p>
            <button
              onClick={handleContinue}
              className="w-full bg-base text-white py-3 rounded-xl font-medium hover:bg-green-800 transition"
            >
              Continue <span className='ml-1'>→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboard;
