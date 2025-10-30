import { TrendingDown, TrendingUp, Disc2 } from "lucide-react";

const Recommended = () => {
  const recommendations = [
    {
      title: "Green Energy Fund",
      sdg: "SDG 13 • Climate Action",
      return: "+12.5%",
      risk: "-20%",
    },
    {
      title: "AgriCoop Cooperative",
      sdg: "SDG 8 • Decent Work",
      return: "+8.2%",
      risk: "-16%",
    },
    {
      title: "Recycling Startup",
      sdg: "SDG 12 • Responsible Consumption",
      return: "+12.5%",
      risk: "-20%",
    },
  ];

  return (
    <div className="mt-6 bg-white rounded-2xl p-8">
      <p className="text-xl font-semibold mb-4">Recommended for You</p>
      <div className="grid grid-cols-3 gap-5">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 flex flex-col justify-between shadow-sm bg-[#f8f9f8]"
          >
            <div>
              <p className="font-semibold text-[#1c1c1c] text-[17px] mb-1">
                {rec.title}
              </p>
              <p className="text-[#777] text-sm mb-4">{rec.sdg}</p>

              {/* Expected return */}
              <div className="flex items-center font-normal gap-2 mb-3">
                <div className="w-14 h-12 rounded-lg bg-white flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-base" />
                </div>
                <p className="text-[#426b1f] font-semibold ml-2">
                  {rec.return} <br />
                  <span className="text-[#8b8b8b] text-sm font-semibold">
                    Expected return
                  </span>
                </p>
              </div>

              {/* Expected risk */}
              <div className="flex items-center gap-2">
                <div className="w-14 h-12 rounded-lg bg-white flex items-center justify-center">
                  <TrendingDown className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-[#c53b3b] font-semibold">
                  {rec.risk} <br />
                  <span className="text-[#8b8b8b] text-sm font-semibold">
                    Expected risk
                  </span>
                </p>
              </div>
            </div>

            <button className="mt-6 bg-base text-white py-3 rounded-lg flex items-center justify-center space-x-2">
              <Disc2 className="w-7 h-7 text-white" />
              <span className="text-lg font-bold">Invest</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
