import {AnimeCard} from './AnimeCard';

 export const AnimeList = ({animes, onSelectAnime}) =>{
  
 if(!animes || animes.length === 0){
    return(
        <div className='text-center text-2xl'>
            <p className='text-red-700'>Nenhum anime para exibir</p>
        </div>
    )
     
 }

     return(
        <div className=' 

        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-y-10 
        gap-x-10
        md:gap-y-10 

                 bg-zinc-900 '>
          {animes.map(anime =>  
          <AnimeCard 
          key={anime.mal_id} 
          {...anime}
          onClick={() => onSelectAnime(anime)}
          />)}
         </div>
           )
           };


