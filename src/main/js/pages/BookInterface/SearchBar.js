import React from 'react';
import axios from "axios";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete'

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchedBooks: []};

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event, value) {
        console.log(value);
        axios({
            method: "get",
            url: `/api/searchByTitle?title=${value}`,
        })
            .then(res => {
                const searchedBooks = res.data;
                this.setState({searchedBooks});
            })
    }

    render() {
        return (
            <div>
                <Autocomplete
                    id="combo-box-demo"
                    options={this.state.searchedBooks}
                    getOptionLabel={(option) => option.title}
                    style={{width: 500}}
                    onInputChange={this.handleInputChange}
                    renderInput={
                        (params) =>
                            <TextField {...params}
                                       label="Search a Book"
                                       variant="outlined"/>}
                />
            </div>
        );
    }
}
