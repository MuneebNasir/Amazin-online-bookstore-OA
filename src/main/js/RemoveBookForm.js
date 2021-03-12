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
}));

let LayoutTextFields = () => {
    const classes = useStyles();

    let [title, setTitle] = useState(null);

    let handleRemoveBookClick = () => {
        let book = {
            title: title,
        }

        console.log("======================")
        console.log("Book to remove:")
        console.log(book);
        console.log("======================")

        axios
            .post(`/api/AmazinBookStore-removeBook`)
            .then(res => {
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
                        placeholder="Enter the book title to remove!"
                        helperText="Title of book to remove"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange = {(e) => setTitle(e.target.value)}
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