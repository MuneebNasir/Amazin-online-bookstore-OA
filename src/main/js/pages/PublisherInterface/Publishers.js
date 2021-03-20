import React from "react";
import PublishersTable from "./PublishersTable";
const axios = require('axios');

class Publishers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {publishers: []};
    }

    componentDidMount() {
        axios.get(`/api/publishersViewAll`)
            .then(res => {
                const publishers = res.data;
                this.setState({ publishers });
            })
    }

    render() {
        return (
            <div>
                <PublishersTable publishers={this.state.publishers}/>
            </div>
        )
    }
}

export default Publishers;