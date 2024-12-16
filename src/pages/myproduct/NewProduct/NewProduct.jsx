import { db, storage } from "@/config/firebase";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      const marketplaceQuery = await getDocs(collection(db, "marketplace"));
      let latestMarketplaceId;
      marketplaceQuery.forEach((doc) => {
        latestMarketplaceId = doc.id;
      });

      if (!latestMarketplaceId) {
        console.error("No marketplace found.");
        return;
      }

      if (postImage) {
        const storageRef = ref(storage, `marketplace/${postImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, postImage);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.error("Error uploading image: ", error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              const formData = {
                name,
                description,
                category,
                price,
                stock,
                image: downloadURL,
                createdBy: userId,
                createdAt: serverTimestamp(),
                payment: "Pending...",
                flouci: "fail",
              };

              await addDoc(
                collection(db, `marketplace/${latestMarketplaceId}/products`),
                formData
              );
              setOpenSnackbar(true);
              navigate("/products");
            } catch (error) {
              console.error("Error adding product to Firestore: ", error);
            }
          }
        );
      }
    } catch (error) {
      console.error("Error retrieving marketplace ID: ", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: 3,
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        New Product
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Product Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="Category"
          variant="outlined"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="Decoration">Decoration</MenuItem>
          <MenuItem value="Furniture">Furniture</MenuItem>
          <MenuItem value="Lighting">Lighting</MenuItem>
        </TextField>
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Stock"
          variant="outlined"
          type="number"
          fullWidth
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Box sx={{ mb: 2, textAlign: "center" }}>
          <Button variant="contained" component="label" sx={{ width: "100%" }}>
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => setPostImage(e.target.files[0])}
              accept="image/*"
              required
            />
          </Button>
          {postImage && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {postImage.name}
            </Typography>
          )}
        </Box>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ backgroundColor: "black", color: "white" }}
        >
          Add Product
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Product successfully added!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewProduct;
