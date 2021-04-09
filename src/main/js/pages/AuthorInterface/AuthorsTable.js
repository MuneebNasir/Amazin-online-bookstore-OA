import React, {useContext} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {Button} from "@material-ui/core";
import {UserContext} from "../../services/provider/UserProvider";

let AuthorsTable = (props) => {
    const user = useContext(UserContext)
    const columns = [
        {
            field: 'id',
            headerName: 'Option',
            width: 450,
            renderCell: (params) => (
                <strong>
                    {user && user.isAdmin &&
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        size={"small"}
                        onClick={() => {
                            props.handleRemoveAuthor(params.value);
                        }}
                    >
                        Remove Author
                    </Button>}
                </strong>
            )
        },
        {
            field: 'firstName',
            headerName: 'First Name',
            width: 250,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 175
        },
    ];

    return (
        <div style={{height: 800, width: '100%'}}>
            <DataGrid rows={props.authors} columns={columns} pageSize={15}/>
        </div>
    );
}

export default AuthorsTable;