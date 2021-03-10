import BookTable from "./BookTable";
import LeftDrawer from "./LeftDrawer";
import SearchBar from "./searchBar";
import {Card} from "@material-ui/core";

const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {books: []};
    }

    componentDidMount() {
        axios.get(`api/books`)
            .then(res => {
                const books = res.data._embedded.books;
                this.setState({ books });
            })
    }

    render() {
        return (
            <div>
                <LeftDrawer books={this.state.books}/>
            </div>
        )
    }
}

class BookList extends React.Component{
    render() {
        console.log(this.props.books);
        const books = this.props.books.map(book =>
            <Book key={book.id} book={book}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image URL</th>
                    <th>Publication Year</th>
                    <th>Format</th>
                    <th>Price</th>
                    <th>Stock Count</th>
                    <th>Rating</th>
                    <th>ISBN</th>
                </tr>
                {books}
                </tbody>
            </table>
        )
    }
}

class Book extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.book.title}</td>
                <td>{this.props.book.description}</td>
                <td>{this.props.book.imageURL}</td>
                <td>{this.props.book.publicationYear}</td>
                <td>{this.props.book.format}</td>
                <td>{this.props.book.price}</td>
                <td>{this.props.book.stockCount}</td>
                <td>{this.props.book.rating}</td>
                <td>{this.props.book.isbn}</td>
            </tr>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('react')
)