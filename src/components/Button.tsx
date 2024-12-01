import { FormEvent, MouseEvent, ReactNode } from "react";

const buttonStyle = {
  color: "#141414",
  backgroundColor: "#f33f3f",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
};

interface Button {
  className?: string;
  children: ReactNode;
  onClick?:  (e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => void;
  href?:any
  disabled?:boolean
  type?:"submit" | "reset" | "button"
}

export function Button({ children, className, onClick,href,disabled,type }: Button) {
  return (
    <a href={href}>
       <button className={className} style={buttonStyle} onClick={onClick} disabled={disabled} type={type!} >
      <b>{children}</b>
    </button>
      </a>
  );
}
