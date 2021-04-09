import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Paper, FormControl, InputLabel, Input, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NotificationManager } from "react-notifications";
import { auth } from "../services/firebase/firebaseIndex";

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

const SignIn = () => {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
            history.push('/')
        }).catch(error => {
            setError("User email and password pair not matching any database records.");
        });
    };

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
            setPassword(value);
        }
    };

    useEffect( () => {
        if(error !== null) {
            NotificationManager.error(error, 'Error!')
        }

        return () => {
            setError(null)
        };

    }, [error])

    return (
        <div className={classes.root}>
            <form className={classes.centerBlock}>
                <Grid container spacing={3}>
                    <Grid item xs className={classes.paper}>
                        <h1 className={classes.headLine} >
                            Sign In
                        </h1>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="userEmail">Email</InputLabel>
                            <Input
                                id="userEmail"
                                value={email}
                                onChange={(event) => onChangeHandler(event)}
                                name="userEmail"
                            />
                        </FormControl>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="userPassword">Password</InputLabel>
                            <Input
                                id="userPassword"
                                value={password}
                                onChange={(event) => onChangeHandler(event)}
                                name="userPassword"
                                type="password"
                            />
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick = {(event) => {
                                signInWithEmailAndPasswordHandler(event, email, password)
                            }}>Sign In</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default SignIn;