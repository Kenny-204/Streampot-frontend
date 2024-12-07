const buttonStyle = {
  color: "red",
  fontSize: "40px",
  backgroundColor: "transparent",
  border: "none",
};
export function PrevButton({onClick}:any) {

  return (
    <button style={buttonStyle} onClick={onClick} >
      <span className="fa fa-angle-left"> </span>
    </button>
  );
}
