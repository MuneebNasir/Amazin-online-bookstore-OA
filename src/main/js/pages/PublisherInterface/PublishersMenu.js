import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import {Card, Grid, Paper} from "@material-ui/core";
import PublishersTable from "./PublishersTable";
import AddPublishersForm from "./AddPublishersForm"
import Publishers from "./Publishers";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    appBar: {
        // width: `calc(100%px)`,
        // marginRight: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

let PublishersMenu = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Grid container className={classes.root} spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <Typography variant={"h3"} align={"center"}>AmazinBookStore - Registered Publishers</Typography>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {/*<Card>*/}
                            {/*    <SearchBar publishers={props.publishers}/>*/}
                            {/*</Card>*/}
                        </Grid>
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