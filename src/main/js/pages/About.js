import React from "react";
import {Grid, Padding, Paper} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    headLine: {
        textAlign: "center"
    }
}));

let About = () => {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>
                    <h1 className={classes.headLine}>This is the About Page</h1>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <p>
                            Amazing Book Store
                        </p>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
};

export default About;