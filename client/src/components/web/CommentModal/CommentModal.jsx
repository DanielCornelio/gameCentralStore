import React from "react";
import { Modal, Button, Form, FloatingLabel, Stack } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import { FaStar } from "react-icons/fa";
import "./CommentModal.scss";

export const CommentModal = ({ showModal, setShowModal }) => {
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Modal size="lg" show={showModal} backdrop="static" keyboard={false}    >
                <Modal.Header className="d-flex justify-content-between align-items-center border-0">
                    <Modal.Title>
                        ¿Qué te pareció Resident Evil 0?
                    </Modal.Title>
                    <GrClose size={20} className="btn-close" onClick={handleCloseModal} />
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Stack gap={4}>
                            <Stack direction='horizontal' gap={1} className='text-light mb-0 align-items-center justify-content-center '>
                                <FaStar size={25} />
                                <FaStar size={25} />
                                <FaStar size={25} />
                                <FaStar size={25} />
                                <FaStar size={25} />
                            </Stack>
                            <FloatingLabel controlId="floatingInput" label="Agregar título">
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                />
                            </FloatingLabel>
                                    
                            <FloatingLabel controlId="floatingTextarea2" label="Deja tu comentario" className="custom-floating-label">
                                <Form.Control
                                    as="textarea"
                                    placeholder=""
                                    style={{ height: "150px" }}
                                />
                            </FloatingLabel>

                            <div className="d-grid">
                                <Button size="lg" type="submit">
                                    Enviar
                                </Button>
                            </div>
                        </Stack>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};
