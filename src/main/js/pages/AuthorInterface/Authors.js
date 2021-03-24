import React from 'react'
import AuthorComponent from "./AuthorsTable";
const axios = require('axios');

class Authors extends React.Component {

    constructor(props) {
        super(props);
        this.state = {authors: []};
    }

    componentDidMount() {
        axios.get(`/api/authors`)
            .then(res => {
                const authors = res.data;
                this.setState({authors});
            })
    }

    render() {
        return (
            <div>
                <AuthorComponent authors={this.state.authors}/>
            </div>
        )
    }
}

export default Authors;