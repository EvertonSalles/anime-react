export const AnimeCard = ({title, images,onClick}) =>  {
    return(
        <div 
        
        onClick={onClick}
        className=" 
        xl:w-[20vw]
        h-[50vh]
        flex
        flex-col
        justify-around
        group
      relative
      cursor-pointer
      bg-zinc-800
      rounded-xl
      overflow-hidden
      hover:scale-[1.02]
      transition
              " >
            <div className=" flex justify-center">
            <h1 
            className=" my-1 text-gray-50 line-clamp-1">{title}</h1>
            
            </div>

            <div className=" mx-auto  mb-10">
            <img
            src={images?.jpg?.image_url}
            alt={title} 
            className=" object-cover
            
            
            "
            />
            </div>
             <div
        className="
          absolute
          opacity-0
          transition
          duration-300
        "
      />
      
            
        </div>
    )
}
