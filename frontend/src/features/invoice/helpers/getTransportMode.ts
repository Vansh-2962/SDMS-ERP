export const TransportMode = {
  ROAD: "ROAD",
  RAIL: "RAIL",
  AIR: "AIR",
  SHIP: "SHIP",
  COURIER: "COURIER",
} as const;

["Road", "Rail", "Air", "Ship", "Courier"];

export const getTransportMode = (transportMode: string) => {
  if (transportMode === "Road") {
    return TransportMode.ROAD;
  }
  if (transportMode === "Rail") {
    return TransportMode.RAIL;
  }
  if (transportMode === "Air") {
    return TransportMode.AIR;
  }
  if (transportMode === "Ship") {
    return TransportMode.SHIP;
  }
  if (transportMode === "Courier") {
    return TransportMode.COURIER;
  }
};
