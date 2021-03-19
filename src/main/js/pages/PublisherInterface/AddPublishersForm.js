import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Card, CardActions, CardContent, Typography, Button} from "@material-ui/core";
import axios from "axios";
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';

const useStyles = makeStyles((theme) => ({
    root: {
        flexWrap: 'wrap',
        width: '50%',
        margin: '0 auto'
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

let PublisherInfoFields = () => {
    const classes = useStyles();
    let [name, setName] = useState(null);
    let [location, setLocation] = useState(null);

    let handleAddPublisherClick = event => {
        let publisher = {
            "name": name,
            "location": location
        }

        axios({
            method: "post",
            contentType: "application/json",
            url: "/api/addNewPublisher",
            data:  JSON.stringify(publisher),
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            console.log(res);
            if (res.status === 201) {
                NotificationManager.success('You have added a new Publisher!', 'Successful!', 500);

            }else {
                NotificationManager.error('Error while Creating new Publisher Entry!', 'Error!');
            }
        })
    }

    return (

        <div className={classes.root}>
            <Card variant="outlined">
                <CardContent>
                    <Typography>
                        Add a Publisher
                    </Typography>
                </CardContent>
                <CardContent>
                    <TextField
                        id="standard-full-width"
                        style={{ margin: 8 }}
                        placeholder="Publisher Name"
                        helperText="TName"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange = {(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="margin-none"
                        placeholder="Location"
                        className={classes.textField}
                        helperText="Publisher's Location"
                        onChange = {(e) => setLocation(e.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button size="medium" variant={"outlined"} onClick={handleAddPublisherClick}>
                        Add Publisher
                    </Button>
                </CardActions>
            </Card>
        </div>
    );

}

export default PublisherInfoFields;