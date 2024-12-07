import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ShowPassword = ({ isPasswordVisible, togglePasswordVisibility }) => {
    return (
        <div className="fixed ml-[16.5rem]" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? (
                <FontAwesomeIcon icon={faEyeSlash} style={{ color: "#000000" }} />
            ) : (
                <FontAwesomeIcon icon={faEye} style={{ color: "#000000" }} />
            )}
        </div>
    );
};