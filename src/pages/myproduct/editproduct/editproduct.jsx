import { db } from "@/config/firebase"; // Firebase setup
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
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Iconify from "../../../components/iconify";
import upload from "../../../img/upload.png";
import "./newproduct.css";

function EditProduct() {
  const navigate = useNavigate();
  const [postImage, setPostImage] = useState({ image: "" });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const formData = {
      name,
      description,
      category,
      price,
      stock,
      image: postImage.image,
      createdBy: userId,
    };

    try {
      // Add product to Firestore
      await addDoc(collection(db, "products"), formData);
      console.log("Product successfully added!");

      // Show success notification
      setOpenSnackbar(true);

      // Navigate to the products page after adding the product
      navigate("/products");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, image: base64 });
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  // Close Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    console.log("Product successfully added!");
    setOpenSnackbar(true);
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
        Edit Product
      </Typography>

      <form onSubmit={handleFormSubmit}>
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

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Content</Typography>
          <ReactQuill
            value={description}
            onChange={setDescription}
            style={{ height: 200 }}
          />
        </Box>

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

        <Box sx={{ mb: 3, textAlign: "center" }}>
          <label htmlFor="file-upload" className="custom-file-upload">
            <div style={{ width: "100px", height: "100px" }}>
              <img
                src={postImage.image || upload}
                alt="Choose a file"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </label>
          <input
            type="file"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Drop or Select file
          </Typography>
        </Box>

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

export default EditProduct;
