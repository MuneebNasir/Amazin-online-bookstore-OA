import React, {useEffect, useState} from 'react';
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import axios from "axios";
import {NotificationManager} from "react-notifications";
import AddPublishersForm from "./AddPublishersForm";
import PublisherSearchBar from "./PublisherSearchBar";
import PublishersTable from "./PublishersTable";

let Publishers = () => {
    let [publishers, setPublishers] = useState([]);
    let [search, setSearch] = useState('');
    let [togglePublishers, setTogglePublishers] = useState(false);

    let handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    let handleRemovePublisher = (id) => {
        axios({
            method: "delete",
            timeout: 8000,
            url: `/api/removePublisher?id=${id}`,
        }).then(res => {
            if (res.status === 200) {
                NotificationManager.success('Publisher Removed Successfully', 'Success!');
            } else {
                NotificationManager.error('Error while Removing Publisher Entry!', 'Error!');
            }
            refreshPublisherList();
        })
    }

    let refreshPublisherList = () => {
        setTogglePublishers(!togglePublishers);
    }

    useEffect(() => {
        if (search === '') {
            axios({
                method: "get",
                timeout: 8000,
                url: `/api/publishersViewAll`,
            }).then(res => {
                setPublishers(res.data)
            })
        } else {
            axios({
                method: "get",
                url: `/api/searchPublisherByName?name=${search}`,
            }).then(res => {
                setPublishers(res.data)
            })
        }
    }, [search, togglePublishers])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant={"h5"}>
                            Search
                        </Typography>
                        <PublisherSearchBar handleSearchChange={handleSearchChange}/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardContent>
                        <Typography variant={"h5"}>
                            Registered Publishers
                        </Typography>
                    </CardContent>
                    <PublishersTable publishers={publishers}  handleRemovePublisher={handleRemovePublisher}/>
                </Card>
            </Grid>
            <Grid item xs={6}>
                    <Grid item xs={12}>
                        <Card>
                            <AddPublishersForm refreshPublisherList={refreshPublisherList}/>
                        </Card>
                    </Grid>
            </Grid>
        </Grid>
    )
}

export default Publishers;