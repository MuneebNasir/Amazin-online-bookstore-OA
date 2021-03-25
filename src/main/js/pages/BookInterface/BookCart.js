import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";

let BookCart = (props) => {
    let [currentBooks, setCurrentBooks] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            timeout: 8000,
            url: `/api/findByIds?ids=` + props.cartBooks.join(),
        }).then(res => {
            setCurrentBooks(res.data)
        })
    }, [props.cartBooks])

    let columns = [
        {
            field: 'id',
            headerName: 'Remove from Cart',
            width: 250,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        size={"small"}
                        style={{ marginLeft: 16 }}
                        onClick={() => {
                            props.handleRemoveFromCart(params.value);
                        }}
                    >
                        Remove from Cart
                    </Button>
                </strong>
            )
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 250
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 180,
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
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={currentBooks} columns={columns} pageSize={5}/>
        </div>
    )
}

export default BookCart;