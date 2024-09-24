interface ShutEyeInterface {
  width?: string,
  height?: string,
  className?: string
}
const ShutEye: React.FC<ShutEyeInterface> = ({ width = '25', height='25', className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      className={`icon icon-tabler icons-tabler-outline icon-tabler-eye-off ${className}`}
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"/>
      <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"/>
      <path d="M16.681 16.673A8.717 8.717 0 0 1 12 18c-3.6 0-6.6-2-9-6 1.272-2.12 2.712-3.678 4.32-4.674m2.86-1.146A9.055 9.055 0 0 1 12 6c3.6 0 6.6 2 9 6-.666 1.11-1.379 2.067-2.138 2.87M3 3l18 18"/>
    </svg>
  )
}
export default ShutEye