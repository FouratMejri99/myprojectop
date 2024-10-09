import { db } from "@/config/firebase"; // Import Firestore
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Box from "@mui/joy/Box";
import { Breadcrumbs, Container, IconButton, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { RecipeReviewCard } from "../../../components/productdetails/detailscard";

// Define ExpandMore styled component
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
}));

export default function ProductsDetails() {
  const [products, setProducts] = useState([]); // Array to hold product data

  // Fetch product data from Firestore
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Get document ID
          ...doc.data(), // Spread document data
        }));
        setProducts(productsArray); // Set products state
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProductsData();
  }, []);

  return (
    <Container>
      {/* Page Title */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <h1 className="text-2xl font-bold">Products Details</h1>
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
            Products Details
          </Link>
        </Breadcrumbs>
      </Box>

      {/* Map through products and display RecipeReviewCard for each */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {products.map((product) => (
          <RecipeReviewCard key={product.id} product={product} />
        ))}
      </Box>
    </Container>
  );
}
