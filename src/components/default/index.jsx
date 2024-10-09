import {
  Box,
  Flex,
  Icon,
  useColorModeValue
} from "@chakra-ui/react";
// Assets
// Custom components
import { MdAttachMoney, MdBarChart } from "react-icons/md";
import ComplexTable from "../../components/default/components/ComplexTable";
import DailyTraffic from "../../components/default/components/DailyTraffic";
import PieCard from "../../components/default/components/PieCard";
import TotalSpent from "../../components/default/components/TotalSpent";
import { columnsDataComplex } from "../../components/default/variables/columnsData";
import tableDataComplex from "../../components/default/variables/tableDataComplex.json";
import IconBox from "../../components/icons/IconBox";
import MiniStatistics from "../card/MiniStatistics";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex
        gap="10px"
        mb="20px"
        justifyContent="space-between"
        wrap="wrap"
      >
        <MiniStatistics
        
          startContent={
            <IconBox
              w="48px"
              h="48px"
              bg={boxBg}
              icon={<Icon w="28px" h="28px" as={MdBarChart} color={brandColor} />}
            />
          }
          name="Earnings"
          value="$350.4"
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
          name="Spend this month"
          value="$642.39"
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
        growth="+23%" name="Sales" value="$574.34" boxSize="sm" />
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
          name="Your balance"
          value="$1,000"
          boxSize="sm"
        />
      </Flex>

      <Flex gap="20px" mb="20px">
        <Box flex="2">
          <TotalSpent />
        </Box>
        <Box flex="1">
          <PieCard />
        </Box>
      </Flex>

      
      <Flex gap="20px" mb="20px">
        <Box flex="2">
        <DailyTraffic />
        </Box>
        <Box flex="1">
        
        <ComplexTable columnsData={columnsDataComplex} tableData={tableDataComplex} />
        </Box>
      </Flex>

    </Box>
  );
}
