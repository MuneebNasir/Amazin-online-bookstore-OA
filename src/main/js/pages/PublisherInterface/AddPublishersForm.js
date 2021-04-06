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

let AddPublisherForm = (props) => {
    const classes = useStyles();
    let [name, setName] = useState(null);
    let [location, setLocation] = useState(null);

    let handleAddPublisher = () => {
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
            if (res.status === 201) {
                NotificationManager.success('You have added a new Publisher!', 'Successful!', 200);
                props.refreshPublisherList();
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
                        helperText="Name of Publisher to add"
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
                    <Button size="medium" variant={"outlined"} onClick={handleAddPublisher}>
                        Add Publisher
                    </Button>
                </CardActions>
            </Card>
        </div>
    );

}

export default AddPublisherForm;