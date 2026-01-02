import React, { type ButtonHTMLAttributes } from 'react'



type Props = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({children,danger,className,...props} :  {children: React.ReactNode,danger?:boolean,className?: string } & Props) {
  return (
    <button type={props.type || "button"} onClick={props.disabled ? () => null : (props.onClick || (() => null))} className={`${props.disabled ? "opacity-30 pointer-events-none" : ""} ${className}  h-max text-nowrap p-2 px-4 text-lg font-mono text-white rounded cursor-pointer transition-colors ${danger ? "bg-red-400/80 hover:bg-red-400" : "bg-green-400/80 hover:bg-green-400"} border hover:border-black`}>
        {children}
    </button>
  )
}
