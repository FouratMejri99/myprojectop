import { db } from "@/config/firebase"; // Assuming you have Firestore initialized in a firebase.js file
import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore imports
import { useEffect, useState } from "react";
import Card from "../../card/Card";

const columnHelperForComplexTable = createColumnHelper();

export default function ComplexTable(props) {
  const { ...rest } = props;
  const [sorting, setSorting] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const outerCardShadow = useColorModeValue(
    "0px 4px 12px rgba(0, 0, 0, 0.1)",
    "0px 4px 12px rgba(0, 0, 0, 0.2)"
  );

  // Fetch data from Firestore
  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(db, "products"),
        where("payement", "==", "paid") // Filter products with payement "paid"
      );
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductsData(productsList); // Update the state with fetched products
    }

    fetchData();
  }, []);

  const columns = [
    columnHelperForComplexTable.accessor("name", {
      id: "name",
      header: () => (
        <Text
          textAlign="center" // Center align the header
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
          mb={2} // Added margin-bottom for spacing
        >
          Product Name
        </Text>
      ),
      cell: (info) => (
        <Flex justify="center">
          {" "}
          {/* Center align the cell content */}
          <Text color={textColor} fontSize="sm" fontWeight="700" mx={2}>
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelperForComplexTable.accessor("category", {
      id: "category",
      header: () => (
        <Text
          textAlign="center" // Center align the header
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
          mb={2} // Added margin-bottom for spacing
        >
          Category
        </Text>
      ),
      cell: (info) => (
        <Flex justify="center">
          {" "}
          {/* Center align the cell content */}
          <Text color={textColor} fontSize="sm" fontWeight="700" mx={2}>
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelperForComplexTable.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <Text
          textAlign="center" // Center align the header
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
          mb={2} // Added margin-bottom for spacing
        >
          Created At
        </Text>
      ),
      cell: (info) => (
        <Flex justify="center">
          {" "}
          {/* Center align the cell content */}
          <Text color={textColor} fontSize="sm" fontWeight="700" mx={2}>
            {new Date(info.getValue().seconds * 1000).toLocaleDateString()}
          </Text>
        </Flex>
      ),
    }),
  ];

  const table = useReactTable({
    data: productsData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

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
      <Flex px="25px" mb="8px" justifyContent="center" align="center">
        {" "}
        {/* Center align header */}
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Top Completed Orders in the market
        </Text>
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    pe="10px"
                    borderColor={borderColor}
                    cursor="pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex
                      justifyContent="center" // Center align header
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                      mb={2} // Added margin-bottom for spacing
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted()
                        ? header.column.getIsSorted() === "asc"
                          ? " 🔼"
                          : " 🔽"
                        : null}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table
              .getRowModel()
              .rows.slice(0, 5)
              .map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                      px={3} // Added horizontal padding for spacing
                      textAlign="center" // Center align cell content
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}
