import React, {useState, useRef, useEffect, useContext, forwardRef} from "react";
import {
    Container,
    Button,
    Row,
    Col
} from "react-bootstrap";
import {UserContext} from "../../services/provider/UserProvider";

const BookView = forwardRef((props, ref) => {
    const user = useContext(UserContext)
    const [bookInfo, setBookInfo] = useState(props.bookInfo)

    return (
        <Container>
            <Row>
                <Col as="h4">{bookInfo.title}</Col>
                { user && user.isAdmin &&
                <Col className="align-items-end" sm="2">
                    <Button variant="outline-danger" className="float-right" onClick={() => {ref.current.removeBook(bookInfo.id)}}>Remove</Button>
                </Col>
                }
            </Row>
            <Row>
                <Col sm="4">
                    <img src={ bookInfo.imageURL ? "./img/covers/"+ bookInfo.imageURL : "./img/covers/default-book.png" } style={{width: "150px", margin: "0 auto", display: "block"}}/>
                </Col>
                <Col sm="8">
                    <Row>
                        <Col>Author:    {bookInfo.author.firstName} {bookInfo.author.lastName}</Col>
                    </Row>
                    <Row>
                        <Col>Publisher: {bookInfo.publisher.name} ({bookInfo.publisher.location})</Col>
                    </Row>
                    <Row>
                        <Col>Genre:     {bookInfo.genre}</Col>
                    </Row>
                    <Row>
                        <Col>Age Group: {bookInfo.ageGroup}</Col>
                    </Row>
                    <Row>
                        <Col>Length:    {bookInfo.length}</Col>
                    </Row>
                    <Row>
                        <Col>Year:      {bookInfo.publicationYear}</Col>
                    </Row>
                    <Row>
                        <Col>ISBN:      {bookInfo.isbn}</Col>
                    </Row>
                    <Row>
                        <Col>Price:     {bookInfo.price}</Col>
                    </Row>
                    <Row>
                        <Col>Rating:    {bookInfo.rating}</Col>
                    </Row>
                    <Row>
                        <Col>{bookInfo.description}</Col>
                    </Row>
                    <Row>
                        <Col><Button variant="success" onClick={() => {ref.current.addToCart([...props.cart, bookInfo])}}>Add to cart</Button></Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
})

export default BookView;