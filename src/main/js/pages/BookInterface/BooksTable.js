import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import {NotificationManager} from "react-notifications";
import BookInformation from "./BookInformation";
import {Link, Route, Switch, BrowserRouter as Router} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
class BooksTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {books: []};
    }

    setBooks() {
        axios({
            method: "get",
            timeout: 8000,
            url: `/api/booksViewAll`,
        }).then(res => {
                const books = res.data;
                this.setState({ books });
            })
    }

    componentDidMount() {
        this.setBooks();
    }

    componentDidUpdate() {
        this.setBooks();
    }

    render() {
        return (
            <div>
                <EnhancedTable books={this.state.books}/>
            </div>
        )
    }
}
export default BooksTable;

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
    { id: 'publicationYear', numeric: true, disablePadding: false, label: 'Publication Year' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price ($)' },
    { id: 'stockCount', numeric: true, disablePadding: false, label: 'Stock Count' },
    { id: 'rating', numeric: true, disablePadding: false, label: 'Rating' },
];

function EnhancedTableHead(value) {
    const { classes, order, orderBy, onRequestSort } = value;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

let selectedBook;
function setSelectedBook(selected){
    selectedBook = selected;
}
function getSelectedBook(){
    return selectedBook;
}

function EnhancedTable(props) {
    const toolbar = useToolbarStyles();
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('title');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const length = props.books.length
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    let deletingBook;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
            setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => {
        if(selected.indexOf(name) !== -1)
            setSelectedBook(name);
    };

    const handleRemoveBookClick = (numSelected) => {
        if (numSelected > 1){
            NotificationManager.error('Please select only one book to delete.', 'Error!');
        } else
            axios.get(`/api/searchByTitle?title=${getSelectedBook()}`)
                .then(res => {
                    deletingBook = res.data[0].id;
                    axios({
                        method: "delete",
                        timeout: "8000",
                        url: `/api/removeBook?id=${deletingBook}`,
                    }).then(res => {
                        if (res.status === 200) {
                            NotificationManager.success('Removal of Book Entry Successful', 'Success!');
                        } else {
                            NotificationManager.error('Error while Removing Book Entry!', 'Error!');
                        }
                    })
                })
    }

    const bookInformation = () => {
        console.log("Clicked")
        return (
            <Switch>
                <Route path="/BookInformation">
                    <BookInformation/>
                </Route>
            </Switch>
        );
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.length - page * rowsPerPage);

    return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Toolbar
                        className={clsx(toolbar.root, {
                            [classes.highlight]: selected.length > 0,
                        })}
                    >
                        {selected.length > 0 ? (
                            <Typography className={toolbar.title} color="inherit" variant="subtitle1" component="div">
                                {selected.length} selected
                            </Typography>
                        ) : (
                            <Typography className={toolbar.title} variant="h6" id="tableTitle" component="div">
                                Title
                            </Typography>
                        )}
                        {selected.length > 0 ? (
                            <Tooltip title="Delete">
                                <IconButton aria-label="delete" onClick={function () {
                                    handleRemoveBookClick(selected.length);
                                    setSelected([]);
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        ) : null
                        }
                    </Toolbar>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={length}
                            />
                            <TableBody>
                                {stableSort(props.books, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.title);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                button
                                                component={Link}
                                                to="/BookInformation"
                                                onClick={(event) => handleClick(event, row.title)}
                                                // role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        onClick={(event) => handleClick(event, row.title)}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                                    {row.title}
                                                </TableCell>
                                                <TableCell align="right">{row.publicationYear}</TableCell>
                                                <TableCell align="right">{row.price}</TableCell>
                                                <TableCell align="right">{row.stockCount}</TableCell>
                                                <TableCell align="right">{row.rating}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[15, 25, 50, 100]}
                        component="div"
                        count={props.books.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>

    );
}
