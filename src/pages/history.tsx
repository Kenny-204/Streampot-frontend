import { MovieList } from "../components/MovieList"

function History(){
 return <>
 
 <MovieList>
    <a href="#" style={{color:'red',position:'absolute',right:'6%',top:'3%'}} >Clear history</a>
 </MovieList>
 </>   
}

export default History