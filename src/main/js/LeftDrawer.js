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
import SearchBar from "./searchBar";
import BookTable from "./BookTable";
import {Card, Grid, Paper} from "@material-ui/core";

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

 let LeftDrawer = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                        <ListItem button>
                            <ListItemIcon>{<HomeIcon/>}</ListItemIcon>
                            <ListItemText>{'Home'}</ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>{<SearchIcon/>}</ListItemIcon>
                            <ListItemText>{'Search'}</ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>{<ShoppingCartIcon/>}</ListItemIcon>
                            <ListItemText>{'My Cart'}</ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>{<MenuBookIcon/>}</ListItemIcon>
                            <ListItemText>{'My Recommendations'}</ListItemText>
                        </ListItem>
                </List>
            </Drawer>

            <Card>
                <Typography variant={"h3"}>AmazinBookStore - Find Your Books Here</Typography>
                <SearchBar/>
                <BookTable books={props.books}/>
            </Card>

        </div>

    );
}

export default LeftDrawer;