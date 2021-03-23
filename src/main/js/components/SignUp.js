import React, {useContext} from 'react';
import {firebaseAuth} from "../services/provider/AuthProvider";
import {withRouter} from 'react-router-dom';
import {Button, FormControl, Grid, Input, InputLabel} from "@material-ui/core";
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

const SignUp = (props) => {
    const classes = useStyles();
    const {handleSignUp, inputs, setInputs, errors} = useContext(firebaseAuth)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleSignUp()
        props.history.push('/')
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
                            Sign Up
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
                        <Button variant="contained" color="primary">Sign Up</Button>
                    </Grid>
                </Grid>
                {errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p> ) : null}
            </form>
        </div>
    );
};

export default withRouter(SignUp);