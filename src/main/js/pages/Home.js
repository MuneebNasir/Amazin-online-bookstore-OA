import BookTable from "./BookInterface/BookTable";
import LeftDrawer from "./BookInterface/LeftDrawer";
import SearchBar from "./BookInterface/searchBar";
import {Card} from "@material-ui/core";

const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {books: []};
    }

    componentDidMount() {
        axios.get(`api/booksViewAll`)
            .then(res => {
                const books = res.data;
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



export default Home;