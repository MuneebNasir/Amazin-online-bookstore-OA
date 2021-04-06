import React from 'react';
import {DataGrid, GridColDef} from '@material-ui/data-grid';
import {Button} from "@material-ui/core";

let PublishersTable = (props) => {
    const columns = [
        {
            field: 'id',
            headerName: 'Option',
            width: 450,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        size={"small"}
                        onClick={() => {
                            props.handleRemovePublisher(params.value);
                        }}
                    >
                        Remove Publisher
                    </Button>
                </strong>
            )
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 250,
        },
        {
            field: 'location',
            headerName: 'Publishers Location',
            width: 175
        },
    ];

    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid rows={props.publishers} columns={columns} pageSize={15}/>
        </div>
    );
}

export default PublishersTable;