import { db } from "@/config/firebase"; // Your Firestore configuration
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore"; // Import Firestore methods
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import SearchTextFields from "../ui/searchfield";
import MultipleSelectCheckmarks from "../ui/selectcategorie";
import TopProducts from "../ui/topProducts";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Product" },
  { id: "category", numeric: true, disablePadding: false, label: "Category" },
  { id: "stock", numeric: true, disablePadding: false, label: "Stock" },
  { id: "price", numeric: true, disablePadding: false, label: "Price" },
  { id: "publish", numeric: true, disablePadding: false, label: "Published" },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all products" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography
                variant="subtitle1"
                component="span"
                style={{ fontWeight: 600 }}
              >
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar({
  numSelected,
  onCategoryChange,
  onDeleteSelected,
}) {
  return (
    <Toolbar
      sx={[
        { pl: { sm: 2 }, pr: { xs: 1, sm: 1 } },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {/* Category Filter */}
      <MultipleSelectCheckmarks onCategoryChange={onCategoryChange} />
      <TopProducts sx={{ flex: "1 1 100%" }} id="tableTitle" />
      <SearchTextFields sx={{ flex: "1 1 100%" }} id="tableTitle" />
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDeleteSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onDeleteSelected: PropTypes.func.isRequired, // Added delete handler prop
};

export default function EnhancedTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isTopProductsFilter, setIsTopProductsFilter] = useState(false); // New state for top products

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all marketplaces and sort to get the latest one
        const marketplacesSnapshot = await getDocs(
          collection(db, "marketplace")
        );
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

        // Fetch products from the latest marketplace's subcollection
        const productsSnapshot = await getDocs(
          collection(db, "marketplace", marketplaceId, "products")
        );

        const fetchedProducts = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch published items
        const publishSnapshot = await getDocs(collection(db, "publish"));
        const publishedNames = publishSnapshot.docs.map(
          (doc) => doc.data().name
        );

        // Update the publish field based on your criteria
        await Promise.all(
          fetchedProducts.map(async (product) => {
            const productRef = doc(
              db,
              "marketplace",
              marketplaceId,
              "products",
              product.id
            );
            // Check if product.name is in the published names
            const isPublished = publishedNames.includes(product.name);
            await updateDoc(productRef, {
              publish: isPublished ? "Boosted" : "Draft",
            });
          })
        );

        setRows(fetchedProducts);
        setFilteredRows(fetchedProducts); // Initialize filtered rows
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();
  }, []);

  // Function to delete selected products from Firestore and update the state
  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selected.map(async (id) => {
          await deleteDoc(doc(db, "products", id)); // Delete from Firestore
        })
      );
      setRows((prevRows) =>
        prevRows.filter((row) => !selected.includes(row.id))
      ); // Update local state
      setFilteredRows((prevFilteredRows) =>
        prevFilteredRows.filter((row) => !selected.includes(row.id))
      ); // Update filtered rows
      setSelected([]); // Clear selection
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  // Update the filtered rows when categories or top products filter changes
  const applyFilters = (categories, isTopProducts) => {
    let newFilteredRows = rows;

    // Apply category filter
    if (categories.length > 0) {
      newFilteredRows = newFilteredRows.filter((row) =>
        categories.includes(row.Category)
      );
    }

    // Apply top products filter
    if (isTopProducts) {
      newFilteredRows = newFilteredRows.filter((row) => row.isTopProduct);
    }

    setFilteredRows(newFilteredRows);
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
    applyFilters(categories, isTopProductsFilter);
  };

  const handleTopProductsChange = (isTopProducts) => {
    setIsTopProductsFilter(isTopProducts);
    applyFilters(selectedCategories, isTopProducts);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        onCategoryChange={handleCategoryChange}
        onDeleteSelected={handleDeleteSelected} // Pass the delete handler
      />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={filteredRows.length}
          />
          <TableBody>
            {filteredRows
              .slice()
              .sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={
                            row.imageUrl ? row.imageUrl : "src/img/boxes.jpg"
                          }
                          alt="Product Image"
                          style={{
                            width: "50px", // Increased size
                            height: "50px", // Increased size
                            marginRight: "8px",
                            objectFit: "cover", // Ensures the image fits nicely within the bounds
                            borderRadius: "12px", // Adjusted for rounded corners (use 50% for full circle)
                          }}
                        />
                        <span>{row.name}</span>
                      </div>
                    </TableCell>

                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      >
                        {/* Conditional line with gradient and rounded ends */}
                        <div
                          style={{
                            width: "35%", // Adjust width as needed
                            height: "6px", // Thicker line
                            background: `linear-gradient(
          to left, 
           black ${100 - row.stock}%, 
          #e7d024  ${row.stock}%
        )`, // Red portion on the right
                            marginBottom: "4px", // Space between the line and stock value
                            borderRadius: "3px", // Rounded ends
                          }}
                        ></div>
                        <Typography variant="caption" color="textSecondary">
                          {row.stock} in stock
                        </Typography>
                      </div>
                    </TableCell>

                    <TableCell align="right">${row.price}</TableCell>
                    <TableCell align="right">
                      <span
                        style={{
                          backgroundColor:
                            row.publish === "Boosted"
                              ? "green"
                              : row.publish === "Draft"
                              ? "#ff465d"
                              : "transparent", // Default color if none match
                          color: "white",
                          padding: "2px 4px",
                          borderRadius: "4px",
                        }}
                      >
                        {row.publish}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
