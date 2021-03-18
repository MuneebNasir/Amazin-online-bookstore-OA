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
import PublisherIcon from '@material-ui/icons/Person';
import SearchBar from "./searchBar";
import BookTable from "./BookTable";
import {Card, Grid, Link, Paper} from "@material-ui/core";
import RemoveBookForm from "./RemoveBookForm";
import AddBookForm from "./AddBookForm";
import PublishersForm from "./Publishers";

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
                    <Router>
                    </Router>
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
                        <ListItem button component={Link} to="./Publishers">
                            <ListItemIcon>{<PublisherIcon/>}</ListItemIcon>
                            <ListItemText>{'Publishers'}</ListItemText>
                        </ListItem>
                </List>
            </Drawer>

            <Grid container className={classes.root} spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <Typography variant={"h3"} align={"center"}>AmazinBookStore - Find Your Books Here</Typography>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card>
                                <SearchBar/>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <BookTable books={props.books}/>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <AddBookForm/>
                        </Grid>
                        <Grid item xs={12}>
                            <RemoveBookForm/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </div>

    );
}

export default LeftDrawer;