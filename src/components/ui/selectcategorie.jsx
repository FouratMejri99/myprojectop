import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import PropTypes from "prop-types"; // Import PropTypes
import * as React from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  disableAutoFocusItem: true, // Ensure menu doesn't close on click
};

const names = ["Furniture", "Lighting", "Decoration"];

export default function MultipleSelectCheckmarks({ onApply }) {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  // Function to handle Apply button click
  const applySelection = () => {
    if (onApply) {
      onApply(personName); // Pass selected categories to parent component
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">By categories</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="By categories" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}

          {/* Add Apply button inside dropdown */}
          <MenuItem disableRipple>
            <Button
              variant="contained"
              fullWidth
              onClick={applySelection}
              sx={{ mt: 1 }}
            >
              Apply
            </Button>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

// Add propTypes validation
MultipleSelectCheckmarks.propTypes = {
  onApply: PropTypes.func, // onApply is an optional function prop
};