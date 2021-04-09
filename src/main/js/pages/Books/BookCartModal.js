import React, {useState, useEffect, useContext, forwardRef } from "react";
import {
    Button,
    Table,
    Modal,
    Form
} from "react-bootstrap";

const BookCartModal = forwardRef((props, ref) => {
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
                    Shopping Cart
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.cartBooks.length > 0 ?
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.cartBooks.map((item, key) => {
                                return  <tr key={key}>
                                            <td>{key}</td>
                                            <td>{item.title}</td>
                                            <td>{item.price}</td>
                                        </tr>
                            })}
                        </tbody>
                    </Table>
                    :
                    <>Cart is Empty</>
                }
            </Modal.Body>
        </Modal>
    )
})

export default BookCartModal;