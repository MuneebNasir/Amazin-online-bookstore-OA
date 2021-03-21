import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Card, CardActions, CardContent, Typography, Button} from "@material-ui/core";
import axios from "axios";

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
    card: {
        width: `calc(50%px)`,
    }
}));

let LayoutTextFields = () => {
    const classes = useStyles();

    let [id, setId] = useState(null);

    let handleRemoveBookClick = () => {
        axios({
            method: "delete",
            url: `/api/removeBook?id=${id}`,
        }).then(res => {
            console.log(res);
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
                        placeholder="ID"
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
                    <Button size="medium" variant={"outlined"} onClick={handleRemoveBookClick} style={{float: 'right'}}>
                        Remove Book
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default LayoutTextFields;