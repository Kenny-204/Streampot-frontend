const buttonStyle = {
  color: "#141414",
  backgroundColor: "#f33f3f",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
};

interface Button {
  className?: string;
  children: any;
  onClick?: any;
}

export function Button({ children, className, onClick }: Button) {
  return (
    <button className={className} style={buttonStyle} onClick={onClick}>
      <b>{children}</b>
    </button>
  );
}
