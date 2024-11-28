import { RotatingLines } from "react-loader-spinner";

const loaderStyle = {

}

export function Loader() {
  return (
    <span style={{placeContent:'center',display:'flex'}}>
      <RotatingLines
        visible={true}
        height="60"
        strokeColor="grey"
        width="60"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={loaderStyle}
        wrapperClass=""
      />
    </span>
  );
}
