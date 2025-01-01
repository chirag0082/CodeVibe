const formatINRForPDF = (amount) => {
  const parsNumber = Number(amount);
  if (typeof parsNumber !== "number" || parsNumber === 0.0) return "Rs. 0.00";

  const formattedNumber = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parsNumber);
  return `Rs. ${formattedNumber}`;
};

export default formatINRForPDF;
