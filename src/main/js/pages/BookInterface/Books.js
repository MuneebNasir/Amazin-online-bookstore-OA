import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import axios from "axios";
import {NotificationManager} from "react-notifications";

import BooksTable from "./BooksTable";
import AddBookForm from "./AddBookForm";
import BookCart from "./BookCart";
import BuyButton from "./BuyButton";
import SearchBar from "./SearchBar";
import Button from "@material-ui/core/Button";
import {UserContext} from "../../services/provider/UserProvider";


let Books = () => {
    const user = useContext(UserContext)
    let [books, setBooks] = useState([]);
    let [cartBooks, setCartBooks] = useState([]);
    let [search, setSearch] = useState('');
    let [toggleBooks, setToggleBooks] = useState(false);
    let [recommendBooksToggle, setRecommendBooksToggle] = useState(false);
    let [mostRecentBook, setMostRecentBook] = useState(null);
    let [searchMode, setSearchMode] = useState(true);

    let handleAddToCart = (book) => {
        setMostRecentBook(book);
        let currentCartBookIds = [];
        cartBooks.forEach((book) => {
            currentCartBookIds.push(book)
        });

        // If the book isn't currently in the cart
        if (currentCartBookIds.indexOf(book.id) === -1) {
            setCartBooks(state => [...state, book]);
        }
    }

    let handleRemoveFromCart = (id) => {
        let currentCartBookIds = [];
        cartBooks.forEach((book) => {
            currentCartBookIds.push(book)
        });

        // If the book is currently in the cart
        if (currentCartBookIds.indexOf(id) !== -1) {
            let filteredCart = cartBooks.filter(bookId => bookId !== id);
            setCartBooks(filteredCart);
        }
    }

    let handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    let handleRemoveBook = (id) => {
        axios({
            method: "delete",
            timeout: 8000,
            url: `/api/removeBook?id=${id}`,
        }).then(res => {
            if (res.status === 200) {
                NotificationManager.success('Removal of Book Entry Successful', 'Success!');
            } else {
                NotificationManager.error('Error while Removing Book Entry!', 'Error!');
            }
            refreshBookList();
        })
    }

    let handleRecommendBook = () => {
        if (mostRecentBook == null) {
            NotificationManager.error('Add at least one book to your shopping cart, so we can make a recommendation!', 'Error!');
            return
        }
        setRecommendBooksToggle(true);
        refreshBookList();
    }

    let refreshBookList = () => {
        setToggleBooks(!toggleBooks);
    }

    useEffect(() => {
        if (recommendBooksToggle) {
            axios({
                method: "get",
                timeout: 8000,
                url: `/api/recommendBooks?bookId=${mostRecentBook}`,
            }).then(res => {
                setBooks(res.data);
            })
            setSearchMode(false);
            setRecommendBooksToggle(false);
        } else if (search === '') {
            axios({
                method: "get",
                timeout: 8000,
                url: `/api/booksViewAll`,
            }).then(res => {
                setBooks(res.data)
            })
            setSearchMode(true);
        } else {
            axios({
                method: "get",
                url: `/api/searchByTitle?title=${search}`,
            }).then(res => {
                setBooks(res.data)
            })
            setSearchMode(true);
        }
    }, [search, toggleBooks])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant={"h5"}>
                            Search
                        </Typography>
                        <SearchBar handleSearchChange={handleSearchChange}/>
                        <Button variant="outlined" color="primary" style={{marginTop:15}} onClick={handleRecommendBook}>
                            Recommend Me Books!
                        </Button>
                        <Button variant="outlined" color="secondary" style={{marginTop:15}} onClick={refreshBookList}>
                            Back to Search
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardContent>
                        {searchMode ?
                            <Typography variant={"h5"}>
                                Book List - Search
                            </Typography>
                            :
                            <Typography variant={"h5"}>
                                Book List - Recommended Books
                            </Typography>
                        }
                    </CardContent>
                    <BooksTable books={books} handleAddToCart={handleAddToCart} handleRemoveBook={handleRemoveBook}/>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant={"h5"}>
                                    Shopping Cart
                                </Typography>
                                <BookCart cartBooks={cartBooks} handleRemoveFromCart={handleRemoveFromCart}/>
                                <BuyButton/>
                            </CardContent>
                        </Card>
                    </Grid>
                    {user && user.isAdmin &&
                        <Grid item xs={12}>
                            <Card>
                                <AddBookForm refreshBookList={refreshBookList}/>
                            </Card>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Books;