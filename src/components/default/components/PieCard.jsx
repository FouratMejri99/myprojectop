import { db } from "@/config/firebase"; // Adjust the path to your firebase.js
import { useColorModeValue } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Card from "../../card/Card.jsx";
import PieChart from "../../charts/PieChart.jsx"; // Import your PieChart

export default function Conversion(props) {
  const { ...rest } = props;

  const [paymentData, setPaymentData] = useState({ paid: 0, pending: 0 });

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const outerCardShadow = useColorModeValue(
    "0px 4px 12px rgba(0, 0, 0, 0.1)",
    "0px 4px 12px rgba(0, 0, 0, 0.2)"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const counts = { paid: 0, pending: 0, overdue: 0 };

        querySnapshot.forEach((doc) => {
          const product = doc.data();
          if (product.payement === "paid") {
            counts.paid += 1;
          } else if (product.payement === "Pending...") {
            counts.pending += 1;
          } else if (product.payement === "overdue") {
            counts.overdue += 1;
          }
        });

        setPaymentData(counts);
      } catch (error) {
        console.error("Error fetching product data from Firestore:", error);
      }
    };

    fetchData();
  }, []);

  const pieChartData = {
    labels: ["Paid", "Pending", "Overdue"],
    datasets: [
      {
        label: "Payment Status",
        data: [paymentData.paid, paymentData.pending, paymentData.overdue],
        backgroundColor: ["green", "#003366", "#ff465d"],
        borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
        borderWidth: 2,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
  };

  return (
    <Card
      p="20px"
      align="center"
      direction="column"
      w="100%"
      h="99%"
      boxShadow={outerCardShadow}
      {...rest}
    >
      <PieChart
        h="260px" // Set your desired height
        w="100%"
        chartData={pieChartData}
        chartOptions={pieChartOptions}
      />
    </Card>
  );
}
