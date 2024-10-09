import { Flex, Select, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../../card/Card.jsx";
import PieChart from "../../charts/PieChart.jsx";
import { pieChartData, pieChartOptions } from "../variables/charts";

export default function Conversion(props) {
  const { ...rest } = props;

  // Chakra Color Mode
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

  return (
    <Card
      p='20px'
      align='center'
      direction='column'
      w='100%'
      boxShadow={outerCardShadow} // Added box shadow for the outer card
      {...rest}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'>
        <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
          Your Pie Chart
        </Text>
        <Select
          fontSize='sm'
          variant='subtle'
          defaultValue='monthly'
          width='unset'
          fontWeight='700'>
          <option value='daily'>Daily</option>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </Select>
      </Flex>

      <PieChart
        h='100%'
        w='100%'
        chartData={pieChartData}
        chartOptions={pieChartOptions}
      />
      <Card
        bg={cardColor}
        flexDirection='row'
        boxShadow={cardShadow} // Existing shadow for the inner card
        w='100%'
        p='15px'
        px='90px'
        mt='15px'
        mx='auto'>
      </Card>
    </Card>
  );
}
