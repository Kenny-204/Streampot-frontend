import { useNavigate } from "react-router-dom";

const buttonStyle = {
  color: "red",
  fontSize: "40px",
  backgroundColor: "transparent",
  border: "none",
};
export function PrevButton() {
const navigate = useNavigate()
  return (
    <button style={buttonStyle}  onClick={() => {
      navigate(-1);
    }} >
      <span className="fa fa-angle-left"> </span>
    </button>
  );
}
