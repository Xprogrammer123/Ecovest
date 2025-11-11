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
  onInvest?: (amount: number) => void;
}

const InvestmentModal: React.FC<Props> = ({ isOpen, onClose, recommendation, onInvest }) => {
  const [amount, setAmount] = useState(recommendation.minimum_investment);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleInvestClick = async () => {
    if (amount < recommendation.minimum_investment) {
      alert(`Minimum investment is ₦${recommendation.minimum_investment.toLocaleString()}`);
      return;
    }

    setLoading(true);
    try {
      await onInvest?.(amount);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Investment failed. Please try again.");
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

        <h2 className="text-lg font-semibold mb-2">{recommendation.name}</h2>
        <p className="text-gray-500 text-sm mb-2">{recommendation.sector}</p>
        <p className="text-black text-sm mb-4">{recommendation.description}</p>

        <div className="flex justify-between mb-4 text-sm">
          <span>Expected Return: {recommendation.expected_return_percent}%</span>
          <span>Duration: {recommendation.duration}</span>
        </div>
        <div className="flex justify-between mb-4 text-sm">
          <span>Risk Level: {recommendation.risk_level}</span>
          <span>Sustainability: {recommendation.sustainability_score}/100</span>
        </div>
        <p className="text-sm mb-4">
          Minimum Investment: ₦{recommendation.minimum_investment.toLocaleString()}
        </p>

        <input
          type="number"
          min={recommendation.minimum_investment}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-base/60"
        />

        <button
          onClick={handleInvestClick}
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
