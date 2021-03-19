import React from "react";
import SearchBar from "./BookInterface/SearchBar";
import {Grid, Paper} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    headLine: {
        textAlign: "center"
    }
}));

let Home = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>
                    <h1 className={classes.headLine} >
                        Welcome To Amazing Book Store
                    </h1>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <SearchBar />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;