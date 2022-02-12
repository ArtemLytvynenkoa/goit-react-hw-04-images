import PropTypes from "prop-types";
import { useEffect } from "react";
import s from "./Modal.module.css";

function Modal({ image, onClose }) {
    useEffect(() => {
        const escapeCloseModal = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', escapeCloseModal);
        
        return function cleanup() {
            window.removeEventListener('keydown', escapeCloseModal)
        };
    });

    const overlayClickCloseModal = e => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={s.overlay}
            onClick={overlayClickCloseModal}
        >
            <div className={s.modal}>
                <img src={image} alt={image} />
            </div>
        </div>
    );
} 

Modal.propTypes = {
    image: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Modal;