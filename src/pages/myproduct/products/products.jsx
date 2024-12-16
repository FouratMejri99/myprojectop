// src/pages/products/ProductsPage.jsx

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Box from "@mui/joy/Box";
import { Breadcrumbs, Button, Container, Link } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Iconify from "../../../components/iconify";
import EnhancedTable from "../../../components/products/producttable";
import "./product.css";

export default function ProductsPage() {
  const [tableKey, setTableKey] = useState(0);
  // Function to reload the InvoicesTable
  const reloadTable = () => {
    setTableKey((prevKey) => prevKey + 1);
  };
  return (
    <Container>
      {/* Page Title */}
      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={reloadTable}
      >
        <h1 className="text-2xl font-bold">Products List</h1>
      </Box>

      {/* Breadcrumbs and New Product Button */}
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
          <Link underline="none" color="neutral" href="/" aria-label="Home">
            <HomeRoundedIcon />
          </Link>
          <Link
            underline="hover"
            color="primary"
            href="/analytics"
            sx={{ fontSize: 12, fontWeight: 500 }}
          >
            Products List
          </Link>
        </Breadcrumbs>

        {/* New Product Button */}
        <RouterLink to="/newProducts" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            className="new-product-button"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Product
          </Button>
        </RouterLink>
      </Box>

      {/* Products Table View */}
      <div className="grid lg:grid-cols-1 md:grid-cols-4 gap-7 lg:gap-4 mt-10">
        <EnhancedTable key={tableKey} />
      </div>
    </Container>
  );
}
