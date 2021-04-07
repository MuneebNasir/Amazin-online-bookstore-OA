import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {Button, FormControl, Grid, Input, InputLabel} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { NotificationManager } from 'react-notifications';
import { auth, generateUserDocument } from "../services/firebase/firebaseIndex";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    headLine: {
        textAlign: "center"
    },
    centerBlock: {
        margin: '0 auto'
    }
}));

const SignUp = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const mountedRef = useRef(true)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await generateUserDocument(user, {displayName});
            history.push('/')
        }
        catch(error){
            setError('Error Signing up with email and password');
        }

        setEmail("");
        setPassword("");
        setDisplayName("");
    };

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;

        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        } else if (name === "displayName") {
            setDisplayName(value);
        }
    };

    return (
        <div className={classes.root}>
            {error !== null && NotificationManager.error(error, 'Error!')}
            <form className={classes.centerBlock}>
                <Grid container spacing={3}>
                    <Grid item xs className={classes.paper}>
                        <h1 className={classes.headLine} >
                            Sign Up
                        </h1>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="displayName">Preferred Name</InputLabel>
                            <Input
                                id="displayName"
                                value={displayName}
                                onChange={event => onChangeHandler(event)}
                                name="displayName"
                            />
                        </FormControl>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="userEmail">Email</InputLabel>
                            <Input
                                id="userEmail"
                                value={email}
                                onChange={event => onChangeHandler(event)}
                                type="email"
                                name="userEmail"
                            />
                        </FormControl>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="userPassword">Password</InputLabel>
                            <Input
                                id="userPassword"
                                value={password}
                                onChange={event => onChangeHandler(event)}
                                name="userPassword"
                                type="password"
                            />
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={event => {
                                createUserWithEmailAndPasswordHandler(event, email, password);
                            }}
                        >Sign Up</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default SignUp;