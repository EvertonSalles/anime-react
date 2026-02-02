import {useState, useEffect} from 'react';
import {Header} from '../components/Header';
import {AnimeList} from '../components/AnimeList';
import {buscarTodosAnimes, obterAnimesAtualizados} from '../services/animeService';
import {AnimeDetails} from '../components/AnimeDetails';
import {Paginacao} from '../components/Paginacao';

export const Home = () => {
    const [lista, setLista] = useState([]);
    const [animeSelecionado, setAnimeSelecionado] = useState(null);
    const [search, setSearch] = useState('');
    const [generos, setGeneros] = useState([]);
    const [modo, setModo] = useState('normal');
    const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
    const [mostrarCategorias, setMostrarCategorias] = useState(false);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const animesPorPagina = 12;

    useEffect(() => {
        async function carregarAnimes() {
            try {
                setLoading(true);
                
                const dados = await buscarTodosAnimes();
                console.log('✅ Primeiros animes carregados:', dados.length);
                setLista(dados);

                const todosGeneros = dados
                    .flatMap(anime => anime.genres ?? [])
                    .map(genre => genre.name);

                const generosUnicos = Array.from(new Set(todosGeneros));
                setGeneros(['todos', ...generosUnicos]);

                setLoading(false);
                setError(null);
                
               
                const intervalo = setInterval(() => {
                    const animesAtualizados = obterAnimesAtualizados();
                    if (animesAtualizados.length > dados.length) {
                        console.log('🔄 Atualizando lista com mais animes...');
                        setLista(animesAtualizados);
                        
                        const novosGeneros = animesAtualizados
                            .flatMap(anime => anime.genres ?? [])
                            .map(genre => genre.name);
                        const generosUnicosNovos = Array.from(new Set(novosGeneros));
                        setGeneros(['todos', ...generosUnicosNovos]);
                    }
                }, 3000);
                
                setTimeout(() => clearInterval(intervalo), 120000);
                
            } catch(err) {
                console.error('Erro:', err);
                setError('Erro ao carregar anime. Tente novamente');
                setLoading(false);
            }
        }

        carregarAnimes();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-3xl mb-4">⚡ Carregamento Ultrarrápido...</p>
                    <p className="text-zinc-400">Primeiros animes chegando em 2-3 segundos!</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <p className='text-red-600 text-3xl text-center mt-20'>{error}</p>
        );
    }

  
    let animesProcessados = [...lista];

    animesProcessados = animesProcessados.filter((anime) => {
        const matchSearch = anime.title
            .toLowerCase()
            .includes(search.toLowerCase());
        
        const matchCategoria = 
            categoriaAtiva === 'todos' ||
            anime.genres?.some((genre) => genre.name === categoriaAtiva);
        
        return matchSearch && matchCategoria;
    });

    if (modo === 'destaque') {
        animesProcessados.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    }

    if (modo === 'novidades') {
        animesProcessados.sort((a, b) => {
            const dataA = new Date(a.aired?.from || 0);
            const dataB = new Date(b.aired?.from || 0);
            return dataB - dataA;
        });
    }

    const totalPaginas = Math.ceil(animesProcessados.length / animesPorPagina);
    const indiceInicio = (paginaAtual - 1) * animesPorPagina;
    const indiceFim = indiceInicio + animesPorPagina;
    const animesNaPaginaAtual = animesProcessados.slice(indiceInicio, indiceFim);

    const handleMudarPagina = (numeroPagina) => {
        setPaginaAtual(numeroPagina);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

  
    const handleBuscaChange = (valor) => {
        setSearch(valor);
        setPaginaAtual(1);
    };

    const handleModoChange = (novoModo) => {
        setModo(novoModo);
        setCategoriaAtiva('todos');
        setPaginaAtual(1);
    };

    const handleCategoriaChange = (categoria) => {
        setCategoriaAtiva(categoria);
        setModo('normal');
        setPaginaAtual(1);
    };

    return (
        <div className='min-h-screen bg-zinc-950'>
            <Header 
                search={search}
                setSearch={handleBuscaChange}
                modo={modo}
                setModo={handleModoChange}
                generos={generos}
                mostrarCategorias={mostrarCategorias}
                setMostrarCategorias={setMostrarCategorias}
                categoriaAtiva={categoriaAtiva}
                setCategoriaAtiva={handleCategoriaChange}
            />
            <div className='mx-auto max-w-7xl px-6 bg-zinc-950 pt-20'>
                <div className="text-white mb-4 text-center">
                    {modo === 'destaque' && (
                        <p className="text-lg">🔥 Animes mais bem avaliados</p>
                    )}
                    {modo === 'novidades' && (
                        <p className="text-lg">✨ Animes mais recentes</p>
                    )}
                    {categoriaAtiva !== 'todos' && modo === 'normal' && (
                        <p className="text-lg">📂 Categoria: {categoriaAtiva}</p>
                    )}
                    <p className="text-sm text-zinc-400 mt-2">
                        Mostrando {animesNaPaginaAtual.length} de {animesProcessados.length} animes
                    </p>
                </div>

                <AnimeList 
                    animes={animesNaPaginaAtual}
                    onSelectAnime={setAnimeSelecionado}
                />

                {totalPaginas > 1 && (
                    <Paginacao 
                        paginaAtual={paginaAtual}
                        totalPaginas={totalPaginas}
                        onMudarPagina={handleMudarPagina}
                    />
                )}
            </div>
            {animeSelecionado && (
                <AnimeDetails 
                    anime={animeSelecionado}
                    onClose={() => setAnimeSelecionado(null)}
                />
            )}
        </div>
    );
};
//Teste de git