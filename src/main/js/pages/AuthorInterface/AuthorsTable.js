import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";

class AuthorComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {authors: []};
    }

    setAuthors() {
        axios.get(`/api/authors`)
            .then(res => {
                const authors = res.data;
                this.setState({authors});
            })
    }

    componentDidMount() {
        this.setAuthors();
    }

    componentDidUpdate() {
        this.setAuthors();
    }

    render() {
        return (
            <div>
                <AuthorsTable authors={this.state.authors}/>
            </div>
        )
    }
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});

let AuthorsTable = (props) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="Authors Table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.authors.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.firstName}</TableCell>
                            <TableCell>{row.lastName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AuthorComponent;