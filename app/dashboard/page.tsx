import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Recommended from "./components/recommended";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#f8f9f8]">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Header />

        {/* Portfolio section */}
        <div className="mt-6 grid grid-cols-3 gap-5">
          <div className="col-span-2 bg-[#1b1b1b] text-white rounded-2xl p-6 relative overflow-hidden">
            <p className="text-sm text-[#bfbfbf]">Portfolio value</p>
            <h1 className="text-[40px] font-bold mt-1">₦3,725,020</h1>
            <p className="mt-3 text-[#bfbfbf]">
              ₦125k today <span className="text-green-400">+12.3%</span> this
              month
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between mb-4">
              <p className="font-medium text-sm">Predicted Growth (6 mo)</p>
              <span className="text-green-600 font-semibold">+5.8%</span>
            </div>
            <div className="flex justify-between mb-4">
              <p className="font-medium text-sm">Sustainability Score</p>
              <span className="font-semibold text-[#1c1c1c]">85/100</span>
            </div>
            <p className="text-[#8b8b8b] text-sm mb-3">
              Excellent alignment with SDG goals
            </p>
            <div className="flex gap-3">
              <button className="bg-[#e6ede7] text-[#1c1c1c] py-2 px-4 rounded-lg font-medium w-1/2">
                Simulate
              </button>
              <button className="bg-[#426b1f] text-white py-2 px-4 rounded-lg font-medium w-1/2">
                Invest
              </button>
            </div>
          </div>
        </div>

        {/* Placeholder for chart and impact */}
        <div className="mt-6 bg-white p-5 rounded-2xl shadow-sm">
          <p className="font-medium text-sm mb-2">Monthly Performance</p>
          <div className="h-40 border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
            (Chart here)
          </div>
        </div>

        <div className="mt-6 bg-white p-5 rounded-2xl shadow-sm">
          <p className="flex items-center gap-2 text-sm">
            🌱 Your portfolio has offset <b>5 tons</b> of CO₂, and supported{" "}
            <b>2 renewable energy projects</b>.
          </p>
        </div>

        <Recommended />
      </main>
    </div>
  );
};

export default Dashboard;
