import { db } from "@/config/firebase"; // Ensure your Firebase configuration is imported
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import { useState } from "react";

const Overdue = ({ productId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const markAsOverdue = async () => {
    if (!productId) {
      setError("Product ID is required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Prepare the update data
      const updateData = {
        payement: "overdue", // Set payment status to "overdue"
        flouci: "fail", // Optionally, you can update other fields as well
      };

      const marketplacesSnapshot = await getDocs(collection(db, "marketplace"));
      const marketplaces = marketplacesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Find the latest marketplace by sorting by createdAt
      const latestMarketplace = marketplaces.sort(
        (a, b) => b.createdAt - a.createdAt
      )[0];

      if (!latestMarketplace) {
        console.error("No marketplaces found.");
        return;
      }

      const marketplaceId = latestMarketplace.id;

      // Create a reference to the product documen
      // Update Firestore
      await updateDoc(
        doc(db, "marketplace", marketplaceId, "products", productId),
        updateData
      );
      console.log("Payment status updated to overdue in Firestore");
      setSuccess(true); // Show success snackbar
    } catch (err) {
      console.error("Error updating payment status:", err);
      setError("Failed to update payment status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 3, textAlign: "center" }}>
      <Button
        variant="outlined"
        color="secondary"
        onClick={markAsOverdue}
        disabled={loading}
      >
        Mark as Overdue
      </Button>

      {loading && <Typography variant="body1">Updating...</Typography>}
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}

      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Payment status marked as overdue!
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Prop validation
Overdue.propTypes = {
  productId: PropTypes.string.isRequired, // Validate that productId is a required string
};

export default Overdue;
