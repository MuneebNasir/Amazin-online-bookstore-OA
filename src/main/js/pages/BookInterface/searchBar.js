import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));

let SearchBar = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        {/*<TextField*/}
        {/*    id="standard-full-width"*/}
        {/*    label="Search"*/}
        {/*    style={{ margin: 8 }}*/}
        {/*    placeholder="Book Search"*/}
        {/*    helperText="Search books here!"*/}
        {/*    fullWidth*/}
        {/*    margin="normal"*/}
        {/*    InputLabelProps={{*/}
        {/*        shrink: true,*/}
        {/*    }}/>*/}
            <Autocomplete
                id="combo-box-demo"
                options={props.books}
                getOptionLabel={(option) => option.title}
                style={{ width: 500 }}
                renderInput={(params) => <TextField {...params} label="Search a Book" variant="outlined" />}
            />
        </div>
    )}

    export default SearchBar;


