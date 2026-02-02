export const Paginacao = ({ paginaAtual, totalPaginas, onMudarPagina }) => {
    return (
        <div className="flex justify-center items-center gap-2 my-8 pb-8">
           
            <button
                onClick={() => onMudarPagina(paginaAtual - 1)}
                disabled={paginaAtual === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    paginaAtual === 1
                        ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                        : 'bg-zinc-700 text-white hover:bg-purple-600'
                }`}
            >
                ← Anterior
            </button>

           
            <div className="flex gap-2">
                {[...Array(totalPaginas)].map((_, index) => {
                    const numeroPagina = index + 1;
                    return (
                        <button
                            key={numeroPagina}
                            onClick={() => onMudarPagina(numeroPagina)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                paginaAtual === numeroPagina
                                    ? 'bg-purple-600 text-white scale-110'
                                    : 'bg-zinc-700 text-white hover:bg-zinc-600'
                            }`}
                        >
                            {numeroPagina}
                        </button>
                    );
                })}
            </div>

            
            <button
                onClick={() => onMudarPagina(paginaAtual + 1)}
                disabled={paginaAtual === totalPaginas}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    paginaAtual === totalPaginas
                        ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                        : 'bg-zinc-700 text-white hover:bg-purple-600'
                }`}
            >
                Próximo →
            </button>
        </div>
    );
};