import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, CardHeader, Grid, Typography} from "@material-ui/core";
import axios from "axios";
import BooksTable from "./BooksTable";
import AddBookForm from "./AddBookForm";
import BookCart from "./BookCart";
import BuyButton from "./BuyButton";
import SearchBar from "./SearchBar";

let Books = () => {
    let [books, setBooks] = useState([]);
    let [cartBooks, setCartBooks] = useState([]);
    let [search, setSearch] = useState('');
    let [toggleRemove, setToggleRemove] = useState(false);

    let handleAddToCart = (book) => {
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
            setToggleRemove(!toggleRemove);
        })
    }

    useEffect(() => {
        if (search === '') {
            axios({
                method: "get",
                timeout: 8000,
                url: `/api/booksViewAll`,
            }).then(res => {
                setBooks(res.data)
            })
        } else {
            axios({
                method: "get",
                url: `/api/searchByTitle?title=${search}`,
            }).then(res => {
                setBooks(res.data)
            })
        }
    }, [search, toggleRemove])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant={"h5"}>
                            Search
                        </Typography>
                        <SearchBar handleSearchChange={handleSearchChange}/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardContent>
                        <Typography variant={"h5"}>
                            Book List
                        </Typography>
                    </CardContent>
                    <BooksTable books={books} cartBooks={cartBooks} handleAddToCart={handleAddToCart} handleRemoveBook={handleRemoveBook}/>
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
                                {/*<Button variant={"contained"} color={"primary"}>Checkout</Button>*/}
                                <BuyButton/>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <AddBookForm/>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Books;