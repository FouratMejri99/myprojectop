import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

export default function SearchTextFields() {
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
