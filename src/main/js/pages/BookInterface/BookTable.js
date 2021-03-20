import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(title, description, imageUrl, publicationYear, format, price, stockCount, rating, isbn) {
    return { title, description, imageUrl, publicationYear, format, price, stockCount, rating, isbn };
}

const rows = [
    createData('Lord of the Rings', "A Really long story", '/yeetinc/', 1964, "Paperback", 69.420, 124, 44, 'ABC123'),
];

let BookTable = (props) => {
    const classes = useStyles();

    console.log(props)

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple book table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Book ID</TableCell>
                        <TableCell>Book Title</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Image URL</TableCell>
                        <TableCell align="right">Publication Year</TableCell>
                        <TableCell align="right">Format</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Stock Count</TableCell>
                        <TableCell align="right">Rating</TableCell>
                        <TableCell align="right">ISBN</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.books.map((row) => (
                        <TableRow key={row.title}>
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.imageUrl}</TableCell>
                            <TableCell align="right">{row.publicationYear}</TableCell>
                            <TableCell align="right">{row.format}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.stockCount}</TableCell>
                            <TableCell align="right">{row.rating}</TableCell>
                            <TableCell align="right">{row.isbn}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BookTable;