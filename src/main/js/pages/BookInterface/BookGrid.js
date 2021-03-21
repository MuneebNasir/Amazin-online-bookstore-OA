import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchBar from "./SearchBar";
import BooksTable from "./BooksTable";

import AddBookForm from "./AddBookForm";
import {Card, Grid, Paper} from "@material-ui/core";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        alignContent:'center'
    },
    appBar: {
        width: `calc(100%px)`,
        marginRight: drawerWidth,
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
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 530,
    },


}));

let BookGrid = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Grid container spacing={1} alignItems={"center"} direction={"column"}>
                <Grid item >
                    <Paper className={classes.paper}>
                        <SearchBar />
                    </Paper >
                </Grid>
                <Grid item>
                    <Card>
                        <BooksTable />
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={1} alignItems={"center"} direction={"column"} >
                <Grid>
                    <Grid item xs={7}>
                        <AddBookForm/>
                    </Grid>
                </Grid>

            </Grid>
        </div>

    );
}

export default BookGrid;