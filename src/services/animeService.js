const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const CACHE_KEY = 'top60_animes_cache';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 dias

// 🔥 TOP 60 ANIMES - ORDENADOS POR PRIORIDADE
const TOP_12_URGENTES = [
    21,     // One Piece
    20,     // Naruto
    16498,  // Attack on Titan
    38000,  // Demon Slayer
    40748,  // Jujutsu Kaisen
    1535,   // Death Note
    5114,   // Fullmetal Alchemist: Brotherhood
    11061,  // Hunter x Hunter
    30276,  // One Punch Man
    31964,  // My Hero Academia
    813,    // Dragon Ball Z
    527,    // Pokémon
];

const RESTO_48_ANIMES = [
    1735,   // Naruto: Shippuuden
    269,    // Bleach
    30694,  // Dragon Ball Super
    44511,  // Chainsaw Man
    1575,   // Code Geass
    9253,   // Steins;Gate
    50265,  // Spy x Family
    22319,  // Tokyo Ghoul
    32182,  // Mob Psycho 100
    31240,  // Re:Zero
    37521,  // Vinland Saga
    52034,  // Oshi no Ko
    54856,  // Solo Leveling
    51179,  // Frieren
    38691,  // Dr. Stone
    39535,  // Mushoku Tensei
    41467,  // Bleach: Thousand-Year Blood War
    53580,  // Dungeon Meshi
    11757,  // Sword Art Online
    
    // Pokémon & Digimon
    3718,   // Pokémon: Diamond & Pearl
    9107,   // Pokémon XY
    34934,  // Pokémon Sun & Moon
    2157,   // Digimon Adventure
    1313,   // Digimon Adventure 02
    
    // Fire Force
    38415,  // Fire Force
    40956,  // Fire Force Season 2
    
    // JoJo
    37991,  // JoJo Part 3
    31933,  // JoJo Part 4
    
    // Clássicos
    1,      // Cowboy Bebop
    235,    // Detective Conan
    918,    // Gintama
    19,     // Monster
    6,      // Trigun
    245,    // Great Teacher Onizuka
    30,     // Neon Genesis Evangelion
    
    // Romances/Filmes
    32281,  // Your Name
    28851,  // A Silent Voice
    35120,  // Kaguya-sama
    5081,   // Bakemonogatari
    199,    // Spirited Away
    431,    // Howl's Moving Castle
    164,    // Princess Mononoke
    
    // Esportes & Outros
    28891,  // Haikyuu!!
    2251,   // Hajime no Ippo
    52299,  // Bocchi the Rock!
    50710,  // Lycoris Recoil
    48561,  // Jujutsu Kaisen 0
];

let cacheGlobal = null;
let carregandoBackground = false;

export const buscarTodosAnimes = async () => {
   
    const cache = localStorage.getItem(CACHE_KEY);
    if (cache) {
        const { data, timestamp } = JSON.parse(cache);
        const agora = Date.now();
        
        if (agora - timestamp < CACHE_EXPIRY) {
            console.log('⚡ Cache encontrado! Carregamento instantâneo!');
            cacheGlobal = data;
            return data;
        }
    }
    
   
    console.log('🚀 Carregamento rápido: 12 animes principais...');
    const animesUrgentes = await buscarLoteRapido(TOP_12_URGENTES);
    cacheGlobal = animesUrgentes;
    
    console.log('✅ Primeiros 12 animes carregados! Mostrando agora...');
    console.log('⏳ Continuando carregamento em segundo plano...');
    
   
    carregarRestoEmBackground();
    
    return animesUrgentes;
}


async function buscarLoteRapido(ids) {
    console.log(`📥 Buscando ${ids.length} animes em paralelo...`);
    
    const promises = ids.map(async (id, index) => {
        try {
          
            await delay(index * 200);
            
            const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
            
            if (response.ok) {
                const json = await response.json();
                return json.data;
            }
            return null;
        } catch (err) {
            console.warn(`⚠️ Erro no anime ${id}:`, err.message);
            return null;
        }
    });
    
    const resultados = await Promise.all(promises);
    return resultados.filter(anime => anime !== null);
}


async function carregarRestoEmBackground() {
    if (carregandoBackground) return;
    carregandoBackground = true;
    
    console.log('🔄 Carregando 48 animes adicionais em segundo plano...');
    
    try {
        const animesAdicionais = [];
        
     
        for (let i = 0; i < RESTO_48_ANIMES.length; i += 8) {
            const lote = RESTO_48_ANIMES.slice(i, i + 8);
            const animesDesseLote = await buscarLoteRapido(lote);
            animesAdicionais.push(...animesDesseLote);
            
          
            cacheGlobal = [...cacheGlobal, ...animesDesseLote];
            
            const progresso = Math.min(100, Math.round(((i + 8) / RESTO_48_ANIMES.length) * 100));
            console.log(`📊 Background: ${progresso}% - Total: ${cacheGlobal.length} animes`);
          
            await delay(1500);
        }
        
   
        cacheGlobal.sort((a, b) => (b.score || 0) - (a.score || 0));
        
       
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                data: cacheGlobal,
                timestamp: Date.now()
            }));
            console.log('💾 Cache completo salvo!');
        } catch (err) {
            console.warn('⚠️ Erro ao salvar cache:', err.message);
        }
        
        console.log(`🎉 COMPLETO! ${cacheGlobal.length} animes disponíveis!`);
        console.log('✅ Incluindo: One Piece, Naruto, Pokémon, Digimon, Fire Force, etc.');
        
    } catch (err) {
        console.error('❌ Erro no carregamento em background:', err.message);
    } finally {
        carregandoBackground = false;
    }
}


export const obterAnimesAtualizados = () => {
    return cacheGlobal || [];
}

export const buscarAnimePorId = async (id) => {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        
        if (response.status === 429) {
            throw new Error('Muitas requisições. Aguarde alguns segundos.');
        }
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch(err) {
        console.error('Erro ao buscar anime:', err.message);
        throw err;
    }
}

export const limparCache = () => {
    localStorage.removeItem(CACHE_KEY);
    cacheGlobal = null;
    console.log('🗑️ Cache limpo!');
}