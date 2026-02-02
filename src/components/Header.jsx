export const Header = ({
  search,
  setSearch,
  modo,
  setModo,
  generos,
  categoriaAtiva,
  mostrarCategorias,
  setMostrarCategorias,
  setCategoriaAtiva,
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-zinc-700">
      <div className="px-6 h-16 flex items-center justify-around gap-2">
        <h1 className="text-xl font-bold text-white">Animes React</h1>

        <div className="hidden md:flex gap-2 text-white">
          <button
            onClick={() => {
              setCategoriaAtiva("todos");
              setModo("normal");
            }}
            className={`px-2 py-1 rounded ${
              categoriaAtiva === "todos" && modo === "normal"
                ? "bg-purple-950" 
                : "hover:bg-zinc-600"
            }`}
          >
            Todos
          </button>
          
          <button
            onClick={() => setModo("destaque")}
            className={`px-2 py-1 rounded ${
              modo === "destaque" ? "bg-purple-950" : "hover:bg-zinc-600"
            }`}
          >
            Destaques
          </button>
          
          <button
            onClick={() => setModo("novidades")}
            className={`px-2 py-1 rounded ${
              modo === "novidades" ? "bg-purple-950" : "hover:bg-zinc-600"
            }`}
          >
            Novidades
          </button>

          <button
            onClick={() => setMostrarCategorias((prev) => !prev)}
            className="px-2 py-1 rounded hover:bg-zinc-500 text-white"
          >
            Categorias
          </button>
        </div>

        {mostrarCategorias && (
          <div className="fixed top-16 left-0 w-full h-full bg-black/50 flex justify-center items-start p-4 z-50">
            <div className="bg-zinc-800 rounded-lg p-4 max-w-md w-full">
              <h2 className="text-white text-lg mb-2">Escolha uma categoria</h2>
              <ul className="flex flex-wrap gap-2">
                {generos.map((gen) => (
                  <li key={gen}>
                    <button
                      onClick={() => {
                        setCategoriaAtiva(gen);
                        setMostrarCategorias(false);
                      }}
                      className={`px-3 py-1 rounded ${
                        categoriaAtiva === gen && modo === "normal"
                          ? "bg-purple-950" 
                          : "hover:bg-zinc-600"
                      } text-white`}
                    >
                      {gen}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setMostrarCategorias(false)}
                className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-500 text-white"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        <input
          type="text"
          placeholder="Buscar anime"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none rounded-full px-4 py-1.5 w-56 bg-zinc-500 text-white placeholder:text-white"
        />
      </div>
    </header>
  );
};