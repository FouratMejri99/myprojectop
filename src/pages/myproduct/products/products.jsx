import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Box from "@mui/joy/Box";
import { Breadcrumbs, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import Iconify from "../../../components/iconify";
import EnhancedTable from "../../../components/products/producttable";
import "./product.css";
export default function ProductsPage() {
  return (
    <Container>
      {/* Page Title */}

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <h1 className="text-2xl font-bold">Products List</h1>
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
            Products List
          </Link>
        </Breadcrumbs>

        <Link to="/newProducts" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            className="new-product-button"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Product
          </Button>
        </Link>
      </Box>

      {/* Products View */}
      <div className="grid lg:grid-cols-1 md:grid-cols-4 gap-7 lg:gap-4 mt-10">
        <EnhancedTable />
      </div>
    </Container>
  );
}