"use client";
import React, { useState } from "react";

interface Recommendation {
  name: string;
  sector: string;
  description: string;
  expected_return_percent: string;
  duration: string;
  risk_level: string;
  minimum_investment: number;
  sustainability_score: number;
  why_it_fits_user: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recommendation: Recommendation;
  index: number;
  onSuccess?: () => void;
}

const InvestmentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  recommendation,
  index,
  onSuccess,
}) => {
  const [amount, setAmount] = useState(recommendation.minimum_investment);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleInvest = async () => {
    if (amount < recommendation.minimum_investment) {
      alert(`Minimum investment is ₦${recommendation.minimum_investment.toLocaleString()}`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // sends cookies like `-b cookies.txt`
        body: JSON.stringify({
          recommendationIndex: index,
          amount,
        }),
      });

      // Safely parse JSON (handles empty responses)
      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        const message = data?.message || `Investment failed (${res.status})`;
        throw new Error(message);
      }

      alert("Investment successful!");
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error("Investment error:", error);
      alert(error.message || "Investment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-1">{recommendation.name}</h2>
        <p className="text-gray-500 text-sm mb-3">{recommendation.sector}</p>
        <p className="text-gray-700 text-sm mb-4">{recommendation.description}</p>

        <div className="text-sm space-y-1 mb-4">
          <p><span className="font-semibold">Expected Return:</span> {recommendation.expected_return_percent}%</p>
          <p><span className="font-semibold">Duration:</span> {recommendation.duration}</p>
          <p><span className="font-semibold">Risk Level:</span> {recommendation.risk_level}</p>
          <p><span className="font-semibold">Sustainability:</span> {recommendation.sustainability_score}/100</p>
          <p><span className="font-semibold">Minimum Investment:</span> ₦{recommendation.minimum_investment.toLocaleString()}</p>
        </div>

        <input
          type="number"
          min={recommendation.minimum_investment}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-base/60"
        />

        <button
          onClick={handleInvest}
          disabled={loading}
          className="w-full bg-base text-white py-3 rounded-lg hover:opacity-90 transition"
        >
          {loading ? "Processing..." : `Invest ₦${amount.toLocaleString()}`}
        </button>
      </div>
    </div>
  );
};

export default InvestmentModal;
