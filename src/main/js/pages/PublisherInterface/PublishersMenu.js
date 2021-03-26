import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {Card, Grid, Paper} from "@material-ui/core";
import AddPublishersForm from "./AddPublishersForm"
import Publishers from "./Publishers";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },

    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        align: 'center',
        maxWidth: 530,
    },
}));

let PublishersMenu = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Grid container spacing={2} direction={"row"} alignItems={"center"} justify={"center"}>
                <Grid item xs={12}>
                    <Card>
                        <Typography variant={"h3"} align={"center"}>Amazin Book Store - Registered Publishers</Typography>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        {/*<Grid>*/}
                        {/*    <Paper className={classes.paper}>*/}
                        {/*        <PublisherSearchBar />*/}
                        {/*    </Paper >*/}
                        {/*</Grid>*/}
                        <Grid item xs={12}>
                            <Card>
                                <Publishers/>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <AddPublishersForm/>
                        </Grid>
                        {/*<Grid item xs={12}>*/}
                        {/*    <RemoveBookForm/>*/}
                        {/*</Grid>*/}
                    </Grid>
                </Grid>
            </Grid>

        </div>

    );
}

export default PublishersMenu;