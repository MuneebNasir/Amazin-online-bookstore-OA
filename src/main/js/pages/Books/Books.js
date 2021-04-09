import React, {useState, useEffect, useContext, useRef} from "react";
import {
    Container,
    Button,
    Row,
    Col
} from "react-bootstrap";
import axios from "axios";
import {UserContext} from "../../services/provider/UserProvider";
import BookView from "./BookView";
import BookAddModal from "./BookAddModal";
import BookCartModal from "./BookCartModal";

const Books = (props) => {
    const user = useContext(UserContext)
    const [render, setRender] = useState(true)
    const [cart, setCart] = useState([])
    const [books, setBooks] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openCartModal, setOpenCartModal] = useState(false)

    const modalAddShow = useRef({
        setModalState: (state) => setOpenModal(state),
    });

    const modalCartShow = useRef({
        setModalState: (state) => setOpenCartModal(state),
        removeFromCart: (book) => {
            setCart(cart.filter((e) => (e !== book)))
        }
    });

    const bookManipulation = useRef( {
        removeBook: async (id) => {
                await axios({
                    method: "delete",
                    timeout: 8000,
                    url: `/api/removeBook?id=${id}`,
                    headers: { "Content-Type": "application/json" },
                }).then(res => {
                    setRender(true);
                })

            console.log("ID: "+ id)
        },
        addToCart: (cartItems) => {
            setCart(cartItems)
        }
    })

    useEffect(() => {

        const fetchData = async () => {
            const result = await axios(
                '/api/booksViewAll',
            );
            setBooks(result.data);
        };

        if(render) {
            fetchData();
        }

        return () => {
            setRender(false);
        };
    });

    return (
        <>
        <Container fluid>
            <Row className="mt-1">
                <Col as="h2" className="mr-auto">Book List</Col>

                    <Col className="align-items-end" sm="2">
                        <Button variant="outline-success" className="float-right" onClick={() => {setOpenCartModal(true)}}>Cart</Button>
                        { user && user.isAdmin &&
                            <Button className="float-right mr-3" onClick={() => {setOpenModal(true)}}>Add New Book</Button>
                        }
                    </Col>
            </Row>
            <Row>
                <Col>
                    {books.map(item => {
                        return <BookView key={item.id} ref={bookManipulation} cart={cart} bookInfo={item} />
                    })}
                </Col>
            </Row>
        </Container>
        <BookAddModal isOpen={openModal} reRender={setRender} ref={modalAddShow} />
        <BookCartModal isOpen={openCartModal} cartBooks={cart} ref={modalCartShow} />
        </>
    )
}

export default Books;