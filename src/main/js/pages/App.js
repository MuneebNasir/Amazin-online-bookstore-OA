import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import PageHeader from '../components/PageHeader';
import Home from "../Home";
import index from "../index"
import About from "./About";
import Publishers from "./PublisherInterface/Publishers";
import ParticlesBg from 'particles-bg'
import {AppBar, MenuItem, MenuList} from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
import {LibraryAdd} from "@material-ui/icons";
import {NavLink} from "react-router-dom";
import LeftDrawer from "./BookInterface/LeftDrawer";
import SearchBar from "./BookInterface/searchBar";


const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));



let App = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <BrowserRouter>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.hide)}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Amazin Book Store
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button component={Link} to={"/"} onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <HomeIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button component={Link} to="/">
                            <ListItemIcon>
                                <SearchIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Search" />
                        </ListItem>
                        <ListItem button component={Link} to="/">
                            <ListItemIcon>
                                <ShoppingCartIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="My Cart" />
                        </ListItem>
                        <ListItem button component={Link} to="/">
                            <ListItemIcon>
                                <MenuBookIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Recommendations" />
                        </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <PersonIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Authors" />
                    </ListItem>
                    <ListItem button component={Link} to="/Publishers">
                        <ListItemIcon>
                            <ShoppingCartIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Publishers" />
                    </ListItem>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <MenuBookIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Books" />
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button component={Link} to="/home">
                        <ListItemIcon>
                            <MenuIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Old" />
                    </ListItem>
                    <ListItem button component={Link} to="/about">
                        <ListItemIcon>
                            <MenuIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItem>
                </List>
                </Drawer>
                <div className="banner-text" style={{height: '100vh'}}>
                    <h1 className="headline" style={{margin: 0, padding: 0, fontSize : '70px',  display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        Welcome To Amazin Book Store
                    </h1>
                    <p style={{margin: 0, padding: 0, display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <SearchBar books={props.books}/>
                    </p>

                </div>
                <div className="container mt-2" style={{ marginTop: 40 }}>
                    <Switch>
                        <Route exact path="/old">
                            <LeftDrawer books={props.books} />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/Publishers">
                            <Publishers/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;