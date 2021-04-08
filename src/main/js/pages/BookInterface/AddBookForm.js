import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@material-ui/core";
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexWrap: 'wrap',
        width: `calc(50%px)`,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
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

let AddBookForm = (props) => {
    const classes = useStyles();

    let [authors, setAuthors] = useState([]); // author list to select from
    let [publishers, setPublishers] = useState([]); // publishers list to select from

    let [title, setTitle] = useState(null);
    let [description, setDescription] = useState(null);
    let [imageUrl, setImageUrl] = useState(null);
    let [publicationYear, setPublicationYear] = useState(null);
    let [format, setFormat] = useState(null);
    let [price, setPrice] = useState(null);
    let [stockCount, setStockCount] = useState(null);
    let [rating, setRating] = useState(null);
    let [isbn, setISBN] = useState(null);
    let [author, setAuthor] = useState('');
    let [publisher, setPublisher] = useState('');

    useEffect( () => {
        axios({
            method: "get",
            timeout: 8000,
            url: `/api/authors`,
        }).then(res => {
            setAuthors(res.data)
        })

        axios({
            method: "get",
            timeout: 8000,
            url: `/api/publishersViewAll`,
        }).then(res => {
            setPublishers(res.data)
        })
    }, [])

    let handleAddBook = () => {
        if (author === '') {
            NotificationManager.error("Can't create a book without an author!", "Error!");
            return
        }
        if (publisher === '') {
            NotificationManager.error("Can't create a book without a publisher!", "Error!");
            return
        }

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
            url: `/api/addNewBook?authorId=${author}&publisherId=${publisher}`,
            data:  JSON.stringify(book),
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            if (res.status === 201) {
                NotificationManager.success('You have added a new Book Entry!', 'Successful!', 500);
                props.refreshBookList();
            } else {
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
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Author</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {authors.map((author) => (
                                <MenuItem value={author.id}>{author.lastName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="publisher-simple-select-helper-label">Publisher</InputLabel>
                        <Select
                            labelId="publisher-select-helper-label"
                            id="publisher-simple-select-helper"
                            value={publisher}
                            onChange={(event) => setPublisher(event.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {publishers.map((publisher) => (
                                <MenuItem value={publisher.id}>{publisher.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button size="medium" variant={"outlined"} onClick={handleAddBook}>
                        Add Book
                    </Button>
                </CardActions>
            </Card>
        </div>
    );

}

export default AddBookForm;