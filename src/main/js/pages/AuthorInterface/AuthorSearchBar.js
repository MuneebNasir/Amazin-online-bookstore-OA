import React, {useEffect, useState} from 'react';
import axios from "axios";

import TextField from '@material-ui/core/TextField';

let AuthorSearchBar = (props) => {

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
export default AuthorSearchBar;
