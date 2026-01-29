import {AnimeList} from '../components/AnimeList';
import {Header} from '../components/Header';
import {useState, useEffect} from 'react';
import {buscarTodosAnimes} from '../services/animeService'

export const Home = () =>{
    
    const [lista, setLista]   = useState([]);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);
   
    

useEffect(() =>{
    async function carregarAnimes() {
        try{
        const dados = await buscarTodosAnimes();
        console.log('Dados recebidos',dados)
        setLista(dados)
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
        <div className= ' mx-auto max-w-[1700px] px-6 bg-zinc-950  pt-20 '>
            <AnimeList animes = {lista}/>
            <Header/>
        </div>
        </div>
    )
        
}



