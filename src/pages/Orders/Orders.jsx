import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import { useEffect, useState } from "react";

import "./Orders.css"; // Import the CSS file

const Orders = () => {
  const [paidInvoices, setPaidInvoices] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // State for search input

  useEffect(() => {
    // Fetch data from the Invoices collection with status "Paid"
    fetch("http://localhost:5000/api/invoices?status=Paid")
      .then((response) => response.json())
      .then((data) => {
        setPaidInvoices(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        component="main"
        sx={{
          flex: 1,
          px: { xs: 2, md: 6 },
          pt: {
            xs: "calc(12px + var(--Header-height))",
            sm: "calc(12px + var(--Header-height))",
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <h1 className="text-2xl font-bold">Orders List</h1>
        </Box>

        <Box
          sx={{
            display: "flex",
            mb: 5,
            gap: 1,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "start", sm: "center" },
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="sm" />}
            sx={{ pl: 0 }}
          >
            <Link underline="none" color="neutral" href="./" aria-label="Home">
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="primary"
              href="./analytics"
              sx={{ fontSize: 12, fontWeight: 500 }}
            >
              Orders List
            </Link>
          </Breadcrumbs>
        </Box>
      </Box>
    </Box>
  );
};

export default Orders;
