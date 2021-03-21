import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Card, CardActions, CardContent, Typography, Button} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexWrap: 'wrap',
        width: `calc(50%px)`,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    card: {
        width: `calc(50%px)`,
    }
}));

let BookInformation = (props) => {

    const classes = useStyles();

    let [id, setId] = useState(null);

    let handleGetBookClick = () => {
        axios({
            method: "get",
            url: `/api/book/{id}=${props}`,
        }).then(res => {
        })
    }

    return (
        <div className={classes.root}>
            res
        </div>
    );


}

export default BookInformation;