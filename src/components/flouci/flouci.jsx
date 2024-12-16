import { db } from "@/config/firebase"; // Ensure your Firebase configuration is imported
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore"; // Import onSnapshot
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Overdue from "./overdue";

const Flouci = ({ productId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [productData, setProductData] = useState(null); // State for product data
  const [marketplaceId, setMarketplaceId] = useState(null); // State for marketplaceId

  useEffect(() => {
    const fetchLatestMarketplaceAndListenToProduct = async () => {
      try {
        // Fetch all marketplaces
        const marketplacesSnapshot = await getDocs(
          collection(db, "marketplace")
        );
        const marketplaces = marketplacesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort and find the latest marketplace
        const latestMarketplace = marketplaces.sort(
          (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()
        )[0];

        if (!latestMarketplace) {
          console.error("No marketplaces found.");
          return null; // Return null if there's no marketplace
        }

        const marketplaceId = latestMarketplace.id;
        setMarketplaceId(marketplaceId);

        return marketplaceId;
      } catch (error) {
        console.error("Error fetching marketplaces:", error);
        return null;
      }
    };

    // Set up the Firestore listener after fetching the latest marketplace
    let unsubscribe;
    fetchLatestMarketplaceAndListenToProduct().then((marketplaceId) => {
      if (!marketplaceId) return; // If no marketplaceId, exit

      // Now we can set up the listener with the marketplaceId and productId
      const productRef = doc(
        db,
        "marketplace",
        marketplaceId,
        "products",
        productId
      );
      unsubscribe = onSnapshot(productRef, (doc) => {
        if (doc.exists()) {
          setProductData(doc.data());
        } else {
          console.log("No such document!");
        }
      });
    });

    // Clean up the listener on component unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [productId]);

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:3000/api/payement", {
        amount: 10000,
      });

      console.log("Payment Response:", response.data);

      if (response.data.result && response.data.result.success) {
        const paymentId = response.data.result.payment_id;
        const paymentLink = response.data.result.link;

        if (paymentId && paymentLink) {
          const newWindow = window.open(paymentLink, "_blank"); // Open payment link
          pollPaymentStatus(paymentId, newWindow); // Start polling for payment verification
        } else {
          setError("Payment ID or link not found in response.");
        }
      } else {
        setError("Failed to retrieve payment information.");
      }
    } catch (err) {
      setError("Error processing payment: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const pollPaymentStatus = async (paymentId, newWindow) => {
    const maxAttempts = 12; // Poll for a maximum of 1 minute (12 x 5 seconds)
    let attempts = 0;

    const interval = setInterval(async () => {
      try {
        const verifyResponse = await axios.post(
          `http://localhost:3000/api/payement/${paymentId}`
        );

        console.log("Verify Payment Response:", verifyResponse.data);

        if (
          verifyResponse.data.success &&
          verifyResponse.data.result.status === "SUCCESS"
        ) {
          setSuccess(true); // Show success snackbar
          if (newWindow) newWindow.close(); // Close the payment window
          clearInterval(interval); // Stop polling

          // Call function to update the payment status in Firestore
          await updatePaymentStatusInFirestore(productId, true); // Update Firestore for success
        } else if (attempts >= maxAttempts) {
          setError("Payment verification timeout. Please check manually.");
          await updatePaymentStatusInFirestore(productId, false); // Update Firestore for failure
          clearInterval(interval); // Stop polling after timeout
        }
      } catch (err) {
        setError("Error verifying payment: " + err.message);
        clearInterval(interval);
      }
      attempts += 1;
    }, 5000); // Poll every 5 seconds
  };
  const updatePaymentStatusInFirestore = async (productId) => {
    if (!productId || !marketplaceId) {
      console.error("Product ID or Marketplace ID is undefined or null.");
      return;
    }

    try {
      // Reference to the specific product document
      const productRef = doc(
        db,
        "marketplace",
        marketplaceId,
        "products",
        productId
      );
      const productDoc = await getDoc(productRef);

      if (productDoc.exists()) {
        const productData = productDoc.data();
        console.log("Product Data:", productData);

        // Check if conditions are met to update the payment status
        if (
          productData.payment === "overdue" ||
          productData.payment === "Pending..." ||
          productData.flouci === "fail"
        ) {
          await updateDoc(productRef, { flouci: "success", payment: "paid" });
          console.log("Payment status updated in Firestore");
        } else {
          console.log(
            "Payment status is not overdue or pending; no update made."
          );
        }
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.error("Error updating payment status in Firestore:", err);
    }
  };

  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Complete Your Payment
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please review the transaction details and confirm your payment.
      </Typography>

      {loading && (
        <Typography variant="body1">Loading payment link...</Typography>
      )}
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
          Payment was successful!
        </Alert>
      </Snackbar>

      {productData && (
        <Box
          sx={{
            mt: 3,
            p: 2,
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            Product Details
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            <strong>Name:</strong> {productData.name}
          </Typography>

          <Typography variant="body1" sx={{ mb: 0.5 }}>
            <strong>Price:</strong> {productData.price}
          </Typography>

          <Typography variant="body1" sx={{ mb: 0.5 }}>
            <strong>Status :</strong> {productData.payment}
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            <strong>Status :</strong> {productData.flouci}
          </Typography>
          {/* Add other product details as necessary */}
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        disabled={loading || !productData} // Disable button while loading or if product data is not available
      >
        Pay Now
      </Button>

      {/* Include your Overdue component if necessary */}
      <Overdue />
    </Box>
  );
};

Flouci.propTypes = {
  productId: PropTypes.string.isRequired, // Ensure productId is a string
};

export default Flouci;
