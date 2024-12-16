import { db } from "@/config/firebase"; // Import your Firestore instance
import { Box, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  MdAttachMoney,
  MdBarChart,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import ComplexTable from "../../components/default/components/ComplexTable";
import DailyTraffic from "../../components/default/components/DailyTraffic";
import Conversion from "../../components/default/components/PieCard";
import TotalSpent from "../../components/default/components/TotalSpent";
import IconBox from "../../components/icons/IconBox";
import MiniStatistics from "../card/MiniStatistics";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  // State for product data
  const [totalSalesCount, setTotalSalesCount] = useState(0);
  const [monthlySpend, setMonthlySpend] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [marketplaceId, setMarketplaceId] = useState(null);

  // Fetch the latest marketplaceId on component mount
  useEffect(() => {
    const fetchMarketplaceId = async () => {
      try {
        const marketplacesSnapshot = await getDocs(
          collection(db, "marketplace")
        );
        const marketplaces = marketplacesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const latestMarketplace = marketplaces.sort(
          (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()
        )[0];

        if (latestMarketplace) {
          setMarketplaceId(latestMarketplace.id);
        } else {
          console.error("No marketplaces found.");
        }
      } catch (error) {
        console.error("Error fetching marketplaces:", error);
      }
    };

    fetchMarketplaceId();
  }, []);

  // Fetch products based on the fetched marketplaceId
  useEffect(() => {
    const fetchProducts = async () => {
      if (!marketplaceId) return; // Ensure marketplaceId is available

      try {
        const productsCollection = collection(
          db,
          "marketplace",
          marketplaceId,
          "products"
        );
        const productsSnapshot = await getDocs(productsCollection);
        const products = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Count sold products
        const soldProducts = products.filter(
          (product) =>
            product.publish === "Boosted" && product.payment === "paid"
        );
        const salesCount = soldProducts.length;

        // Calculate monthly spend and earnings
        const monthlySpendTotal = products.reduce((acc, product) => {
          const price = parseFloat(product.price) || 0; // Ensure price is a number
          return acc + price; // Sum the prices
        }, 0);

        const earningsTotal = soldProducts.reduce((acc, product) => {
          const price = parseFloat(product.price) || 0; // Ensure price is a number
          return acc + price; // Sum earnings from sold products
        }, 0);

        // Log the values to debug
        console.log("Sales Count:", salesCount);
        console.log("Monthly Spend Total:", monthlySpendTotal);
        console.log("Earnings Total:", earningsTotal);

        // Update the state with the calculated values
        setTotalSalesCount(salesCount);
        setMonthlySpend(monthlySpendTotal);
        setEarnings(earningsTotal);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [marketplaceId]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex
        gap="10px"
        mb="20px"
        mr="40px"
        justifyContent="space-between"
        wrap="wrap"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="48px"
              h="48px"
              bg={boxBg}
              icon={
                <Icon w="28px" h="28px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          name="Money Traffic expected"
          value={`$${(monthlySpend || 0).toFixed(2)}`}
          boxSize="sm"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="48px"
              h="48px"
              bg={boxBg}
              icon={
                <Icon w="28px" h="28px" as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name="Already Paid"
          value={`$${(earnings || 0).toFixed(2)}`}
          boxSize="sm"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="48px"
              h="48px"
              bg={boxBg}
              icon={
                <Icon
                  w="28px"
                  h="28px"
                  as={MdOutlineProductionQuantityLimits}
                  color={brandColor}
                />
              }
            />
          }
          name="Products Sold"
          value={totalSalesCount} // Display the number of products sold
          boxSize="sm"
        />
      </Flex>

      <Flex gap="20px" mb="20px">
        <Box flex="2">
          <TotalSpent monthlySpend={monthlySpend} /> {/* Pass monthlySpend */}
        </Box>
        <Box flex="1">
          <Conversion earnings={earnings} /> {/* Pass earnings */}
        </Box>
      </Flex>

      <Flex gap="20px" mb="20px">
        <Box flex="2">
          <DailyTraffic />
        </Box>
        <Box flex="1">
          <ComplexTable totalSalesCount={totalSalesCount} />{" "}
          {/* Pass totalSalesCount */}
        </Box>
      </Flex>
    </Box>
  );
}
