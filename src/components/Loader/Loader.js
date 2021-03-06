import { BallTriangle } from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./Loader.module.css";


function Loader() {
    return (
        <div className={s.loader}>
            <BallTriangle 
                heigth="100"
                width="100"
                color='#3f51b5'
                ariaLabel='loading'
                className={s.loader}
            />
        </div>
        
    )
}

export default Loader;
