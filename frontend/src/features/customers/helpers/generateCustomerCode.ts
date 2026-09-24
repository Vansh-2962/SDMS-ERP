export const generateCustomeCode = (code: number): string => {
  const currentYear = new Date().getFullYear();
  const formattedCode = code.toString().padStart(3, "0");

  return `CU/${currentYear}/${formattedCode}`;
};
