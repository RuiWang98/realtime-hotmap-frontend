import { Tooltip, TextField, Button } from '@mui/material';
import * as React from 'react';


function SearchBar(props: any) {
  const [searchBarValue, setSearchBarValue] = React.useState('');
  
  const handleSearch = async () => {
    fetch(`http://localhost:8080/api/get?query=${searchBarValue}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="search-bar-wrapper">
        <Tooltip title="ie. Search all drop between 9am until now" followCursor>
          <TextField
            className="search-bar"
            id="filled-basic"
            label="Search Bar"
            variant="filled"
            value={searchBarValue}
            onChange={(event) => {
              setSearchBarValue(event.target.value);
            }}
          />
        </Tooltip>
        <Button className="button-container" variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <div className="button-container">
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
}

export default React.memo(SearchBar);

