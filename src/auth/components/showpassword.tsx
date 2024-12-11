import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ShowPassword = ({ isPasswordVisible, togglePasswordVisibility }) => {
    return (
        <div onClick={togglePasswordVisibility}>
            {isPasswordVisible ? (
                <FontAwesomeIcon icon={faEyeSlash} style={{ color: "#fff" }} />
            ) : (
                <FontAwesomeIcon icon={faEye} style={{ color: "#fff" }} />
            )}
        </div>
    );
};