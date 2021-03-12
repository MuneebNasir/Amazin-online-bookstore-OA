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

ReactDOM.render(
    <App />,
    document.getElementById('react')
)