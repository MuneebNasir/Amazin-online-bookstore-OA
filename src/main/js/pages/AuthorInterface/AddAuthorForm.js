import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Card, CardActions, CardContent, Typography, Button} from "@material-ui/core";
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexWrap: 'wrap',
        width: `calc(50%px)`,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    button: {
        color: 'blue',
    },
    card: {
        width: `calc(50%px)`,
    }
}));

let AuthorFields = () => {
    const classes = useStyles();
    let [firstName, setFirstName] = useState(null);
    let [lastName, setLastName] = useState(null);
    let [book, setBook] = useState(null);

    let handleAddAuthorClick = event => {
        let author = {
            "firstName": firstName,
            "lastName": lastName,
            "book": book // book should be dropdown with all available books probably
        }

        axios({
            method: "post",
            url: "/api/create-author",
            data:  JSON.stringify(author),
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            if (res.status === 201) {
                NotificationManager.success('You have created a new author!', 'Successful!', 500);

            }else {
                NotificationManager.error('Error while creating new author!', 'Error!');
            }
        })
    }

    return (
        <div className={classes.root}>
            <Card variant="outlined">
                <CardContent>
                    <Typography>
                        Add an Author
                    </Typography>
                </CardContent>
                <CardContent>
                    <TextField
                        id="margin-none"
                        placeholder="First Name"
                        className={classes.textField}
                        helperText="Author's First Name"
                        onChange = {(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        id="margin-none"
                        placeholder="Last Name"
                        className={classes.textField}
                        helperText="Author's Last Name"
                        onChange = {(e) => setLastName(e.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button size="medium" variant={"outlined"} onClick={handleAddAuthorClick}>
                        Add Author
                    </Button>
                </CardActions>
            </Card>
        </div>
    );

}

export default AuthorFields;