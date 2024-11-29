import { tempMovieData } from "../components/Main"
import { MovieList } from "../components/MovieList"

function History({setCurrentMovie}:{setCurrentMovie:Function}){
 return <>
 
 <MovieList list={tempMovieData} setCurrentMovie={setCurrentMovie} >
    <a href="#" style={{color:'red',position:'absolute',right:'6%',top:'3%'}} >Clear history</a>
 </MovieList>
 </>   
}

export default History