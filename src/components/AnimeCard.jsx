export const AnimeCard = ({title, images, synopsis}) =>  {
    return(
        <div className=" 
        xl:w-[20vw]
        group
      relative
      cursor-pointer
      bg-zinc-800
      rounded-xl
      overflow-hidden
      hover:scale-[1.02]
      transition
              ">
            <div className="   flex justify-center">
            <h1 className=" my-1 text-gray-50 line-clamp-1">{title}</h1>
            </div>

            <div className="flex items-center justify-center h-72 ">
            <img
            src={images?.jpg?.image_url}
            alt={title} 
            className=" h-64 object-cover
            w-1/2
            
            "
            />
            </div>
             <div
        className="
          absolute
          inset-0
          bg-black/80
          opacity-0
          group-hover:opacity-100
          transition
          duration-300
        "
      />
      
            
            <p className="    
            
            absolute
          bottom-0
          left-0
          right-0
          p-4
          text-blue-100
          text-sm
          line-clamp-5
          opacity-0
          group-hover:opacity-100
          transition
          duration-300
          z-10">{synopsis}</p>
        </div>
    )
}
