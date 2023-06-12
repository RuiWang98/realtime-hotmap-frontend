import { Tooltip, TextField, Button } from "@mui/material";
import * as React from "react";

function SearchBar(props: any) {
  const handleSearch = () => {
    // Handle search functionality here
  };

  return (
    <div className="search-bar-wrapper">
      <Tooltip title="ie. Search all drop between 9am untill now" followCursor>
        <div className="search-bar-container">
          <TextField
            id="filled-basic"
            label="Search Bar"
            variant="filled"
            className="search-bar"
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            className="search-button"
          >
            Search
          </Button>
        </div>
      </Tooltip>
    </div>
  );
}

export default React.memo(SearchBar);
