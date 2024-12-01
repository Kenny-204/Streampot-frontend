export default function StreamMovies({streaming}:{streaming:number}) {
    
  return (
    <>
      <iframe
        width="500px"
        height="250px"
        title="Streaming..."
        src={` https://multiembed.mov/?video_id=${streaming}`}
        ></iframe>
     
      helllo
    </>
  );
}
