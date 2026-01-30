export const AnimeDetails = ({ anime, onClose }) => {
  return (
    <div className="
      fixed 
      inset-0
      bg-black/80
      flex items-center justify-center
      z-50
      mx-auto
      
    ">
      <div className="
        bg-zinc-900
        w-[90%]
        h-full
        p-6
        rounded-xl
        text-white
        relative
      ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl cursor-pointer text-red-800"
        >
          ✕
        </button>

        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-2  h-[80vh]">
            <img src={anime.images?.jpg?.image_url} 
            alt={anime.title} 
            className=" h-[50vh] bg-cover my-auto mx-auto  "/>

        <div className="grid h-[70%] my-auto ">
            <h1 className="text-2xl font-bold text-red-400">
          {anime.title}
         </h1>

        <p className="text-green-300 ">
        <span > Quantidade de eps:</span> {anime.episodes}
        </p>

        <p className="text-blue-300">
         Ano:  {anime.year}
        </p>

        <p className="text-amber-200">
           Nota: {anime.score}
        </p>

       
         <p className="leading-8 text-lg font-bold text-neutral-300">
            {anime.synopsis}
        </p> 


        </div>

        </div>

      </div>
    </div>
  )
}
