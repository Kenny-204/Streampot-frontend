import { RotatingLines } from "react-loader-spinner";


export function Loader({width='60'}) {
  return (
    <span style={{placeContent:'center',display:'flex'}}>
      <RotatingLines
        visible={true}
        strokeColor="grey"
        width={width}
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </span>
  );
}
