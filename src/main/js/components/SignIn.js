import React, {useContext} from 'react';
import {firebaseAuth} from "../services/provider/AuthProvider";
import {Grid, Paper, FormControl, InputLabel, Input, Button} from "@material-ui/core";
import SearchBar from "../pages/BookInterface/SearchBar";
import {makeStyles} from "@material-ui/core/styles";

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
    const {handleSignIn, inputs, setInputs, errors} = useContext(firebaseAuth)

    const handleSubmit = (e) => {
        e.preventDefault()
        handleSignIn()

    }
    const handleChange = e => {
        const {name, value} = e.target
        setInputs(prev => ({...prev, [name]: value}))
    }

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit} className={classes.centerBlock}>
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
                            <InputLabel htmlFor="user-login">Email</InputLabel>
                            <Input
                                id="user-login"
                                value={inputs.email}
                                onChange={handleChange}
                                name="email"
                            />
                        </FormControl>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="user-pass">Password</InputLabel>
                            <Input
                                id="user-pass"
                                value={inputs.password}
                                onChange={handleChange}
                                name="password"
                            />
                        </FormControl>
                        <Button variant="contained" color="primary">Sign In</Button>
                    </Grid>
                </Grid>
                {errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p> ) : null}
            </form>
        </div>
    );
};

export default SignIn;