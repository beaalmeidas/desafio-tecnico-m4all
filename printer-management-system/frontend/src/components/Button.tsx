import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-[#660099] text-white px-4 py-2 rounded hover:bg-[#380054] cursor-pointer"
    >
      {children}
    </button>
  )
}
