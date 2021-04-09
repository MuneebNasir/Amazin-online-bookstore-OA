import * as React from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {Button} from "@material-ui/core";
import BookInfoPopup from "./BookInfoPopup";
import {UserContext} from "../../services/provider/UserProvider";
import {useContext} from "react";

let DataTable = (props) => {
    const user = useContext(UserContext)
    const columns = [
        {
            field: 'id',
            headerName: 'Add to Cart',
            width: 450,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        size={"small"}
                        onClick={() => {
                            props.handleAddToCart(params.value);
                        }}
                    >
                        Add to Cart
                    </Button>
                    {user && user.isAdmin &&
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        size={"small"}
                        onClick={() => {
                            props.handleRemoveBook(params.value);
                        }}
                    >
                        Remove Book
                    </Button>}
                    <BookInfoPopup id={params.value}/>
                </strong>
            )
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 250,
        },
        {
            field: 'author',
            headerName: 'Author',
            type: 'string',
            width: 150,
            valueGetter: (params) => {
                return params.row.author.firstName + ' ' + params.row.author.lastName
            }
        },
        {
            field: 'publicationYear',
            headerName: 'Publication Year',
            type: 'integer',
            width: 175 },

        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 180,
        },
        {
            field: 'stockCount',
            headerName: 'Stock Count',
            type: 'number',
            description: 'Amount of stock left',
            width: 150,
        },
        {
            field: 'rating',
            headerName: 'Rating',
            type: 'number',
            description: 'Book rating',
            width: 150,
        },
        {
            field: 'publisher',
            headerName: 'Publisher',
            description: 'Book\'s Publisher',
            width: 150,
            valueGetter: (params) => {
                return params.row.publisher.name
            }
        },
    ];

    return (
        <div style={{height: 800, width: '100%'}}>
            <DataGrid rows={props.books} columns={columns} pageSize={15}/>
        </div>
    );
}

export default DataTable;