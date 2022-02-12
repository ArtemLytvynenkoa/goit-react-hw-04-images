import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem";
import s from "./ImageGallery.module.css";

function ImageGallery({ images, onClick }) {
    return (
        <ul className={s.gallery}>
            {images.map(({ id, webformatURL }, index) => (
                <ImageGalleryItem
                    key={id}
                    image={webformatURL}
                    onClick={()=>onClick(index)}
                />
            ))}
        </ul>
    )                
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired
        })
    )
}

export default ImageGallery;