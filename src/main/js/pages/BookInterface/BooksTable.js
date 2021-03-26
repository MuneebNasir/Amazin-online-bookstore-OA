import * as React from 'react';
import {DataGrid, GridColDef} from '@material-ui/data-grid';
import {Button} from "@material-ui/core";
import BookInfoPopup from "./BookInfoPopup";

let DataTable = (props) => {
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
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        size={"small"}
                        onClick={() => {
                            props.handleRemoveBook(params.value);
                        }}
                    >
                        Remove Book
                    </Button>
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
            field: 'publicationYear',
            headerName: 'Publication Year',
            type: 'number',
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
    ];

    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid rows={props.books} columns={columns} pageSize={15}/>
        </div>
    );
}

export default DataTable;