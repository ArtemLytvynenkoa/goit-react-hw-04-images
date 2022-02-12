import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ image, onClick }) {
    return (
        <li className={s.gallery_item}>
            <img
                className={s.image}
                src={image}
                alt={image}
                onClick={onClick}
            />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default ImageGalleryItem;