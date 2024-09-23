interface ReturnLogoProps {
  width?: string,
  height?: string,
  className?: string
}

const ReturnLogo: React.FC<ReturnLogoProps> = ({ width = '50', height = '50', className }) => {
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
      className={`icon icon-tabler icons-tabler-outline icon-tabler-arrow-back-up ${className}`}
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"/>
      <path d="m9 14-4-4 4-4"/>
      <path d="M5 10h11a4 4 0 1 1 0 8h-1"/>
    </svg>
  )
}

export default ReturnLogo