import { Tooltip, TextField } from '@mui/material';
import * as React from 'react';

function SearchBar(props: any) {
  return (
    <div className="search-bar-wrapper">
        <Tooltip title="ie. Search all drop between 9am untill now" followCursor>
            <TextField className="search-bar" id="filled-basic" label="Search Bar" variant="filled" />
        </Tooltip>

    </div>
  );
}

export default React.memo(SearchBar);