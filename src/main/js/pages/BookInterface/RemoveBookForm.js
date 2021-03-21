import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Card, CardActions, CardContent, Typography, Button} from "@material-ui/core";
import axios from "axios";
import {NotificationManager} from "react-notifications";

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
}));

let LayoutTextFields = () => {
    const classes = useStyles();

    let [id, setId] = useState(null);

    let handleRemoveBookClick = () => {
        axios({
            method: "delete",
            url: `/api/removeBook?id=${id}`,
        }).then(res => {
            if (res.status === 200) {
                NotificationManager.success('Removal of Book Entry Successful', 'Success!', 500);

            }else {
                NotificationManager.error('Error while Removing Book Entry!', 'Error!');
            }
        })
    }

    return (
        <div className={classes.root}>
            <Card variant="outlined">
                <CardContent>
                    <Typography>
                        Remove a Book
                    </Typography>
                </CardContent>
                <CardContent>
                    <TextField
                        id="standard-full-width"
                        style={{ margin: 8 }}
                        placeholder="Enter the ID of the book to remove!"
                        helperText="ID of book to remove"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange = {(e) => setId(e.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button size="medium" variant={"outlined"} onClick={handleRemoveBookClick}>
                        Remove Book
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default LayoutTextFields;