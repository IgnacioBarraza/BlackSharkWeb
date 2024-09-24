interface EyeInterface {
  width?: string,
  height?: string,
  className?: string
}
const Eye: React.FC<EyeInterface> = ({ width = '50', height = '50', className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={`icon icon-tabler icons-tabler-outline icon-tabler-eye ${className}`}
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"/>
      <path d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/>
      <path d="M21 12c-2.4 4-5.4 6-9 6-3.6 0-6.6-2-9-6 2.4-4 5.4-6 9-6 3.6 0 6.6 2 9 6"/>
    </svg>
  )
}
export default Eye