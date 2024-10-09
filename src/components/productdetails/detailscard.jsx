import { db } from "@/config/firebase"; // Import Firestore
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { deleteDoc, doc } from "firebase/firestore"; // Import deleteDoc
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import Booster from "./Booster"; // Import the Booster dialog

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

// RecipeReviewCard Component
export const RecipeReviewCard = ({ product, onDelete }) => {
  const [expanded, setExpanded] = useState(false); // Manage expanded state
  const [imageUrl, setImageUrl] = useState(""); // Image URL from Firebase Storage
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to handle Booster dialog

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, "products", product.id)); // Assuming product has an id field
      // Call the onDelete callback to remove the card from the UI
      onDelete(product.id); // Pass the product id to the parent component
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  // Fetch image URL from Firebase Storage when product changes
  useEffect(() => {
    const fetchImageUrl = async () => {
      if (product.imageName) {
        try {
          const storageRef = ref(storage, `marketplace/${product.imageName}`); // Adjust the path if necessary
          const url = await getDownloadURL(storageRef);
          setImageUrl(url); // Set image URL
        } catch (error) {
          console.error("Error fetching image URL: ", error);
        }
      }
    };

    fetchImageUrl();
  }, [product.imageName]); // Only run when imageName changes

  // Handle opening and closing the dialog
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={imageUrl || "src/img/tnker.png"} // Default image if URL is not fetched
        alt={product ? product.name : "Product Image"}
      />
      <CardHeader
        title={product ? product.name : "Product Name"}
        subheader={product ? product.category : "Category"}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="share" onClick={handleOpenDialog}>
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="Delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Price: ${product ? product.price : "0.00"}
          </Typography>
          <Typography paragraph>
            Stock: {product ? product.stock : "0"}
          </Typography>
          <Typography paragraph>
            Category: {product ? product.category : ""}
          </Typography>
        </CardContent>
      </Collapse>

      {/* Booster Dialog */}
      <Booster
        isOpen={isDialogOpen}
        handleClose={handleCloseDialog}
        name={product ? product.name : "Product Name"} // Pass product name
      />
    </Card>
  );
};
