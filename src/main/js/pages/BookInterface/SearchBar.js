import React, {useEffect, useState} from 'react';
import axios from "axios";

import TextField from '@material-ui/core/TextField';

let SearchBar = (props) => {

    return (
        <TextField
            id="search"
            label="Search field"
            type="search"
            variant="outlined"
            style={{width: '100%'}}
            onChange={props.handleSearchChange}
        />
    )
}
export default SearchBar;
