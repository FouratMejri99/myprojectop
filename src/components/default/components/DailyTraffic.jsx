import { db } from "@/config/firebase"; // Import your Firebase config
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Card from "../../card/Card.jsx";
import ColumnChart from "../../charts/ColumnChart.jsx"; // Updated to use ColumnChart

export default function DailyTraffic(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 4px 12px rgba(0, 0, 0, 0.1)",
    "0px 4px 12px rgba(0, 0, 0, 0.2)"
  );

  const [chartData, setChartData] = useState([]);
  const [totalVisitors, setTotalVisitors] = useState(0);

  // Fetch data from Firestore
  useEffect(() => {
    async function fetchAudienceData() {
      const audienceCollection = collection(db, "publish");
      const querySnapshot = await getDocs(audienceCollection);

      let trafficData = [];
      let totalClients = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const estimatedClients = data.estimatedClients;
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        const totalDays =
          Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) + 1; // +1 to include the end date

        // Calculate daily traffic and limit to three digits
        const dailyTraffic = Math.min(
          Math.round(estimatedClients / totalDays),
          999
        ); // Ensure only three digits
        trafficData.push(dailyTraffic);
        totalClients += estimatedClients;
      });

      setChartData([
        {
          name: "Estimated Clients", // Series name
          data: trafficData, // Daily traffic data
        },
      ]);
      setTotalVisitors(totalClients); // Keep totalVisitors as it is
    }

    fetchAudienceData();
  }, []);

  const chartOptions = {
    chart: {
      toolbar: {
        show: false, // Hide toolbar if not needed
      },
    },
    xaxis: {
      categories:
        chartData.length > 0
          ? chartData[0].data.map((_, index) => `Day ${index + 1}`)
          : [], // Generates labels for days
    },
    title: {
      text: "Daily Estimated Clients", // Chart title
      align: "left",
    },
    colors: ["#3a60ff"], // Customize your color
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
  };

  return (
    <Card
      align="center"
      direction="column"
      w="100%"
      boxShadow={cardShadow}
      {...rest}
    >
      <Flex justify="space-between" align="start" px="10px" pt="5px">
        <Flex flexDirection="column" align="start" me="20px">
          <Flex w="100%">
            <Text
              me="auto"
              color="secondaryGray.600"
              fontSize="sm"
              fontWeight="500"
            >
              Daily Traffic
            </Text>
          </Flex>
          <Flex align="end">
            <Text
              color={textColor}
              fontSize="34px"
              fontWeight="700"
              lineHeight="100%"
            >
              {totalVisitors} {/* Keep totalVisitors as it is */}
            </Text>
            <Text
              ms="6px"
              color="secondaryGray.600"
              fontSize="sm"
              fontWeight="500"
            >
              Visitors
            </Text>
          </Flex>
        </Flex>
        <Flex align="center">
          <Text color="green.500" fontSize="sm" fontWeight="700"></Text>
        </Flex>
      </Flex>
      <Box h="240px" mt="auto">
        <ColumnChart chartData={chartData} chartOptions={chartOptions} />
      </Box>
    </Card>
  );
}
