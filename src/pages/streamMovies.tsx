export default function StreamMovies({streaming}:{streaming:number}) {
    
  return (
    <>
      <iframe
        width="100%"
        height="250px"
        title="Streaming..."
        src={` https://multiembed.mov/?video_id=${streaming}`}
        ></iframe>
     
      <p>Your movie is now streaming</p>
    </>
  );
}
