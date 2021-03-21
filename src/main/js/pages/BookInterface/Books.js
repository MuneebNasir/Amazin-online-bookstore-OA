import React from "react";
import BookGrid from "./BookGrid";
const axios = require('axios');

class Books extends React.Component {

    constructor(props) {
        super(props);
        this.state = {books: []};
    }

    componentDidMount() {
        axios.get(`/api/booksViewAll`)
            .then(res => {
                const books = res.data;
                this.setState({ books });
            })
    }

    render() {
        return (
            <div>
                <BookGrid books={this.state.books}/>
            </div>
        )
    }
}

export default Books;