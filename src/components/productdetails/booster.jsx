import { db } from "@/config/firebase"; // Adjust the path according to your project structure
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { addDoc, collection } from "firebase/firestore"; // Import Firestore functions
import { useState } from "react";
import "./booster.css";

function Booster({ isOpen, handleClose, name }) {
  const [budget, setBudget] = useState(50);
  const [currency, setCurrency] = useState("USD");
  const [estimatedClients, setEstimatedClients] = useState(0);
  const [audience, setAudience] = useState(""); // Added state for audience
  const [startDate, setStartDate] = useState(null); // Added state for start date
  const [endDate, setEndDate] = useState(null); // Added state for end date

  const handleBudgetChange = (event, newValue) => {
    setBudget(newValue);
    const cpmRate = 5;
    const impressions = (newValue * 10) / cpmRate;
    setEstimatedClients(impressions);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleAudienceChange = (event) => {
    setAudience(event.target.value);
  };

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const currencyOptions = [
    { value: "USD", label: "US Dollar" },
    { value: "EUR", label: "Euro" },
    { value: "GBP", label: "British Pound" },
  ];

  // New function to handle publish
  const handlePublish = async () => {
    try {
      // Define the data object to be published
      const data = {
        name,
        budget,
        currency,
        estimatedClients,
        audience,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      };

      // Add data to the "publish" collection
      await addDoc(collection(db, "publish"), data);

      // Add data to the "public" collection
      await addDoc(collection(db, "products"), data); // Save to public collection

      console.log("Data published successfully to both collections!");
      handleClose(); // Close the dialog after publishing
    } catch (error) {
      console.error("Error publishing data: ", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} scroll="paper" maxWidth="md">
      <DialogContent>
        <DialogTitle>Publishing for: {name}</DialogTitle>
        <div>
          <FormControl>
            <FormLabel id="audience-label">Who should see your ad?</FormLabel>
            <RadioGroup
              aria-labelledby="audience-label"
              name="radio-buttons-group"
              value={audience}
              onChange={handleAudienceChange}
            >
              <FormControlLabel
                value="f1"
                control={<Radio />}
                label="Advantage audience"
              />
              <FormControlLabel
                value="f2"
                control={<Radio />}
                label="People you choose through targeting"
              />
              <FormControlLabel
                value="f3"
                control={<Radio />}
                label="People who like your product"
              />
              <FormControlLabel
                value="f4"
                control={<Radio />}
                label="People who like your Product and people similar to them"
              />
              <FormControlLabel
                value="f5"
                control={<Radio />}
                label="People in your local area"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <DialogTitle>Schedule and Duration</DialogTitle>
        <div>
          <FormControl>
            <FormLabel id="schedule-label">Schedule and Duration</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <DateTimePicker
                label="End Date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </LocalizationProvider>
          </FormControl>
        </div>
        <DialogTitle>Daily Budget</DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <FormLabel id="estimated-clients-label" sx={{ color: "blue" }}>
            Estimated Clients: {estimatedClients}
          </FormLabel>
        </Box>
        <Slider
          value={budget}
          onChange={handleBudgetChange}
          min={1}
          max={500}
          step={1}
          aria-labelledby="budget-slider"
        />
        <Box sx={{ mt: 2, ml: 1, mb: 2 }}>
          <FormLabel id="budget-label">
            Budget: {currency} {budget}
          </FormLabel>
        </Box>
        <FormControl fullWidth>
          <InputLabel id="currency-select-label">Currency</InputLabel>
          <Select
            labelId="currency-select-label"
            id="currency-select"
            value={currency}
            onChange={handleCurrencyChange}
            label="Currency"
          >
            {currencyOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={handlePublish} color="primary">
          Publish
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Booster;
