// src/pages/invoices/InvoicesPage.jsx

import { db } from "@/config/firebase"; // Adjust the import based on your Firebase config
import AddAlertIcon from "@mui/icons-material/AddAlert";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DescriptionIcon from "@mui/icons-material/Description";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import Box from "@mui/joy/Box";
import { Breadcrumbs, Container, Link } from "@mui/material";
import Stack from "@mui/material/Stack";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import InvoiceStatBox from "../../components/invoices/InvoiceStatBox";
import InvoicesTable from "../../components/invoices/invoicestable";
import "./invoices.css";

const fetchTotalInvoiceData = async () => {
  try {
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
      return { count: 0, amount: 0 }; // Return default values
    }

    const marketplaceId = latestMarketplace.id;
    const snapshot = await getDocs(
      collection(db, "marketplace", marketplaceId, "products")
    );

    const count = snapshot.size;
    const amount = snapshot.docs.reduce(
      (acc, doc) => acc + Number(doc.data().price || 0), // Ensure 'price' is treated as a number
      0
    );

    return { count, amount };
  } catch (error) {
    console.error("Error fetching total invoices:", error);
    return { count: 0, amount: 0 }; // Return default values in case of an error
  }
};

const fetchPaidInvoiceData = async () => {
  try {
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
      return { count: 0, amount: 0 }; // Return default values
    }

    const marketplaceId = latestMarketplace.id;
    const q = query(
      collection(db, "marketplace", marketplaceId, "products"),
      where("payment", "==", "paid")
    );
    const snapshot = await getDocs(q);

    const count = snapshot.size;
    const amount = snapshot.docs.reduce(
      (acc, doc) => acc + Number(doc.data().price || 0),
      0
    );

    return { count, amount };
  } catch (error) {
    console.error("Error fetching paid invoices:", error);
    return { count: 0, amount: 0 }; // Return default values in case of an error
  }
};

const fetchPendingInvoiceData = async () => {
  try {
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
      return { count: 0, amount: 0 }; // Return default values
    }

    const marketplaceId = latestMarketplace.id;
    const q = query(
      collection(db, "marketplace", marketplaceId, "products"),
      where("payment", "==", "Pending...")
    );
    const snapshot = await getDocs(q);

    const count = snapshot.size;
    const amount = snapshot.docs.reduce(
      (acc, doc) => acc + Number(doc.data().price || 0),
      0
    );

    return { count, amount };
  } catch (error) {
    console.error("Error fetching pending invoices:", error);
    return { count: 0, amount: 0 }; // Return default values in case of an error
  }
};

const fetchOverdueInvoiceData = async () => {
  try {
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
      return { count: 0, amount: 0 }; // Return default values
    }

    const marketplaceId = latestMarketplace.id;
    const q = query(
      collection(db, "marketplace", marketplaceId, "products"),
      where("payment", "==", "overdue")
    );
    const snapshot = await getDocs(q);

    const count = snapshot.size;
    const amount = snapshot.docs.reduce(
      (acc, doc) => acc + Number(doc.data().price || 0),
      0
    );

    return { count, amount };
  } catch (error) {
    console.error("Error fetching overdue invoices:", error);
    return { count: 0, amount: 0 }; // Return default values in case of an error
  }
};

const fetchDraftInvoiceData = async () => {
  try {
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
      return { count: 0, amount: 0 }; // Return default values
    }

    const marketplaceId = latestMarketplace.id;
    const q = query(
      collection(db, "marketplace", marketplaceId, "products"),
      where("payment", "==", "Draft")
    );
    const snapshot = await getDocs(q);

    const count = snapshot.size;
    const amount = snapshot.docs.reduce(
      (acc, doc) => acc + Number(doc.data().price || 0),
      0
    );

    return { count, amount };
  } catch (error) {
    console.error("Error fetching draft invoices:", error);
    return { count: 0, amount: 0 }; // Return default values in case of an error
  }
};

export default function InvoicesPage() {
  const [tableKey, setTableKey] = useState(0);

  // Function to reload the InvoicesTable
  const reloadTable = () => {
    setTableKey((prevKey) => prevKey + 1);
  };

  return (
    <Container>
      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={reloadTable}
      >
        <h1 className="text-2xl font-bold">Invoices</h1>
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
            Invoices
          </Link>
        </Breadcrumbs>
      </Box>

      <Box sx={{ padding: 2 }}>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="space-between"
          sx={{ mt: 5 }}
        >
          <InvoiceStatBox
            icon={<DescriptionIcon />}
            label="Total"
            fetchData={fetchTotalInvoiceData}
            color="#DFC729"
          />
          <InvoiceStatBox
            icon={<AttachMoneyIcon />}
            label="Paid"
            fetchData={fetchPaidInvoiceData}
            color="#26710F"
          />
          <InvoiceStatBox
            icon={<WorkHistoryIcon />}
            label="Pending"
            fetchData={fetchPendingInvoiceData}
            color="#003366"
          />
          <InvoiceStatBox
            icon={<AddAlertIcon />}
            label="Overdue"
            fetchData={fetchOverdueInvoiceData}
            color="#ff465d"
          />
          <InvoiceStatBox
            icon={<DriveFileMoveIcon />}
            label="Draft"
            fetchData={fetchDraftInvoiceData}
            color="#DFC729"
          />
        </Stack>
      </Box>

      {/* Products View */}
      <div className="grid lg:grid-cols-1 md:grid-cols-4 gap-7 lg:gap-4 mt-10">
        <InvoicesTable key={tableKey} />
      </div>
    </Container>
  );
}
