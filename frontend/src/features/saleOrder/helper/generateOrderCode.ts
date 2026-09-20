export const generateSaleOrderCode = (code: number): string => {
  const currentYear = new Date().getFullYear();
  const formattedCode = code.toString().padStart(4, "0");

  return `SO/${currentYear}/${formattedCode}`;
};
