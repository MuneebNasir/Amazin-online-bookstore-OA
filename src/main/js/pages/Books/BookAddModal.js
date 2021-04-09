import React, {useState, useEffect, useContext, forwardRef } from "react";
import {
    Button,
    Modal,
    Form
} from "react-bootstrap";
import axios from "axios";

const BookAddModal = forwardRef((props, ref) => {
    let [authors, setAuthors] = useState([]);
    let [publishers, setPublishers] = useState([]);

    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [imageUrl, setImageUrl] = useState('');
    let [publicationYear, setPublicationYear] = useState('');
    let [price, setPrice] = useState('');
    let [stockCount, setStockCount] = useState('');
    let [rating, setRating] = useState('');
    let [genre, setGenre] = useState('');
    let [isbn, setISBN] = useState('');
    let [author, setAuthor] = useState('');
    let [length, setLength] = useState('');
    let [ageGroup, setAgeGroup] = useState('');
    let [publisher, setPublisher] = useState('');
    let genres = [
        "FANTASY",
        "SCIENCE_FICTION",
        "FICTION",
        "NON_FICTION",
        "HISTORY",
        "EDUCATION"
    ];

    let ageGroups = [
        "YOUNG",
        "ADULT",
        "SENIOR",
    ];

    let lengths = [
        "SHORT",
        "MEDIUM",
        "LONG",
    ];

    useEffect( () => {
        let isCancelled = false;

        const fetchAuthorsData = async () => {
            await axios({
                method: "get",
                url: '/api/authors',
            }).then(res => {
                setAuthors(res.data);
            })
        };

        const fetchPublishersData = async () => {
            await axios({
                method: "get",
                url: '/api/publishersViewAll',
            }).then(res => {
                setPublishers(res.data);
            })
        };

        if (!isCancelled) {
            fetchAuthorsData();
            fetchPublishersData();
        }

        return () => {
            isCancelled = true;
        };
    }, [])

    let submitForm = (event) => {
        event.preventDefault()
        ref.current.setModalState(false)
        setAuthors([])
        setAuthors([])

        let book = {
            "title": title,
            "description": description,
            "imageURL": imageUrl,
            "publicationYear": publicationYear,
            "price": price,
            "genre": genre,
            "stockCount": stockCount,
            "rating": rating,
            "ageGroup": ageGroup,
            "isbn": isbn,
            "length": length,
            "authorId": author,
            "publisherId": publisher
        }

        console.log(book)
        const addBook = async () => {
            await axios({
                method: "post",
                url: '/api/addNewBook',
                data:  JSON.stringify(book),
                headers: { "Content-Type": "application/json" },
            }).then(res => {
                props.reRender(true);
            })
        };

        addBook();
        props.reRender(true);
    }

    return (
        <Modal
            show={props.isOpen}
            onHide={() => ref.current.setModalState(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Add New Book to the Inventory
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitForm}>
                    <Form.Group controlId="formBookAddTitle">
                        <Form.Label>Book Title</Form.Label>
                        <Form.Control type="text" name="book-title" placeholder="Enter Title"
                                      onChange = {(e) => setTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBookAddDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="book-description" placeholder="Enter Description"
                                      onChange = {(e) => setDescription(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBookAddYear">
                        <Form.Label>Publication Year</Form.Label>
                        <Form.Control type="text" name="book-year" placeholder="Enter Year"
                                      onChange = {(e) => setPublicationYear(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBookAddISBN">
                        <Form.Label>Publication Year</Form.Label>
                        <Form.Control type="text" name="book-isbn" placeholder="Enter ISBN"
                                      onChange = {(e) => setISBN(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBookAddPrice">
                        <Form.Label>Price per Copy</Form.Label>
                        <Form.Control type="text" name="book-price" placeholder="Enter Price"
                                      onChange = {(e) => setPrice(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBookAddStock">
                        <Form.Label>Number of Copies in Stock</Form.Label>
                        <Form.Control type="text" name="book-stock" placeholder="Enter Number of copies"
                                      onChange = {(e) => setStockCount(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBookAddRating">
                        <Form.Label>Book Rating</Form.Label>
                        <Form.Control type="text" name="book-rating" placeholder="Enter Book Rating"
                                      onChange = {(e) => setRating(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBookAddAgeGroup">
                        <Form.Label>Book Age Group</Form.Label>
                        <Form.Control as="select" name="book-age-group" defaultValue="Choose..."
                                      onChange = {(e) => setAgeGroup(e.target.value)}>
                            <option value="null">Choose...</option>
                            {ageGroups.map((item, key) => {
                                return <option key={key} value={item}>{item}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBookAddLength">
                        <Form.Label>Book Length</Form.Label>
                        <Form.Control as="select" name="book-length" defaultValue="Choose..."
                                      onChange = {(e) => setLength(e.target.value)}>
                            <option value="null">Choose...</option>
                            {lengths.map((item, key) => {
                                return <option key={key} value={item}>{item}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBookAddGenre">
                        <Form.Label>Book Genre</Form.Label>
                        <Form.Control as="select" name="book-genre" defaultValue="Choose..."
                                      onChange = {(e) => setGenre(e.target.value)}>
                            <option value="null">Choose...</option>
                            {genres.map((item, key) => {
                                return <option key={key} value={item}>{item}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBookAddAuthor">
                        <Form.Label>Book Author</Form.Label>
                        <Form.Control as="select" name="book-author" defaultValue="Choose..."
                                      onChange = {(e) => setAuthor(e.target.value)}>
                            <option value="0">Choose...</option>
                            {authors.map(item => {
                                return <option key={item.id} value={item.id}>{item.lastName}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBookPublisher">
                        <Form.Label>Book Publisher</Form.Label>
                        <Form.Control as="select" name="book-publisher" defaultValue="Choose..."
                                      onChange = {(e) => setPublisher(e.target.value)}>
                            <option value="0">Choose...</option>
                            {publishers.map(item => {
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
})

export default BookAddModal;