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

let LayoutTextFields = () => {
    const classes = useStyles();
    let [title, setTitle] = useState(null);
    let [description, setDescription] = useState(null);
    let [imageUrl, setImageUrl] = useState(null);
    let [publicationYear, setPublicationYear] = useState(null);
    let [format, setFormat] = useState(null);
    let [price, setPrice] = useState(null);
    let [stockCount, setStockCount] = useState(null);
    let [rating, setRating] = useState(null);
    let [isbn, setISBN] = useState(null);

    let handleAddBookClick = event => {
        let book = {
            "title": title,
            "description": description,
            "imageURL": imageUrl,
            "publicationYear": publicationYear,
            "format": format,
            "price": price,
            "stockCount": stockCount,
            "rating": rating,
            "isbn": isbn,
        }

        axios({
            method: "post",
            contentType: "application/json",
            url: "/api/addNewBook",
            data:  JSON.stringify(book),
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            console.log(res);
            if (res.status === 201) {
                NotificationManager.success('You have added a new Book Entry!', 'Successful!', 500);

            }else {
                NotificationManager.error('Error while Creating new Book Entry!', 'Error!');
            }
        })
    }

    return (

        <div className={classes.root}>
            <Card variant="outlined">
                <CardContent>
                    <Typography>
                        Add a Book
                    </Typography>
                </CardContent>
                <CardContent>
                    <TextField
                        id="standard-full-width"
                        style={{ margin: 8 }}
                        placeholder="Book Title"
                        helperText="Title of book to add"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange = {(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        id="margin-none"
                        placeholder="Description"
                        className={classes.textField}
                        helperText="Description of the book"
                        onChange = {(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        id="margin-none"
                        placeholder="Image URL"
                        className={classes.textField}
                        onChange = {(e) => setImageUrl(e.target.value)}
                    />
                    <TextField
                        id="margin-none"
                        placeholder="Publication Year"
                        className={classes.textField}
                        helperText="Year of Publication"
                        onChange = {(e) => setPublicationYear(e.target.value)}
                    />
                    <TextField
                        id="margin-none"
                        placeholder="Format"
                        className={classes.textField}
                        helperText="Book format style"
                        onChange = {(e) => setFormat(e.target.value)}
                    />
                    <TextField
                        id="margin-none"
                        placeholder="Price"
                        className={classes.textField}
                        helperText="Price of the book"
                        onChange = {(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        id="margin-none"
                        placeholder="Stock Count"
                        className={classes.textField}
                        helperText="Number in stock"
                        onChange = {(e) => setStockCount(e.target.value)}
                    />
                    <TextField
                        id="margin-none"
                        placeholder="Rating"
                        className={classes.textField}
                        helperText="Rating of book"
                        onChange = {(e) => setRating(e.target.value)}
                    />
                    <TextField
                        id="margin-none"
                        placeholder="ISBN"
                        className={classes.textField}
                        helperText="ISBN of book"
                        onChange = {(e) => setISBN(e.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button size="medium" variant={"outlined"} onClick={handleAddBookClick}>
                        Add Book
                    </Button>
                </CardActions>
            </Card>
        </div>
    );

}

export default LayoutTextFields;