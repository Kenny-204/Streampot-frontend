import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "./Icons";

export function PrevButton() {
  const navigate = useNavigate();
  return (
    <button
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: 2,
        color: "#f33f3f",
        backgroundColor: "rgba(0,0,0,0.55)",
        border: "none",
        borderRadius: "50%",
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "16px",
      }}
      onClick={() => navigate(-1)}
    >
      <ChevronLeftIcon />
    </button>
  );
}
