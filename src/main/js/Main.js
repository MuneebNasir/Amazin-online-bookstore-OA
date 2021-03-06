import React, {useContext} from "react";
import {
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import clsx from "clsx";

import {AppBar} from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {fade, makeStyles, useTheme} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
import {NotificationContainer} from 'react-notifications';
import Home from "./pages/Home"
import About from "./pages/About";
import Books from "./pages/BookInterface/Books";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Publishers from "./pages/PublisherInterface/Publishers";
import Authors from "./pages/AuthorInterface/Authors";
import {UserContext} from "./services/provider/UserProvider";
import {auth} from "./services/firebase/firebaseIndex";

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


let Main = () => {
    const classes = useStyles();
    const user = useContext(UserContext)
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
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
                        <MenuIcon/>
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Amazin Book Store
                    </Typography>
                    {user &&
                    <div>
                        {user.displayName}
                        <IconButton variant="contained" onClick={() => {
                            auth.signOut()
                        }} aria-label="signOut">
                            <ExitToAppIcon/>
                        </IconButton>
                    </div>
                    }
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
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button component={Link} to={"/"} onClick={handleDrawerClose}>
                        <ListItemIcon>
                            <HomeIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="Home"/>
                    </ListItem>
                    <ListItem button component={Link} to="/about" onClick={handleDrawerClose}>
                        <ListItemIcon>
                            <InfoIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="About"/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button component={Link} to="/authors" onClick={handleDrawerClose}>
                        <ListItemIcon>
                            <PersonIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="Authors"/>
                    </ListItem>
                    <ListItem button component={Link} to="/publishers" onClick={handleDrawerClose}>
                        <ListItemIcon>
                            <ShoppingCartIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="Publishers"/>
                    </ListItem>
                    <ListItem button component={Link} to="/books" onClick={handleDrawerClose}>
                        <ListItemIcon>
                            <MenuBookIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="Books"/>
                    </ListItem>
                </List>
                <Divider/>
                {!user &&
                <List>
                    <ListItem button component={Link} to="/signup" onClick={handleDrawerClose}>
                        <ListItemIcon>
                            <PersonIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="Sign Up"/>
                    </ListItem>
                    <ListItem button component={Link} to="/signin" onClick={handleDrawerClose}>
                        <ListItemIcon>
                            <PersonIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="Sign In"/>
                    </ListItem>
                </List>
                }
            </Drawer>


            <div className="container mt-2" style={{marginTop: 40}}>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path="/authors">
                        <Authors/>
                    </Route>
                    <Route path="/publishers">
                        <Publishers/>
                    </Route>
                    <Route path="/books">
                        <Books/>
                    </Route>
                    <Route path="/signup">
                        <SignUp/>
                    </Route>
                    <Route path="/signin">
                        <SignIn/>
                    </Route>
                    <Redirect to={"/"}/>
                </Switch>
            </div>
            <NotificationContainer/>
        </div>
    );
}

export default Main;