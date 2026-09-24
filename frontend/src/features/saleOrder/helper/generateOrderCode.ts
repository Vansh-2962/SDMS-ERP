export const generateSaleOrderCode = (code: number): string => {
  const currentYear = new Date().getFullYear();
  const formattedCode = code.toString().padStart(3, "0");

  return `SO/${currentYear}/${formattedCode}`;
};
