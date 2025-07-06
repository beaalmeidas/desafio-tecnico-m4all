import { buttonHTMLAttributes } from "react"

interface buttonProps extends buttonHTMLAttributes<HTMLbuttonElement> {
  children: React.ReactNode
}

export default function button({ children, ...props }: buttonProps) {
  return (
    <button
      {...props}
      className="bg-[#660099] text-white px-4 py-2 rounded hover:bg-[#380054]"
    >
      {children}
    </button>
  )
}
