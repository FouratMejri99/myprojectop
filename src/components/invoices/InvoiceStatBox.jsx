import Box from "@mui/joy/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

const InvoiceStatBox = ({ icon, label, fetchData, color }) => {
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const { count: newCount, amount: newAmount } = await fetchData();
        setCount(newCount);
        setAmount(newAmount);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
        // Optionally, you can set some error states here if needed
      }
    };

    fetchInvoiceData();
  }, [fetchData]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderRight: "1px solid rgba(255,255,255,0.5)",
        pr: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: `2px solid ${color}`,
          mr: 2,
        }}
      >
        {React.cloneElement(icon, { fontSize: "large", sx: { color } })}
      </Box>
      <Box>
        <Typography variant="h6">{label}</Typography>
        <Typography variant="body1" color="grey">
          {count} Invoices
        </Typography>
        <Typography variant="h6">
          {typeof amount === "number" && !isNaN(amount)
            ? `$${amount.toFixed(2)}`
            : "$0.00"}
        </Typography>
      </Box>
    </Box>
  );
};

export default InvoiceStatBox;
