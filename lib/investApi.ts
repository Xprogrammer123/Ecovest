export const investApi = {
  simulate: async (recommendation: any, amount: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/invest/simulate`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recommendation, amount }),
      }
    );
    if (!res.ok) throw new Error("Failed to simulate investment");
    return await res.json();
  },

  create: async (recommendation: any, amount: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invest`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recommendation, amount }),
    });
    if (!res.ok) throw new Error("Failed to create investment");
    return await res.json();
  },

  addFunds: async (investmentId: string, amount: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/invest/add`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ investmentId, amount }),
      }
    );
    if (!res.ok) throw new Error("Failed to top up investment");
    return await res.json();
  },

  sellPartial: async (
    investmentId: string,
    amount?: number,
    percent?: number
  ) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/invest/sell`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ investmentId, amount, percent }),
      }
    );
    if (!res.ok) throw new Error("Failed to sell investment");
    return await res.json();
  },

  sellAll: async (investmentId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/invest/drop`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ investmentId }),
      }
    );
    if (!res.ok) throw new Error("Failed to drop investment");
    return await res.json();
  },
};
