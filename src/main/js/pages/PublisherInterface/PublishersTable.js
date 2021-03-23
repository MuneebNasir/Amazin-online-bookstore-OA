import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";

class PublisherComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {publishers: []};
    }

    setPublishers() {
        axios.get(`/api/publishersViewAll`)
            .then(res => {
                const publishers = res.data;
                this.setState({publishers});
            })
    }

    componentDidMount() {
        this.setPublishers();
    }

    componentDidUpdate() {
        this.setPublishers();
    }

    render() {
        return (
            <div>
                <PublishersTable publishers={this.state.publishers}/>
            </div>
        )
    }
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});

let PublishersTable = (props) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="Publishers Table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Publisher ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Location</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.publishers.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.location}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PublisherComponent;