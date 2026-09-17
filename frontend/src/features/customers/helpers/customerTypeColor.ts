export const getColor = (type: string) => {
  if (type === "RETAILER") {
    return {
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    };
  } else if (type === "WHOLESALER") {
    return {
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    };
  } else if (type === "MODERN_TRADE") {
    return {
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    };
  } else if (type === "SUPER_STOCKIST") {
    return {
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    };
  } else if (type === "DISTRIBUTOR") {
    return {
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    };
  } else {
    return {
      color: "text-zinc-500",
      bgColor: "bg-zinc-500/10",
    };
  }
};
