import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from "axios";
import {Typography} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

let AlertDialogSlide = (props) => {
    let [open, setOpen] = React.useState(false);
    let [book, setBook] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (props.id !== null) {
            axios({
                method: "get",
                url: `/api/book/${props.id}`,
            }).then(res => {
                setBook(res.data)
            })
        }
    }, [])

    return (
        <span>
            <Button variant="outlined" color="primary" onClick={handleClickOpen} size={"small"}>
                Item Info
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{book.title}</DialogTitle>
                <DialogContent>
                    <Typography variant={"body1"}> Book ID: {book.id}</Typography>
                    <Typography variant={"body1"}> Title: {book.title}</Typography>
                    <Typography variant={"body1"}> Author: {props.author}</Typography>
                    <Typography variant={"body1"}>Publisher: {props.publisher}</Typography>
                    <Typography variant={"body1"}> Description: {book.description}</Typography>
                    <Typography variant={"body1"}> imageURL: {book.imageURL}</Typography>
                    <Typography variant={"body1"}> Publication Year: {book.publicationYear}</Typography>
                    <Typography variant={"body1"}> Price: {book.price}</Typography>
                    <Typography variant={"body1"}> Stock Count: {book.stockCount}</Typography>
                    <Typography variant={"body1"}> Rating: {book.rating}</Typography>
                    <Typography variant={"body1"}> ISBN: {book.isbn}</Typography>
                </DialogContent>

            </Dialog>
        </span>
    );
}

export default AlertDialogSlide;