import { RotatingLines } from "react-loader-spinner";


export function Loader() {
  return (
    <span style={{placeContent:'center',display:'flex'}}>
      <RotatingLines
        visible={true}
        strokeColor="grey"
        width="60"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </span>
  );
}
