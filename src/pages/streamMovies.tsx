import { useParams } from "react-router-dom";
import { API_URL } from "../config";

export default function StreamMovies() {
    const {currentStream} = useParams()
  return (
    <>
      <iframe
        width="100%"
        height="250px"
        title="Streaming..."
        src={`https://multiembed.mov/?video_id=${currentStream}`}
        ></iframe>
     
      <p>Your movie is now streaming</p>
    </>
  );
}
