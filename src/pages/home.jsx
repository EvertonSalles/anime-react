import {useState, useEffect} from 'react';
import {Header} from '../components/Header';
import {AnimeList} from '../components/AnimeList';
import {buscarTodosAnimes} from '../services/animeService';
import {AnimeDetails} from '../components/AnimeDetails';

export const Home = () =>{
    const [lista, setLista]   = useState([]);
    const [animeSelecionado, setAnimeSelecionado] = useState(null);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);
   
    

useEffect(() =>{
    async function carregarAnimes() {
        try{
        const dados = await buscarTodosAnimes();
        console.log('Dados recebidos',dados)
        setLista(dados)
        {console.log(dados[0])}
        setLoading(false);
        setError(null);
        }catch(err){
            console.log('Erro:', err);
            setError('Erro ao carregar anime. Tente novamente');
        }finally{
            setLoading(false);
        }
        
    }

    

    carregarAnimes();
}, []);

 if (loading) return <p>Carregando..</p>;

 if(error){
    return(
        <p className='text-red-600 text-3xl'>{error}</p>
    )
 }
    
    

    return(
        <div className=' min-h-screen bg-zinc-950  '>
                <Header/>
         <div className= ' mx-auto max-w-425 px-6 bg-zinc-950  pt-20 '>
            <AnimeList animes = {lista}
            onSelectAnime={setAnimeSelecionado}
            />
    </div>
            {animeSelecionado && (
                <AnimeDetails 
                anime={animeSelecionado}
                onClose={() => setAnimeSelecionado(null)}
                />
            )}
            

        
            
        
        </div>
    )
        
}



