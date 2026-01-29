export const  Header = () => {
    return(
            <header className=" fixed top-0 left-0 w-full bg-zinc-700">
                <div className="   px-6 h-16 flex items-center   justify-around ">
                    <h1 className="text-xl font-bold text-white ">Site animes</h1>

                    <ul className="hidden md:flex  gap-10  text-white ">
                        <li> <a href="#">Destaques</a> </li>
                        <li> <a href="#">Novidades</a> </li>
                        <li> <a href="#">Categorias</a> </li>
                    </ul>

                    <input type="text" 
                    placeholder="buscar anime"

                    className="

                    outline-none
                    rounded-full
                    px-4
                    py-1.5
                    w-56
                    bg-zinc-500
                    text-white
                    placeholder:text-white
                    "
                    />
                </div>
            </header>
    )
}