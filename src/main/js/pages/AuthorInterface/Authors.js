import AuthorsTable from "./AuthorsTable";
import React, {useEffect, useState} from 'react';
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import axios from "axios";
import {NotificationManager} from "react-notifications";
import AuthorSearchBar from "./AuthorSearchBar";
import AddAuthorForm from "./AddAuthorForm";

let Authors = () => {
    let [authors, setAuthors] = useState([]);
    let [search, setSearch] = useState('');
    let [toggleAuthors, setToggleAuthors] = useState(false);

    let handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    let handleRemoveAuthor = (id) => {
        axios({
            method: "delete",
            timeout: 8000,
            url: `/api/remove-author?id=${id}`,
        }).then(res => {
            if (res.status === 200) {
                NotificationManager.success('Author Removed Successfully', 'Success!');
            } else {
                NotificationManager.error('Error while Removing Author Entry!', 'Error!');
            }
            refreshAuthorList();
        })
    }

    let refreshAuthorList = () => {
        setToggleAuthors(!toggleAuthors);
    }

    useEffect(() => {
        if (search === '') {
            axios({
                method: "get",
                timeout: 8000,
                url: `/api/authors`,
            }).then(res => {
                setAuthors(res.data)
            })
        } else {
            axios({
                method: "get",
                url: `/api/authorsByFirstName?firstName=${search}`,
            }).then(res => {
                setAuthors(res.data)
            })
        }
    }, [search, toggleAuthors])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant={"h5"}>
                            Search
                        </Typography>
                        <AuthorSearchBar handleSearchChange={handleSearchChange}/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardContent>
                        <Typography variant={"h5"}>
                            Registered Authors
                        </Typography>
                    </CardContent>
                    <AuthorsTable authors={authors}  handleRemoveAuthor={handleRemoveAuthor}/>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Grid item xs={12}>
                    <Card>
                        <AddAuthorForm refreshAuthorList={refreshAuthorList}/>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Authors;