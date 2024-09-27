import Eye from "@/app/logos-icons/Eye"
import ShutEye from "@/app/logos-icons/ShutEye"
interface ShowPassInterface {
  isPasswordVisible: boolean,
  togglePasswordVisibility: () => void,
}
const ShowPassword: React.FC<ShowPassInterface> = ({ isPasswordVisible, togglePasswordVisibility }) => {
  return (
    <div onClick={togglePasswordVisibility}>
      {!isPasswordVisible ? (
        <Eye width="29" height="29" />
      ) : (
        <ShutEye width="29" height="29" />
      )}
    </div>
  )
}
export default ShowPassword