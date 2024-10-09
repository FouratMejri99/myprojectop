import { db, storage } from "@/config/firebase"; // Import Firebase setup (Firestore and Storage)
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore"; // Firestore functions
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"; // Firebase Storage functions
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Iconify from "../../../components/iconify";
import upload from "../../../img/upload.png"; // Default upload image
import "./newproduct.css";

function NewProduct() {
  const navigate = useNavigate();
  const [postImage, setPostImage] = useState(null); // State to hold the selected file
  const [imageUrl, setImageUrl] = useState(""); // State to hold the image URL after upload
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state for notifications

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      // Upload the image to Firebase Storage
      if (postImage) {
        const storageRef = ref(storage, `marketplace/${postImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, postImage);

        // Monitor the upload progress and completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Optional: You can track upload progress here
          },
          (error) => {
            console.error("Error uploading image: ", error);
          },
          async () => {
            // Get download URL after the upload is complete
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setImageUrl(downloadURL); // Set the image URL in state

            // Add product to Firestore with image URL
            const formData = {
              name,
              description,
              category,
              price,
              stock,
              image: downloadURL, // Store the image URL in Firestore
              createdBy: userId,
              Publish: "no",
            };
            await addDoc(collection(db, "products"), formData); // Add product to Firestore
            console.log("Product successfully added!");

            // Show success notification
            setOpenSnackbar(true);
            navigate("/products"); // Redirect to products page after adding the product
          }
        );
      }
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setPostImage(file); // Set the selected file for uploading
  };

  // Close Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: 3,
        maxWidth: 1020,
        margin: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Create New Product
      </Typography>

      <form onSubmit={handleFormSubmit}>
        {/* Product Name Field */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Detail</Typography>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </Box>

        {/* Price and Stock Fields */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Price & Stock</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              fullWidth
            />
            <TextField
              label="Stock"
              variant="outlined"
              type="number"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value, 10))}
              fullWidth
            />
          </Box>
        </Box>

        {/* Description Field with ReactQuill Editor */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Content</Typography>
          <ReactQuill
            value={description}
            onChange={setDescription}
            style={{ height: 200 }}
          />
        </Box>

        {/* Category Selection Field */}
        <TextField
          select
          label="Category"
          variant="outlined"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ mb: 3 }}
        >
          <MenuItem value="Decoration">Decoration</MenuItem>
          <MenuItem value="Furniture">Furniture</MenuItem>
          <MenuItem value="Lighting">Lighting</MenuItem>
        </TextField>

        {/* File Upload Field */}
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <label htmlFor="file-upload" className="custom-file-upload">
            <div style={{ width: "100px", height: "100px" }}>
              <img
                src={imageUrl || upload} // Display the uploaded image or default placeholder
                alt="Choose a file"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </label>
          <input
            type="file"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            onChange={handleFileUpload} // Handle file upload
            style={{ display: "none" }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Drop or Select file
          </Typography>
        </Box>

        {/* Submit Button */}
        <Button
          variant="contained"
          type="submit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          sx={{ backgroundColor: "black", color: "white", width: 200 }}
        >
          Add Product
        </Button>
      </form>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product successfully added!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default NewProduct;
