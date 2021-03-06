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
import {SwapHorizTwoTone} from "@material-ui/icons";

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
    let [publicationYear, setPublicationYear] = useState(null);
    let [price, setPrice] = useState(null);
    let [stockCount, setStockCount] = useState(null);
    let [rating, setRating] = useState(null);
    let [isbn, setISBN] = useState(null);
    let [author, setAuthor] = useState('');
    let [publisher, setPublisher] = useState('');
    let [ageGroup, setAgeGroup] = useState('');
    let [genre, setGenre] = useState('');
    let [length, setLength] = useState('');

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
        if (ageGroup === '') {
            NotificationManager.error("Please add an age group to your book!", "Error!");
            return
        }
        if (genre === '') {
            NotificationManager.error("Please add a genre to your book!", "Error!");
            return
        }
        if (length === '') {
            NotificationManager.error("Please add a length to your book!", "Error!");
            return
        }

        let book = {
            "title": title,
            "description": description,
            "publicationYear": publicationYear,
            "price": price,
            "stockCount": stockCount,
            "rating": rating,
            "isbn": isbn,
            "genre": genre,
            "length": length,
            "ageGroup": ageGroup,
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
                        placeholder="Publication Year"
                        className={classes.textField}
                        helperText="Year of Publication"
                        onChange = {(e) => setPublicationYear(e.target.value)}
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
                        <InputLabel id="demo-simple-select-helper-label">Genre</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'FANTASY'}>Fantasy</MenuItem>
                            <MenuItem value={'SCIENCE_FICTION'}>Science Fiction</MenuItem>
                            <MenuItem value={'FICTION'}>Fiction</MenuItem>
                            <MenuItem value={'NON_FICTION'}>Non Fiction</MenuItem>
                            <MenuItem value={'HISTORY'}>History</MenuItem>
                            <MenuItem value={'EDUCATION'}>Education</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Age Group</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={ageGroup}
                            onChange={(e) => setAgeGroup(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'YOUNG'}>YOUNG</MenuItem>
                            <MenuItem value={'ADULT'}>ADULT</MenuItem>
                            <MenuItem value={'SENIOR'}>SENIOR</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Length</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'SHORT'}>SHORT</MenuItem>
                            <MenuItem value={'MEDIUM'}>MEDIUM</MenuItem>
                            <MenuItem value={'LONG'}>LONG</MenuItem>
                        </Select>
                    </FormControl>
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