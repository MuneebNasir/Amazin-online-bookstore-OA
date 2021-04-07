import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Card, Grid} from "@material-ui/core";
import AddAuthorForm from "./AddAuthorForm";
import Authors from "./Authors";
import Typography from "@material-ui/core/Typography";
import {UserContext} from "../../services/provider/UserProvider";

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
}));

let AuthorGrid = (props) => {
    const classes = useStyles();
    const user = useContext(UserContext)

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Grid container spacing={2} direction={"row"} alignItems={"center"} justify={"center"}>
                <Grid item xs={12}>
                    <Card>
                        <Typography variant={"h3"} align={"center"}>Authors</Typography>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card>
                                <Authors/>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                {user && user.isAdmin &&
                    <Grid item xs={3}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <AddAuthorForm/>
                            </Grid>
                        </Grid>
                    </Grid>
                }
            </Grid>
        </div>
    );
}

export default AuthorGrid;