import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { GrClose } from "react-icons/gr";
import './TermsModal.scss'

export const TermsModal = ({ showModal, setShowModal }) => {
    const handleCloseModal = () => setShowModal(false);
    return (
        <>
            <Modal
                size="xl"
                show={showModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className='d-flex justify-content-between align-items-center'>
                    <Modal.Title id="terms-modal">
                        Términos y condiciones
                    </Modal.Title>
                        <GrClose size={20} className='btn-close' onClick={handleCloseModal}/>
                </Modal.Header>
                <Modal.Body>
                    <p>Bienvenido a <span className='resaltar'>Game Central Store</span> (en adelante, "el Sitio"). Al registrarte y crear una cuenta en nuestro Sitio, aceptas cumplir y estar sujeto a los siguientes términos y condiciones. Si no estás de acuerdo con estos términos, por favor no te registres ni utilices el Sitio.</p>

                    <h5>1. Elegibilidad</h5>
                    <p>Para registrarte y crear una cuenta en <span className='resaltar'>Game Central Store</span> , debes:</p>
                    <ul>
                        <li>Ser una persona real y proporcionar información veraz, teniendo en cuenta el contexto educativo del proyecto.</li>
                        <li>Tener al menos 18 años de edad o contar con la supervisión de un padre o tutor.</li>
                    </ul>

                    <h5>2. Información de la Cuenta</h5>
                    <p>Al registrarte aceptas proporcionar la siguiente información:</p>
                    <ul>
                        <li><b>Datos Ficticios Recomendados: </b>Dado que este es un proyecto educativo, se recomienda encarecidamente NO utilizar información personal real (como contraseñas que uses en otros servicios, números de tarjetas de crédito reales, etc.). Utiliza datos de prueba.</li>
                        <li><b>Precisión de la Información: </b>Te comprometes a proporcionar información completa y exacta durante el registro, entendiendo que es con fines de demostración.</li>
                        <li><b>Confidencialidad de la Cuenta: </b>Eres responsable de la confidencialidad de la contraseña que elijas y de todas las actividades que ocurran bajo tu cuenta.</li>
                    </ul>

                    <h5>3. Propósito del Registro</h5>
                    <p>La creación de una cuenta te permite acceder a funcionalidades del sitio propias de un ecommerce (como simular compras, guardar items en un carrito, revisar un historial de pedidos simulado, etc.) con el único objetivo de demostrar las habilidades técnicas aprendidas en el bootcamp.</p>

                    <h5>4. Propiedad de los Datos</h5>
                    <p><b>Datos No Reales:</b> Toda la información asociada a las cuentas de usuario (perfiles, "pedidos") es de naturaleza ficticia y se almacenará únicamente para la demostración del proyecto durante su ciclo de vida.</p>

                    <p><b>Eliminación de Datos: </b>Todos los datos de la cuenta pueden ser eliminados permanente y definitivamente en cualquier momento, especialmente al finalizar la exhibición del proyecto o del bootcamp.</p>

                    <h5>5. Conducta del Usuario</h5>
                    <p>Al registrarte, aceptas no:</p>
                    <ul>
                        <li>Utilizar la cuenta para propósito no autorizado.</li>
                        <li>Realizar cualquier acción que pueda dañar, sobrecargar o perjudicar el funcionamiento del Sitio, como intentos de inyección de código (SQLi, XSS) o ataques de fuerza bruta.</li>
                    </ul>

                    <h5>6. Suspensión o Terminación de la Cuenta</h5>
                    <p>Nos reservamos el derecho de suspender, desactivar o eliminar tu cuenta, sin previo aviso, si determinamos que has violado estos términos o si tu uso del Sitio interfiere con su propósito educativo.</p>

                    <p><b>Al marcar la casilla "Acepto los Términos y Condiciones" durante el registro, confirmas que has leído, comprendido y aceptado estar sujeto a estos términos de registro.</b></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
