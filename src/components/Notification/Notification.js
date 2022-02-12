import PropTypes from "prop-types";
import s from "./Notification.module.css";

function Notification({ message }) {
    return (
        <div className={s.notification_block}>
            <p className={s.notification_text}>{message}</p>
        </div>
    )
}

Notification.propTypes = {
    message: PropTypes.string,
}

export default Notification;