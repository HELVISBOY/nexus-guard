const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const Groq = require('groq-sdk');
const axios = require('axios');
const ytdl = require('@distube/ytdl-core');
const yts = require('youtube-search-api');
const express = require('express');

// ═══════════════ IGNORA TODOS OS ERROS ═══════════════
process.on('unhandledRejection', () => {});
process.on('uncaughtException', () => {});
console.error = () => {};
// ════════════════════════════════════════════════════════

// ═══════════════ VARIÁVEL DE TEMPO (ÚNICA) ═══════════════
const startTime = Date.now();

// ═══════════════ SERVIDOR WEB (RENDER) ═══════════════
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const uptime = Date.now() - startTime;
    const hours = Math.floor(uptime / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>NEXUS GUARD v4.0</title>
            <meta charset="UTF-8">
            <style>
                body {
                    background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
                    color: #00ff88;
                    font-family: 'Courier New', monospace;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .container {
                    text-align: center;
                    border: 3px solid #00ff88;
                    padding: 50px;
                    border-radius: 15px;
                    box-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
                    background: rgba(10, 14, 39, 0.8);
                }
                h1 { font-size: 3em; margin: 0; text-shadow: 0 0 10px #00ff88; }
                .status { color: #00ff88; font-size: 1.8em; margin: 20px 0; }
                .info { margin-top: 30px; font-size: 1.1em; }
                .badge {
                    display: inline-block;
                    background: #00ff88;
                    color: #0a0e27;
                    padding: 5px 15px;
                    border-radius: 20px;
                    margin: 5px;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🤖 NEXUS GUARD v4.0</h1>
                <p class="status">✅ MEGA ULTIMATE ONLINE</p>
                <div class="info">
                    <p>⏱️ Uptime: <strong>${hours}h ${minutes}m</strong></p>
                    <p>👤 Criador: <strong>Helvis Dev. Full Stack</strong></p>
                    <br>
                    <span class="badge">🧠 IA</span>
                    <span class="badge">🎮 JOGOS</span>
                    <span class="badge">💰 ECONOMIA</span>
                    <span class="badge">🛡️ SEGURANÇA</span>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.get('/ping', (req, res) => {
    res.json({ status: 'online', uptime: Date.now() - startTime });
});

app.listen(PORT, () => {
    console.log(`🌐 Servidor web rodando na porta ${PORT}`);
});
// ════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════
//       NEXUS GUARD v4.0 - MEGA ULTIMATE EDITION
//        O Bot MAIS COMPLETO do WhatsApp
// ═══════════════════════════════════════════════════════

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    }
});

// ═══════════════════ CONFIGURAÇÕES ═══════════════════

const CONFIG = {
    BOT_NAME: '🤖 NEXUS GUARD',
    VERSION: '4.0 MEGA ULTIMATE',
    PREFIX: '!',
    MEU_NUMERO: '5567996625282',
    MEU_NOME: 'Helvis Dev. Full Stack',
    
    // IA - GROQ
    GROQ_API_KEY: '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',
    IA_ENABLED: true,
    IA_NAME: 'NEXUS',
    
    // APIs EXTERNAS
    WEATHER_API_KEY: 'bbf5cfa0e70dea8f3b0f5591d8b06c2d',
    NEWS_API_KEY: '32bc3cfaa5ea465cb619225b22c0b713',
    
    // SEGURANÇA
    MAX_WARNS: 3,
    ANTI_FLOOD: {
        enabled: true,
        max_messages: 7,
        time_window: 10000
    },
    ANTI_LINK: {
        enabled: true,
        whitelist: ['chat.whatsapp.com']
    },
    AUTO_WELCOME: true,
    AUTO_BYE: true,
    AUTO_STICKER: true,
    WORD_FILTER: true,
    bad_words: ['porra', 'caralho', 'fdp'],
    
    // ECONOMIA/XP
    ECONOMY_ENABLED: true,
    XP_PER_MESSAGE: 5,
    DAILY_COINS: 100,
    WORK_COOLDOWN: 3600000, // 1 hora
    WORK_MIN: 50,
    WORK_MAX: 150,
    
    // JOGOS
    CASINO_MIN_BET: 10,
    CASINO_MAX_BET: 1000,
    
    // LOJA
    SHOP_ITEMS: {
        vip: { name: '👑 VIP', price: 5000, description: 'Status VIP por 30 dias' },
        dobro_xp: { name: '⭐ Dobro XP', price: 2000, description: 'XP em dobro por 24h' },
        proteção: { name: '🛡️ Proteção', price: 1500, description: 'Imune a warns por 7 dias' },
        destaque: { name: '✨ Destaque', price: 500, description: 'Nome colorido por 24h' }
    }
};

// ═══════════════════ DADOS ═══════════════════════════

const admins = [
    '5567996625282@c.us',
    '5567996625282@lid',
    '146866574499886@lid'
];

const warnings = {};
const userMessages = {};
const userStats = {};
const userInventory = {};
const activeGames = {};
const cooldowns = {};
const rpgPlayers = {};

// ═══════════════════ INICIALIZAR IA ═══════════════════════════

let groq;

if (CONFIG.IA_ENABLED && CONFIG.GROQ_API_KEY && CONFIG.GROQ_API_KEY.length > 20) {
    groq = new Groq({ apiKey: CONFIG.GROQ_API_KEY });
    console.log('🧠 IA GROQ inicializada!');
}

// ═══════════════════ FUNÇÕES AUXILIARES ═══════════════════════════

const isAdmin = (authorId, fromMe) => {
    return fromMe || 
           authorId.includes(CONFIG.MEU_NUMERO) || 
           admins.includes(authorId);
};

const addAdmin = (id) => {
    if (!admins.includes(id)) {
        admins.push(id);
        console.log(`✅ Admin adicionado: ${id}`);
    }
};

const checkFlood = (userId, groupId) => {
    if (!CONFIG.ANTI_FLOOD.enabled) return false;
    
    const now = Date.now();
    const key = `${groupId}_${userId}`;
    
    if (!userMessages[key]) {
        userMessages[key] = [];
    }
    
    userMessages[key] = userMessages[key].filter(time => now - time < CONFIG.ANTI_FLOOD.time_window);
    userMessages[key].push(now);
    
    return userMessages[key].length > CONFIG.ANTI_FLOOD.max_messages;
};

const hasLink = (text) => {
    const linkRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|(\b[a-z]+\.(com|net|org|br|io)\b)/gi;
    return linkRegex.test(text);
};

const hasBadWord = (text) => {
    if (!CONFIG.WORD_FILTER) return false;
    const lower = text.toLowerCase();
    return CONFIG.bad_words.some(word => lower.includes(word));
};

const formatUptime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
};

const formatNumber = (numero) => {
    return numero.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

const checkCooldown = (userId, command, cooldownTime) => {
    const key = `${userId}_${command}`;
    const now = Date.now();
    
    if (cooldowns[key] && now - cooldowns[key] < cooldownTime) {
        const timeLeft = cooldownTime - (now - cooldowns[key]);
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        return { onCooldown: true, timeLeft: `${minutes}m ${seconds}s` };
    }
    
    cooldowns[key] = now;
    return { onCooldown: false };
};

// Sistema de XP/Level
const addXP = (userId, groupId, bonus = 1) => {
    if (!CONFIG.ECONOMY_ENABLED) return;
    
    const key = `${groupId}_${userId}`;
    if (!userStats[key]) {
        userStats[key] = { xp: 0, level: 1, coins: 0, messages: 0, lastDaily: 0, lastWork: 0 };
    }
    
    userStats[key].xp += CONFIG.XP_PER_MESSAGE * bonus;
    userStats[key].messages++;
    
    const xpNeeded = userStats[key].level * 100;
    if (userStats[key].xp >= xpNeeded) {
        userStats[key].level++;
        userStats[key].xp = 0;
        userStats[key].coins += userStats[key].level * 50; // Bônus de coins ao subir de nível
        return userStats[key].level;
    }
    return null;
};

const getUserStats = (userId, groupId) => {
    const key = `${groupId}_${userId}`;
    return userStats[key] || { xp: 0, level: 1, coins: 0, messages: 0, lastDaily: 0, lastWork: 0 };
};

const addCoins = (userId, groupId, amount) => {
    const key = `${groupId}_${userId}`;
    if (!userStats[key]) {
        userStats[key] = { xp: 0, level: 1, coins: 0, messages: 0, lastDaily: 0, lastWork: 0 };
    }
    userStats[key].coins += amount;
    return userStats[key].coins;
};

const removeCoins = (userId, groupId, amount) => {
    const key = `${groupId}_${userId}`;
    if (!userStats[key] || userStats[key].coins < amount) {
        return false;
    }
    userStats[key].coins -= amount;
    return true;
};

// IA - Groq
const askAI = async (question, mode = 'normal') => {
    console.log('🔍 [DEBUG] askAI chamada');
    console.log('📝 [DEBUG] Pergunta:', question);
    
    if (!groq) {
        console.log('❌ [DEBUG] GROQ não inicializado!');
        return '❌ IA não configurada.';
    }
    
    console.log('✅ [DEBUG] GROQ OK');
    
    let systemPrompt = `Você é ${CONFIG.IA_NAME}, um assistente inteligente criado por ${CONFIG.MEU_NOME}. Responda em português do Brasil de forma objetiva e amigável.`;
    
    if (mode === 'resumir') {
        systemPrompt = 'Você é um especialista em resumir textos. Faça resumos concisos e objetivos em português.';
    } else if (mode === 'corrigir') {
        systemPrompt = 'Você é um corretor de textos. Corrija erros gramaticais e de ortografia, retornando o texto corrigido.';
    } else if (mode === 'sentimento') {
        systemPrompt = 'Analise o sentimento do texto e responda apenas: POSITIVO, NEGATIVO ou NEUTRO, seguido de uma breve explicação.';
    }
    
    console.log('📤 [DEBUG] Enviando pra GROQ...');
    
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: question }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: mode === 'corrigir' ? 0.3 : 0.7,
            max_tokens: 1024,
        });
        
        console.log('✅ [DEBUG] GROQ respondeu!');
        
        const resposta = completion.choices[0]?.message?.content || 'Desculpe, não consegui processar.';
        
        console.log('📥 [DEBUG] Resposta:', resposta.substring(0, 100));
        
        return resposta;
    } catch (error) {
        console.log('❌ [DEBUG] ERRO:', error.message);
        
        return '⚠️ Erro ao processar sua solicitação.';
    }
};

// Tradutor
const translate = async (text, targetLang = 'pt') => {
    try {
        const response = await axios.get(`https://translate.googleapis.com/translate_a/single`, {
            params: {
                client: 'gtx',
                sl: 'auto',
                tl: targetLang,
                dt: 't',
                q: text
            }
        });
        
        return response.data[0][0][0];
    } catch (error) {
        return '❌ Erro ao traduzir.';
    }
};

// Clima
const getWeather = async (city) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: CONFIG.WEATHER_API_KEY,
                units: 'metric',
                lang: 'pt_br'
            }
        });
        
        const data = response.data;
        return `🌤️ *Clima em ${data.name}*

🌡️ Temperatura: ${data.main.temp}°C
🤔 Sensação: ${data.main.feels_like}°C
💧 Umidade: ${data.main.humidity}%
☁️ Condição: ${data.weather[0].description}
💨 Vento: ${data.wind.speed} km/h`;
    } catch (error) {
        return '❌ Cidade não encontrada.';
    }
};

// Notícias
const getNews = async (query = 'Brasil') => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything`, {
            params: {
                q: query,
                apiKey: CONFIG.NEWS_API_KEY,
                language: 'pt',
                pageSize: 5
            }
        });
        
        if (response.data.articles.length === 0) {
            return '❌ Nenhuma notícia encontrada.';
        }
        
        let newsText = `📰 *Últimas Notícias sobre "${query}"*\n\n`;
        
        response.data.articles.slice(0, 5).forEach((article, i) => {
            newsText += `${i + 1}. *${article.title}*\n`;
            newsText += `📝 ${article.description || 'Sem descrição'}\n`;
            newsText += `🔗 ${article.url}\n\n`;
        });
        
        return newsText;
    } catch (error) {
        return '❌ Erro ao buscar notícias.';
    }
};

// CEP
const getCEP = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;
        
        if (data.erro) {
            return '❌ CEP não encontrado.';
        }
        
        return `📮 *Informações do CEP*

📍 CEP: ${data.cep}
🏙️ Cidade: ${data.localidade} - ${data.uf}
🏘️ Bairro: ${data.bairro}
🛣️ Logradouro: ${data.logradouro}
📝 Complemento: ${data.complemento || 'N/A'}`;
    } catch (error) {
        return '❌ Erro ao consultar CEP.';
    }
};// ═══════════════════ FUNÇÕES DE JOGOS ═══════════════════════════

// RPG
const initRPG = (userId) => {
    if (!rpgPlayers[userId]) {
        rpgPlayers[userId] = {
            hp: 100,
            maxHp: 100,
            attack: 10,
            defense: 5,
            level: 1,
            xp: 0,
            gold: 100,
            inventory: [],
            inBattle: false
        };
    }
    return rpgPlayers[userId];
};

const createEnemy = (playerLevel) => {
    const enemies = [
        { name: '🐀 Rato', hp: 20, attack: 5, gold: 20, xp: 15 },
        { name: '🐺 Lobo', hp: 40, attack: 8, gold: 35, xp: 25 },
        { name: '👹 Goblin', hp: 60, attack: 12, gold: 50, xp: 40 },
        { name: '🧟 Zumbi', hp: 80, attack: 15, gold: 70, xp: 60 },
        { name: '🐉 Dragão', hp: 150, attack: 25, gold: 200, xp: 150 }
    ];
    
    const index = Math.min(Math.floor(playerLevel / 2), enemies.length - 1);
    const enemy = { ...enemies[index] };
    enemy.hp = Math.floor(enemy.hp * (1 + playerLevel * 0.1));
    enemy.attack = Math.floor(enemy.attack * (1 + playerLevel * 0.1));
    return enemy;
};

// Cassino - Roleta
const playRoulette = (bet) => {
    const number = Math.floor(Math.random() * 37); // 0-36
    const color = number === 0 ? 'verde' : (number % 2 === 0 ? 'vermelho' : 'preto');
    
    return { number, color };
};

// Cassino - Dados
const playDice = () => {
    return {
        dice1: Math.floor(Math.random() * 6) + 1,
        dice2: Math.floor(Math.random() * 6) + 1
    };
};

// Cassino - Coinflip
const playCoinflip = () => {
    return Math.random() < 0.5 ? 'cara' : 'coroa';
};

// Quiz
const quizQuestions = [
    { q: 'Qual a capital do Brasil?', a: ['brasília', 'brasilia'], points: 10 },
    { q: 'Quanto é 5 x 8?', a: ['40'], points: 10 },
    { q: 'Quem descobriu o Brasil?', a: ['cabral', 'pedro alvares cabral', 'pedro álvares cabral'], points: 15 },
    { q: 'Qual o maior planeta do sistema solar?', a: ['júpiter', 'jupiter'], points: 15 },
    { q: 'Em que ano foi proclamada a independência do Brasil?', a: ['1822'], points: 20 },
    { q: 'Qual a linguagem de programação mais usada para web?', a: ['javascript', 'js'], points: 20 },
    { q: 'Quantos estados tem o Brasil?', a: ['27', 'vinte e sete'], points: 15 },
    { q: 'Qual o menor país do mundo?', a: ['vaticano', 'cidade do vaticano'], points: 20 }
];

const getRandomQuestion = () => {
    return quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
};

// Forca
const palavrasForca = [
    'PROGRAMACAO', 'JAVASCRIPT', 'WHATSAPP', 'INTELIGENCIA', 'COMPUTADOR',
    'TECLADO', 'INTERNET', 'DESENVOLVEDOR', 'TECNOLOGIA', 'APLICATIVO'
];

const initForca = () => {
    const word = palavrasForca[Math.floor(Math.random() * palavrasForca.length)];
    return {
        word: word,
        guessed: Array(word.length).fill('_'),
        attempts: 6,
        usedLetters: []
    };
};

// Download YouTube
const downloadYouTube = async (url) => {
    try {
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;
        const duration = parseInt(info.videoDetails.lengthSeconds);
        
        if (duration > 600) { // Máximo 10 minutos
            return { error: '❌ Vídeo muito longo! Máximo: 10 minutos' };
        }
        
        return {
            title,
            duration,
            url,
            thumbnail: info.videoDetails.thumbnails[0].url
        };
    } catch (error) {
        return { error: '❌ Erro ao processar vídeo.' };
    }
};

// Pesquisa YouTube
const searchYouTube = async (query) => {
    try {
        const results = await yts.GetListByKeyword(query, false, 5);
        return results.items.slice(0, 5);
    } catch (error) {
        return [];
    }
};

// ═══════════════════ EVENTOS ═══════════════════════════


let qrCodeData = null;

client.on('qr', (qr) => {
    console.log('\n╔═══════════════════════════════════════╗');
    console.log('║   🤖 NEXUS GUARD v4.0 MEGA ULTIMATE 🤖   ║');
    console.log('╚═══════════════════════════════════════╝\n');
    console.log('📱 Escaneie o QR Code:\n');
    console.log('🌐 OU acesse: http://localhost:3000/qr');
    qrCodeData = qr;
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('\n╔═══════════════════════════════════════╗');
    console.log('║    ✅ NEXUS GUARD MEGA ULTIMATE ONLINE! ✅  ║');
    console.log('╚═══════════════════════════════════════╝');
    console.log(`📊 Versão: ${CONFIG.VERSION}`);
    console.log(`👤 Criador: ${CONFIG.MEU_NOME}`);
    console.log(`🧠 IA: ${CONFIG.IA_ENABLED ? 'ATIVADA' : 'DESATIVADA'}`);
    console.log(`🔐 Segurança: MÁXIMA`);
    console.log(`⚡ Anti-Flood: ${CONFIG.ANTI_FLOOD.enabled ? 'ON' : 'OFF'}`);
    console.log(`🔗 Anti-Link: ${CONFIG.ANTI_LINK.enabled ? 'ON' : 'OFF'}`);
    console.log(`🎮 Jogos: ATIVADOS`);
    console.log(`💰 Economia: ATIVADA`);
    console.log(`🎵 Download: ATIVADO`);
    console.log('═══════════════════════════════════════════\n');
});

// Boas-vindas
client.on('group-join', async (notification) => {
    if (!CONFIG.AUTO_WELCOME) return;
    
    try {
        const chat = await notification.getChat();
        const contact = await notification.getContact();
        
        await chat.sendMessage(`╔═══════════════════════╗
║   🎉 BEM-VINDO(A)!   ║
╚═══════════════════════╝

👋 Olá @${contact.id.user}!

Seja bem-vindo(a) ao *${chat.name}*!

🎮 *!jogos* - Ver jogos disponíveis
💰 *!economia* - Sistema de economia
🧠 *!ia [pergunta]* - IA avançada
🎵 *!play [música]* - Baixar música
📋 *!comandos* - Todos os comandos

═══════════════════════
⚡ Bot by ${CONFIG.MEU_NOME}
🤖 NEXUS GUARD v${CONFIG.VERSION}

Divirta-se! 🚀`, {
            mentions: [contact]
        });
    } catch (err) {
        console.error('Erro no boas-vindas:', err);
    }
});

// Despedida
client.on('group-leave', async (notification) => {
    if (!CONFIG.AUTO_BYE) return;
    
    try {
        const chat = await notification.getChat();
        const contact = await notification.getContact();
        
        await chat.sendMessage(`👋 *${contact.pushname || contact.id.user}* saiu do grupo.\n\nAté logo! 😢`);
    } catch (err) {
        console.error('Erro na despedida:', err);
    }
});

// ═══════════════════ PROCESSADOR DE MENSAGENS ═══════════════════════════

client.on('message_create', async (message) => {
    try {
        const chat = await message.getChat();
        
        if (!chat.isGroup) return;
        
        const authorId = message.author || message.from;
        const isAdminUser = isAdmin(authorId, message.fromMe);
        const text = message.body;
        
        // Auto-adiciona admin
        if ((message.fromMe || authorId.includes(CONFIG.MEU_NUMERO)) && !admins.includes(authorId)) {
            addAdmin(authorId);
        }
        
        // Verifica resposta de Quiz ativo
        if (activeGames[chat.id._serialized]?.type === 'quiz') {
            const game = activeGames[chat.id._serialized];
            const answer = text.toLowerCase().trim();
            
            if (game.answers.includes(answer)) {
                addCoins(authorId, chat.id._serialized, game.points);
                await message.reply(`🎉 *CORRETO!*\n\n+${game.points} moedas! 🪙`);
                delete activeGames[chat.id._serialized];
                return;
            }
        }
        
        // Verifica resposta de Forca ativa
        if (activeGames[chat.id._serialized]?.type === 'forca' && text.length === 1) {
            const game = activeGames[chat.id._serialized];
            const letter = text.toUpperCase();
            
            if (game.usedLetters.includes(letter)) {
                await message.reply('❌ Letra já usada!');
                return;
            }
            
            game.usedLetters.push(letter);
            
            if (game.word.includes(letter)) {
                for (let i = 0; i < game.word.length; i++) {
                    if (game.word[i] === letter) {
                        game.guessed[i] = letter;
                    }
                }
                
                if (!game.guessed.includes('_')) {
                    addCoins(authorId, chat.id._serialized, 100);
                    await message.reply(`🎉 *VOCÊ VENCEU!*\n\nPalavra: ${game.word}\n+100 moedas! 🪙`);
                    delete activeGames[chat.id._serialized];
                    return;
                }
                
                await message.reply(`✅ Letra correta!\n\n${game.guessed.join(' ')}\nTentativas: ${game.attempts}\nUsadas: ${game.usedLetters.join(', ')}`);
            } else {
                game.attempts--;
                
                if (game.attempts === 0) {
                    await message.reply(`💀 *GAME OVER!*\n\nA palavra era: ${game.word}`);
                    delete activeGames[chat.id._serialized];
                    return;
                }
                
                await message.reply(`❌ Letra errada!\n\n${game.guessed.join(' ')}\nTentativas restantes: ${game.attempts}\nUsadas: ${game.usedLetters.join(', ')}`);
            }
            
            return;
        }
        
        // XP por mensagem
        const levelUp = addXP(authorId, chat.id._serialized);
        if (levelUp && !message.fromMe) {
            await message.reply(`🎉 *LEVEL UP!*\n@${authorId.split('@')[0]} subiu para o nível *${levelUp}*! 🚀\n\n💰 Bônus: +${levelUp * 50} moedas!`, {
                mentions: [authorId]
            });
        }
        
        // ═══════════════════ SISTEMAS DE SEGURANÇA ═══════════════════════════
        
        // Anti-Palavrão
        if (!isAdminUser && hasBadWord(text)) {
            await message.delete(true);
            await chat.sendMessage(`⚠️ *PALAVRÃO DETECTADO*\n@${authorId.split('@')[0]} linguagem inadequada não é permitida!`, {
                mentions: [authorId]
            });
            console.log(`🤬 Palavrão bloqueado de: ${authorId}`);
            return;
        }
        
        // Anti-Flood
        if (!isAdminUser && checkFlood(authorId, chat.id._serialized)) {
            await chat.removeParticipants([authorId]);
            await chat.sendMessage('⚠️ *ANTI-FLOOD ATIVADO*\nUsuário removido por spam.');
            console.log(`🚫 Flood detectado: ${authorId}`);
            return;
        }
        
        // Anti-Link
        if (CONFIG.ANTI_LINK.enabled && !isAdminUser && hasLink(text)) {
            await message.delete(true);
            await chat.sendMessage(`⚠️ *LINK BLOQUEADO*\n@${authorId.split('@')[0]} links não são permitidos!`, {
                mentions: [authorId]
            });
            console.log(`🔗 Link bloqueado de: ${authorId}`);
            return;
        }
        
        // Auto-Sticker
        if (CONFIG.AUTO_STICKER && message.hasMedia && text === '!s') {
            const media = await message.downloadMedia();
            await client.sendMessage(chat.id._serialized, media, { sendMediaAsSticker: true });
            return;
        }
        
        // ═══════════════════ COMANDOS ═══════════════════════════
        
        if (!text.startsWith(CONFIG.PREFIX)) return;
        
        const args = text.slice(CONFIG.PREFIX.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        
        console.log(`⚡ Comando: ${command} | Admin: ${isAdminUser} | Grupo: ${chat.name}`);        // ─────────────── IA AVANÇADA ───────────────
        
        if (command === 'ia' || command === 'ai' || command === 'gpt') {
            if (!CONFIG.IA_ENABLED) {
                await message.reply('❌ IA desativada.');
                return;
            }
            
            const question = args.join(' ');
            if (!question) {
                await message.reply('❌ Faça uma pergunta!\nExemplo: !ia o que é inteligência artificial?');
                return;
            }
            
            await message.reply('🧠 *Pensando...*');
            const response = await askAI(question);
            await message.reply(`🤖 *${CONFIG.IA_NAME}:*\n\n${response}\n\n━━━━━━━━━━━━━\n⚡ Bot by ${CONFIG.MEU_NOME}`);
        }
        
        if (command === 'resumir') {
            const text = args.join(' ');
            if (!text) {
                await message.reply('❌ Envie um texto para resumir!\nExemplo: !resumir [texto longo]');
                return;
            }
            
            await message.reply('📝 *Resumindo...*');
            const response = await askAI(text, 'resumir');
            await message.reply(`📋 *Resumo:*\n\n${response}`);
        }
        
        if (command === 'corrigir') {
            const text = args.join(' ');
            if (!text) {
                await message.reply('❌ Envie um texto para corrigir!\nExemplo: !corrigir Eu foi na escola ontem');
                return;
            }
            
            await message.reply('✍️ *Corrigindo...*');
            const response = await askAI(text, 'corrigir');
            await message.reply(`✅ *Texto corrigido:*\n\n${response}`);
        }
        
        if (command === 'sentimento') {
            const text = args.join(' ');
            if (!text) {
                await message.reply('❌ Envie um texto para analisar!\nExemplo: !sentimento Estou muito feliz hoje!');
                return;
            }
            
            await message.reply('🔍 *Analisando...*');
            const response = await askAI(text, 'sentimento');
            await message.reply(`🎭 *Análise de Sentimento:*\n\n${response}`);
        }
        
        // ─────────────── UTILIDADES ───────────────
        
        if (command === 'traduzir' || command === 'translate') {
            const [lang, ...textArr] = args;
            const text = textArr.join(' ');
            
            if (!text) {
                await message.reply('❌ Uso: !traduzir [idioma] [texto]\nExemplo: !traduzir en Olá mundo\n\nIdiomas: en, es, fr, de, it, ja, ko, zh');
                return;
            }
            
            await message.reply('🌐 *Traduzindo...*');
            const translated = await translate(text, lang);
            await message.reply(`🔤 *Tradução (${lang}):*\n\n${translated}`);
        }
        
        if (command === 'clima' || command === 'weather') {
            const city = args.join(' ');
            if (!city) {
                await message.reply('❌ Digite uma cidade!\nExemplo: !clima São Paulo');
                return;
            }
            
            await message.reply('🌤️ *Buscando clima...*');
            const weather = await getWeather(city);
            await message.reply(weather);
        }
        
        if (command === 'noticias' || command === 'news') {
            const query = args.join(' ') || 'Brasil';
            
            await message.reply('📰 *Buscando notícias...*');
            const news = await getNews(query);
            await message.reply(news);
        }
        
        if (command === 'cep') {
            const cep = args[0];
            if (!cep || cep.length !== 8) {
                await message.reply('❌ CEP inválido!\nExemplo: !cep 01310100');
                return;
            }
            
            const info = await getCEP(cep);
            await message.reply(info);
        }
        
        // ─────────────── MÍDIA ───────────────
        
        if (command === 'play' || command === 'musica') {
            const query = args.join(' ');
            if (!query) {
                await message.reply('❌ Digite o nome da música!\nExemplo: !play Imagine Dragons');
                return;
            }
            
            await message.reply('🔍 *Procurando música...*');
            
            const results = await searchYouTube(query);
            if (results.length === 0) {
                await message.reply('❌ Nenhuma música encontrada.');
                return;
            }
            
            const video = results[0];
            await message.reply(`🎵 *Encontrado:*\n\n📌 ${video.title}\n⏱️ ${video.length.simpleText}\n\n⬇️ Baixando...`);
            
            const download = await downloadYouTube(`https://youtube.com/watch?v=${video.id}`);
            
            if (download.error) {
                await message.reply(download.error);
                return;
            }
            
            await message.reply(`✅ Música encontrada!\n\n🎵 *${download.title}*\n\n⚠️ Download de áudio/vídeo requer configuração adicional do FFmpeg.`);
        }
        
        if (command === 'ytsearch' || command === 'yt') {
            const query = args.join(' ');
            if (!query) {
                await message.reply('❌ Digite sua pesquisa!\nExemplo: !yt programação');
                return;
            }
            
            await message.reply('🔍 *Pesquisando no YouTube...*');
            
            const results = await searchYouTube(query);
            if (results.length === 0) {
                await message.reply('❌ Nenhum resultado encontrado.');
                return;
            }
            
            let resultText = `🎥 *Resultados para "${query}":*\n\n`;
            results.slice(0, 5).forEach((video, i) => {
                resultText += `${i + 1}. *${video.title}*\n`;
                resultText += `⏱️ ${video.length.simpleText}\n`;
                resultText += `🔗 https://youtube.com/watch?v=${video.id}\n\n`;
            });
            
            await message.reply(resultText);
        }
        
        // ─────────────── JOGOS ───────────────
        
        if (command === 'jogos' || command === 'games') {
            await message.reply(`╔═══════════════════╗
║  🎮 JOGOS  ║
╚═══════════════════╝

*RPG:*
!rpg - Ver seu personagem
!battle - Batalhar
!rpg shop - Loja RPG

*Cassino:*
!roleta [aposta] cor - Roleta
!dados [aposta] - Dados
!coinflip [aposta] cara/coroa

*Outros:*
!quiz - Quiz de perguntas
!forca - Jogo da forca

═══════════════════
🎮 Divirta-se!`);
        }
        
        if (command === 'rpg') {
            const player = initRPG(authorId);
            
            if (args[0] === 'shop') {
                await message.reply(`🏪 *LOJA RPG*

⚔️ Espada (+5 ATK) - 500 gold
🛡️ Escudo (+5 DEF) - 500 gold
❤️ Poção HP (+50 HP) - 100 gold
⭐ Poção XP (+100 XP) - 150 gold

Use: !buy [item]`);
                return;
            }
            
            await message.reply(`⚔️ *SEU PERSONAGEM*

❤️ HP: ${player.hp}/${player.maxHp}
⚔️ Ataque: ${player.attack}
🛡️ Defesa: ${player.defense}
📊 Level: ${player.level}
⭐ XP: ${player.xp}/100
💰 Gold: ${player.gold}

Use !battle para lutar!`);
        }
        
        if (command === 'battle') {
            const player = initRPG(authorId);
            
            if (player.inBattle) {
                await message.reply('⚔️ Você já está em batalha!');
                return;
            }
            
            const enemy = createEnemy(player.level);
            player.inBattle = true;
            
            let battleLog = `⚔️ *BATALHA INICIADA!*\n\n`;
            battleLog += `👤 Você vs ${enemy.name}\n\n`;
            
            while (player.hp > 0 && enemy.hp > 0) {
                // Player ataca
                const playerDamage = Math.max(1, player.attack - Math.floor(Math.random() * 5));
                enemy.hp -= playerDamage;
                battleLog += `⚔️ Você causou ${playerDamage} de dano!\n`;
                
                if (enemy.hp <= 0) break;
                
                // Inimigo ataca
                const enemyDamage = Math.max(1, enemy.attack - player.defense);
                player.hp -= enemyDamage;
                battleLog += `💥 ${enemy.name} causou ${enemyDamage} de dano!\n`;
            }
            
            player.inBattle = false;
            
            if (player.hp > 0) {
                player.gold += enemy.gold;
                player.xp += enemy.xp;
                
                if (player.xp >= 100) {
                    player.level++;
                    player.xp = 0;
                    player.maxHp += 20;
                    player.hp = player.maxHp;
                    player.attack += 3;
                    player.defense += 2;
                    battleLog += `\n🎉 *VITÓRIA!*\n💰 +${enemy.gold} gold\n⭐ +${enemy.xp} XP\n\n📈 LEVEL UP! Agora você é level ${player.level}!`;
                } else {
                    battleLog += `\n🎉 *VITÓRIA!*\n💰 +${enemy.gold} gold\n⭐ +${enemy.xp} XP`;
                }
                
                // Converte gold do RPG em coins do bot
                addCoins(authorId, chat.id._serialized, Math.floor(enemy.gold / 2));
            } else {
                player.hp = player.maxHp;
                player.gold = Math.floor(player.gold * 0.8);
                battleLog += `\n💀 *DERROTA!*\nVocê perdeu 20% do seu gold.`;
            }
            
            await message.reply(battleLog);
        }
        
        if (command === 'roleta' || command === 'roulette') {
            const bet = parseInt(args[0]);
            const choice = args[1]?.toLowerCase();
            
            if (!bet || !choice || !['vermelho', 'preto', 'verde'].includes(choice)) {
                await message.reply('❌ Uso: !roleta [valor] [cor]\nCores: vermelho, preto, verde\nExemplo: !roleta 100 vermelho');
                return;
            }
            
            if (bet < CONFIG.CASINO_MIN_BET || bet > CONFIG.CASINO_MAX_BET) {
                await message.reply(`❌ Aposta deve ser entre ${CONFIG.CASINO_MIN_BET} e ${CONFIG.CASINO_MAX_BET} moedas!`);
                return;
            }
            
            const stats = getUserStats(authorId, chat.id._serialized);
            if (stats.coins < bet) {
                await message.reply(`❌ Você não tem moedas suficientes!\nSuas moedas: ${stats.coins} 🪙`);
                return;
            }
            
            const result = playRoulette(bet);
            let win = false;
            let prize = 0;
            
            if (choice === result.color) {
                win = true;
                prize = choice === 'verde' ? bet * 14 : bet * 2;
            }
            
            if (win) {
                addCoins(authorId, chat.id._serialized, prize - bet);
                await message.reply(`🎰 *ROLETA*

🎯 Número: ${result.number}
🎨 Cor: ${result.color}

🎉 *VOCÊ GANHOU!*
💰 +${prize - bet} moedas!

Total: ${getUserStats(authorId, chat.id._serialized).coins} 🪙`);
            } else {
                removeCoins(authorId, chat.id._serialized, bet);
                await message.reply(`🎰 *ROLETA*

🎯 Número: ${result.number}
🎨 Cor: ${result.color}

💔 Você perdeu...
💸 -${bet} moedas

Total: ${getUserStats(authorId, chat.id._serialized).coins} 🪙`);
            }
        }
        
        if (command === 'dados' || command === 'dice') {
            const bet = parseInt(args[0]);
            
            if (!bet) {
                await message.reply('❌ Digite o valor da aposta!\nExemplo: !dados 100');
                return;
            }
            
            if (bet < CONFIG.CASINO_MIN_BET || bet > CONFIG.CASINO_MAX_BET) {
                await message.reply(`❌ Aposta deve ser entre ${CONFIG.CASINO_MIN_BET} e ${CONFIG.CASINO_MAX_BET} moedas!`);
                return;
            }
            
            const stats = getUserStats(authorId, chat.id._serialized);
            if (stats.coins < bet) {
                await message.reply(`❌ Você não tem moedas suficientes!\nSuas moedas: ${stats.coins} 🪙`);
                return;
            }
            
            const playerDice = playDice();
            const botDice = playDice();
            
            const playerTotal = playerDice.dice1 + playerDice.dice2;
            const botTotal = botDice.dice1 + botDice.dice2;
            
            let result = `🎲 *DADOS*

*Você:* ${playerDice.dice1} + ${playerDice.dice2} = ${playerTotal}
*Bot:* ${botDice.dice1} + ${botDice.dice2} = ${botTotal}\n\n`;
            
            if (playerTotal > botTotal) {
                addCoins(authorId, chat.id._serialized, bet);
                result += `🎉 *VOCÊ GANHOU!*\n💰 +${bet} moedas!`;
            } else if (playerTotal < botTotal) {
                removeCoins(authorId, chat.id._serialized, bet);
                result += `💔 Você perdeu...\n💸 -${bet} moedas`;
            } else {
                result += `🤝 *EMPATE!*\nSuas moedas voltaram.`;
            }
            
            result += `\n\nTotal: ${getUserStats(authorId, chat.id._serialized).coins} 🪙`;
            await message.reply(result);
        }
        
        if (command === 'coinflip' || command === 'moeda') {
            const bet = parseInt(args[0]);
            const choice = args[1]?.toLowerCase();
            
            if (!bet || !choice || !['cara', 'coroa'].includes(choice)) {
                await message.reply('❌ Uso: !coinflip [valor] [cara/coroa]\nExemplo: !coinflip 100 cara');
                return;
            }
            
            if (bet < CONFIG.CASINO_MIN_BET || bet > CONFIG.CASINO_MAX_BET) {
                await message.reply(`❌ Aposta deve ser entre ${CONFIG.CASINO_MIN_BET} e ${CONFIG.CASINO_MAX_BET} moedas!`);
                return;
            }
            
            const stats = getUserStats(authorId, chat.id._serialized);
            if (stats.coins < bet) {
                await message.reply(`❌ Você não tem moedas suficientes!\nSuas moedas: ${stats.coins} 🪙`);
                return;
            }
            
            const result = playCoinflip();
            
            if (result === choice) {
                addCoins(authorId, chat.id._serialized, bet);
                await message.reply(`🪙 *COINFLIP*

Resultado: *${result}* 🎯

🎉 *VOCÊ GANHOU!*
💰 +${bet} moedas!

Total: ${getUserStats(authorId, chat.id._serialized).coins} 🪙`);
            } else {
                removeCoins(authorId, chat.id._serialized, bet);
                await message.reply(`🪙 *COINFLIP*

Resultado: *${result}*

💔 Você perdeu...
💸 -${bet} moedas

Total: ${getUserStats(authorId, chat.id._serialized).coins} 🪙`);
            }
        }
        
        if (command === 'quiz') {
            if (activeGames[chat.id._serialized]?.type === 'quiz') {
                await message.reply('❓ Já existe um quiz ativo! Responda primeiro.');
                return;
            }
            
            const question = getRandomQuestion();
            activeGames[chat.id._serialized] = {
                type: 'quiz',
                answers: question.a,
                points: question.points
            };
            
            await message.reply(`❓ *QUIZ*

${question.q}

💰 Prêmio: ${question.points} moedas

Digite sua resposta!`);
            
            setTimeout(() => {
                if (activeGames[chat.id._serialized]?.type === 'quiz') {
                    chat.sendMessage('⏰ Tempo esgotado! Ninguém acertou.');
                    delete activeGames[chat.id._serialized];
                }
            }, 30000);
        }
        
        if (command === 'forca') {
            if (activeGames[chat.id._serialized]?.type === 'forca') {
                await message.reply('🎯 Já existe uma forca ativa!');
                return;
            }
            
            const game = initForca();
            activeGames[chat.id._serialized] = { type: 'forca', ...game };
            
            await message.reply(`🎯 *JOGO DA FORCA*

${game.guessed.join(' ')}

Tentativas: ${game.attempts}
Prêmio: 100 moedas 🪙

Digite uma letra!`);
        }
        
        // ─────────────── ECONOMIA ───────────────
        
        if (command === 'economia' || command === 'economy') {
            await message.reply(`╔═══════════════════╗
║  💰 ECONOMIA  ║
╚═══════════════════╝

*Ganhar Moedas:*
!daily - Recompensa diária
!work - Trabalhar
!perfil - Ver seu perfil
!top - Ranking

*Gastar Moedas:*
!loja - Ver loja
!comprar [item] - Comprar
!transferir @user [valor]

*Banco:*
!depositar [valor]
!sacar [valor]
!saldo - Ver banco

═══════════════════
💰 Sistema de Economia`);
        }
        
        if (command === 'daily' || command === 'diario') {
            const key = `${chat.id._serialized}_${authorId}`;
            if (!userStats[key]) {
                userStats[key] = { xp: 0, level: 1, coins: 0, messages: 0, lastDaily: 0, lastWork: 0 };
            }
            
            const now = Date.now();
            const lastDaily = userStats[key].lastDaily || 0;
            const cooldown = 24 * 60 * 60 * 1000;
            
            if (now - lastDaily < cooldown) {
                const timeLeft = cooldown - (now - lastDaily);
                const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
                await message.reply(`⏰ Você já coletou seu daily!\n\nVolte em *${hoursLeft}h*`);
                return;
            }
            
            userStats[key].coins += CONFIG.DAILY_COINS;
            userStats[key].lastDaily = now;
            
            await message.reply(`💰 *DAILY COLETADO!*\n\n+${CONFIG.DAILY_COINS} moedas!\nTotal: ${userStats[key].coins} moedas 🪙`);
        }
        
        if (command === 'work' || command === 'trabalhar') {
            const cooldownCheck = checkCooldown(authorId, 'work', CONFIG.WORK_COOLDOWN);
            if (cooldownCheck.onCooldown) {
                await message.reply(`⏰ Você está cansado!\n\nDescanse por: ${cooldownCheck.timeLeft}`);
                return;
            }
            
            const earned = Math.floor(Math.random() * (CONFIG.WORK_MAX - CONFIG.WORK_MIN + 1)) + CONFIG.WORK_MIN;
            addCoins(authorId, chat.id._serialized, earned);
            
            const jobs = [
                '👨‍💻 Você programou um site',
                '🍕 Você entregou pizzas',
                '🚗 Você dirigiu um Uber',
                '📦 Você empacotou produtos',
                '🎨 Você criou um design',
                '📝 Você escreveu artigos'
            ];
            
            const job = jobs[Math.floor(Math.random() * jobs.length)];
            
            await message.reply(`💼 *TRABALHO*\n\n${job}\n\n💰 +${earned} moedas!\nTotal: ${getUserStats(authorId, chat.id._serialized).coins} 🪙`);
        }
        
        if (command === 'loja' || command === 'shop') {
            let shopText = `🏪 *LOJA*\n\n`;
            
            Object.entries(CONFIG.SHOP_ITEMS).forEach(([id, item]) => {
                shopText += `${item.name}\n`;
                shopText += `💰 Preço: ${item.price} moedas\n`;
                shopText += `📝 ${item.description}\n\n`;
            });
            
            shopText += `Use: !comprar [item]\nExemplo: !comprar vip`;
            
            await message.reply(shopText);
        }
        
        if (command === 'comprar' || command === 'buy') {
            const itemId = args[0]?.toLowerCase();
            
            if (!itemId || !CONFIG.SHOP_ITEMS[itemId]) {
                await message.reply('❌ Item inválido! Use !loja para ver os itens.');
                return;
            }
            
            const item = CONFIG.SHOP_ITEMS[itemId];
            const stats = getUserStats(authorId, chat.id._serialized);
            
            if (stats.coins < item.price) {
                await message.reply(`❌ Você não tem moedas suficientes!\n\nPreço: ${item.price} 🪙\nSuas moedas: ${stats.coins} 🪙`);
                return;
            }
            
            if (removeCoins(authorId, chat.id._serialized, item.price)) {
                const key = `${chat.id._serialized}_${authorId}`;
                if (!userInventory[key]) userInventory[key] = [];
                userInventory[key].push(itemId);
                
                await message.reply(`✅ *COMPRA REALIZADA!*\n\n${item.name}\n💰 -${item.price} moedas\n\nSaldo: ${getUserStats(authorId, chat.id._serialized).coins} 🪙`);
            }
        }
        
        if (command === 'transferir' || command === 'transfer') {
            const mentions = await message.getMentions();
            const amount = parseInt(args[1]);
            
            if (mentions.length === 0 || !amount || amount <= 0) {
                await message.reply('❌ Uso: !transferir @user [valor]\nExemplo: !transferir @pessoa 100');
                return;
            }
            
            const stats = getUserStats(authorId, chat.id._serialized);
            if (stats.coins < amount) {
                await message.reply(`❌ Você não tem moedas suficientes!\nSuas moedas: ${stats.coins} 🪙`);
                return;
            }
            
            const targetId = mentions[0].id._serialized;
            
            if (removeCoins(authorId, chat.id._serialized, amount)) {
                addCoins(targetId, chat.id._serialized, amount);
                await message.reply(`✅ *TRANSFERÊNCIA REALIZADA!*\n\n💸 ${amount} moedas → @${mentions[0].id.user}\n\nSeu saldo: ${getUserStats(authorId, chat.id._serialized).coins} 🪙`, {
                    mentions: mentions
                });
            }
        }
        
        // ─────────────── COMANDOS PÚBLICOS ───────────────
        
        if (command === 'ping') {
            const uptime = formatUptime(Date.now() - startTime);
            await message.reply(`╔════════════════════╗
║  🤖 NEXUS GUARD  ║
╚════════════════════╝

🏓 Pong!
⏱️ Uptime: ${uptime}
📊 Versão: ${CONFIG.VERSION}
🧠 IA: ${CONFIG.IA_ENABLED ? 'Ativa' : 'Inativa'}
✅ Status: Online

═══════════════════════
👤 Criado por: ${CONFIG.MEU_NOME}
⚡ NEXUS GUARD`);
        }
        
        if (command === 'regras') {
            await message.reply(`╔══════════════════════╗
║  📋 REGRAS DO GRUPO  ║
╚══════════════════════╝

1️⃣ Respeite todos os membros
2️⃣ Proibido spam/flood
3️⃣ Sem links não autorizados
4️⃣ Sem conteúdo impróprio
5️⃣ Sem palavrões
6️⃣ Mantenha o respeito sempre

⚠️ ${CONFIG.MAX_WARNS} avisos = BAN automático

═══════════════════════
🤖 Bot criado por ${CONFIG.MEU_NOME}
⚡ NEXUS GUARD v${CONFIG.VERSION}`);
        }
        
        if (command === 'perfil' || command === 'profile' || command === 'rank') {
            const mentions = await message.getMentions();
            const targetId = mentions.length > 0 ? mentions[0].id._serialized : authorId;
            const stats = getUserStats(targetId, chat.id._serialized);
            const targetName = mentions.length > 0 ? mentions[0].pushname : message._data.notifyName;
            
            await message.reply(`╔══════════════════╗
║  👤 PERFIL  ║
╚══════════════════╝

👤 *${targetName}*

📊 Level: *${stats.level}*
⭐ XP: *${stats.xp}/${stats.level * 100}*
💰 Moedas: *${stats.coins}*
💬 Mensagens: *${stats.messages}*

═══════════════════
🤖 NEXUS GUARD v${CONFIG.VERSION}`);
        }
        
        if (command === 'top' || command === 'ranking') {
            const groupStats = Object.entries(userStats)
                .filter(([key]) => key.startsWith(chat.id._serialized))
                .sort(([, a], [, b]) => b.level - a.level || b.xp - a.xp)
                .slice(0, 10);
            
            let rankText = `╔═══════════════════╗
║  🏆 TOP 10 RANKING  ║
╚═══════════════════╝\n\n`;
            
            for (let i = 0; i < groupStats.length; i++) {
                const [key, stats] = groupStats[i];
                rankText += `${i + 1}º - Lvl ${stats.level} | ${stats.coins} 🪙 | ${stats.messages} msgs\n`;
            }
            
            rankText += `\n═══════════════════\n🤖 Bot by ${CONFIG.MEU_NOME}`;
            await message.reply(rankText);
        }
        
        if (command === 'comandos' || command === 'help' || command === 'menu') {
            if (isAdminUser) {
                await message.reply(`╔═══════════════════════════════╗
║  🤖 NEXUS GUARD ${CONFIG.VERSION}  ║
╚═══════════════════════════════╝

👑 *PAINEL ADMINISTRATIVO*

*🛡️ Moderação:*
!ban @user - Remove
!kick @user - Remove
!warn @user - Avisar
!unwarn @user - Remover aviso
!warnings @user - Ver avisos

*👥 Administração:*
!promote @user - Promover
!demote @user - Rebaixar
!todos [msg] - Marcar todos
!link - Link do grupo

*⚙️ Configuração:*
!antilink on/off
!antiflood on/off
!welcome on/off
!antipalavrao on/off

*🧠 IA Avançada:*
!ia [pergunta] - IA normal
!resumir [texto] - Resumir
!corrigir [texto] - Corrigir
!sentimento [texto] - Analisar

*🌐 Utilidades:*
!traduzir [lang] [texto]
!clima [cidade]
!noticias [assunto]
!cep [número]

*🎵 Mídia:*
!play [música] - Download
!yt [pesquisa] - Pesquisar
!s - Fazer figurinha

*🎮 Jogos:*
!jogos - Ver jogos
!rpg - RPG
!battle - Batalhar
!roleta - Cassino
!dados - Cassino
!coinflip - Moeda
!quiz - Quiz
!forca - Forca

*💰 Economia:*
!economia - Ver economia
!daily - Diário
!work - Trabalhar
!loja - Ver loja
!comprar [item]
!transferir @user [valor]

*ℹ️ Info:*
!info - Info do grupo
!ping - Status
!regras - Regras
!perfil - Seu perfil
!top - Ranking

═══════════════════════════════
👤 Bot criado por ${CONFIG.MEU_NOME}
📱 ${formatNumber(CONFIG.MEU_NUMERO)}
⚡ NEXUS GUARD - Mega Ultimate`);
            } else {
                await message.reply(`╔═══════════════════╗
║  🤖 NEXUS GUARD  ║
╚═══════════════════╝

*🧠 IA:*
!ia [pergunta] - Falar com IA
!resumir [texto] - Resumir
!corrigir [texto] - Corrigir
!traduzir [lang] [texto]

*🌐 Utilidades:*
!clima [cidade] - Clima
!noticias - Notícias
!cep [número] - Consultar

*🎵 Mídia:*
!play [música] - Download
!yt [pesquisa] - YouTube
!s - Figurinha

*🎮 Jogos:*
!jogos - Ver jogos
!rpg - Seu personagem
!quiz - Quiz
!forca - Forca

*💰 Economia:*
!perfil - Seu perfil
!daily - Diário
!work - Trabalhar
!loja - Ver loja
!top - Ranking

*ℹ️ Info:*
!ping - Status
!regras - Regras
!comandos - Esta mensagem

═══════════════════════
👤 Bot by ${CONFIG.MEU_NOME}
⚡ NEXUS GUARD v${CONFIG.VERSION}`);
            }
        }        // ─────────────── COMANDOS ADMIN ───────────────
        
        if (!isAdminUser) {
            if (['ban', 'kick', 'warn', 'promote', 'demote', 'todos', 'antilink', 'antiflood', 'welcome', 'antipalavrao', 'link', 'info'].includes(command)) {
                await message.reply('❌ *ACESSO NEGADO*\nApenas admins podem usar este comando.');
                return;
            }
        }
        
        // BAN/KICK
        if (command === 'ban' || command === 'kick') {
            const mentions = await message.getMentions();
            if (mentions.length === 0) {
                await message.reply('❌ Marque alguém!\nExemplo: !ban @user');
                return;
            }
            
            for (let contact of mentions) {
                await chat.removeParticipants([contact.id._serialized]);
            }
            await message.reply(`✅ *${mentions.length} usuário(s) removido(s)*`);
        }
        
        // WARN
        if (command === 'warn') {
            const mentions = await message.getMentions();
            if (mentions.length === 0) {
                await message.reply('❌ Marque alguém para avisar!');
                return;
            }
            
            const userId = mentions[0].id._serialized;
            const groupId = chat.id._serialized;
            const key = `${groupId}_${userId}`;
            
            if (!warnings[key]) warnings[key] = 0;
            warnings[key]++;
            
            if (warnings[key] >= CONFIG.MAX_WARNS) {
                await chat.removeParticipants([userId]);
                await message.reply(`⛔ *BAN AUTOMÁTICO*\n@${mentions[0].id.user} atingiu ${CONFIG.MAX_WARNS} avisos!`, {
                    mentions: mentions
                });
                warnings[key] = 0;
            } else {
                await message.reply(`⚠️ *AVISO ${warnings[key]}/${CONFIG.MAX_WARNS}*\n@${mentions[0].id.user} tome cuidado!`, {
                    mentions: mentions
                });
            }
        }
        
        // UNWARN
        if (command === 'unwarn') {
            const mentions = await message.getMentions();
            if (mentions.length === 0) {
                await message.reply('❌ Marque alguém!');
                return;
            }
            
            const userId = mentions[0].id._serialized;
            const groupId = chat.id._serialized;
            const key = `${groupId}_${userId}`;
            
            if (warnings[key] && warnings[key] > 0) {
                warnings[key]--;
                await message.reply(`✅ Aviso removido!\nAvisos restantes: ${warnings[key]}/${CONFIG.MAX_WARNS}`);
            } else {
                await message.reply('ℹ️ Este usuário não possui avisos.');
            }
        }
        
        // WARNINGS
        if (command === 'warnings') {
            const mentions = await message.getMentions();
            if (mentions.length === 0) {
                await message.reply('❌ Marque alguém!');
                return;
            }
            
            const userId = mentions[0].id._serialized;
            const groupId = chat.id._serialized;
            const key = `${groupId}_${userId}`;
            
            const warnCount = warnings[key] || 0;
            await message.reply(`📊 *AVISOS*\n@${mentions[0].id.user}\n${warnCount}/${CONFIG.MAX_WARNS} avisos`, {
                mentions: mentions
            });
        }
        
        // PROMOTE
        if (command === 'promote') {
            const mentions = await message.getMentions();
            if (mentions.length === 0) {
                await message.reply('❌ Marque alguém!');
                return;
            }
            
            for (let contact of mentions) {
                await chat.promoteParticipants([contact.id._serialized]);
            }
            await message.reply('👑 *Admin promovido com sucesso!*');
        }
        
        // DEMOTE
        if (command === 'demote') {
            const mentions = await message.getMentions();
            if (mentions.length === 0) {
                await message.reply('❌ Marque alguém!');
                return;
            }
            
            for (let contact of mentions) {
                await chat.demoteParticipants([contact.id._serialized]);
            }
            await message.reply('📉 *Admin removido com sucesso!*');
        }
        
        // TODOS
        if (command === 'todos' || command === 'everyone') {
            const customMsg = args.join(' ');
            let text = `╔═══════════════════╗
║  📢 ATENÇÃO GERAL!  ║
╚═══════════════════╝\n\n`;
            
            if (customMsg) text += `💬 ${customMsg}\n\n`;
            
            let mentions = [];
            for (let participant of chat.participants) {
                mentions.push(participant.id._serialized);
                text += `@${participant.id.user} `;
            }
            
            await chat.sendMessage(text, { mentions });
        }
        
        // LINK
        if (command === 'link') {
            const inviteCode = await chat.getInviteCode();
            await message.reply(`🔗 *LINK DO GRUPO*\n\nhttps://chat.whatsapp.com/${inviteCode}`);
        }
        
        // INFO
        if (command === 'info') {
            const groupInfo = `╔════════════════════╗
║  📊 INFO DO GRUPO  ║
╚════════════════════╝

📌 Nome: ${chat.name}
👥 Membros: ${chat.participants.length}
📝 Descrição: ${chat.description || 'Sem descrição'}
🔐 Apenas admins: ${chat.onlyAdmins ? 'Sim' : 'Não'}

═══════════════════════
🤖 NEXUS GUARD v${CONFIG.VERSION}
👤 Bot by ${CONFIG.MEU_NOME}`;
            
            await message.reply(groupInfo);
        }
        
        // ANTILINK
        if (command === 'antilink') {
            if (args[0] === 'on') {
                CONFIG.ANTI_LINK.enabled = true;
                await message.reply('✅ *ANTI-LINK ATIVADO*');
            } else if (args[0] === 'off') {
                CONFIG.ANTI_LINK.enabled = false;
                await message.reply('❌ *ANTI-LINK DESATIVADO*');
            } else {
                await message.reply(`ℹ️ *Anti-Link: ${CONFIG.ANTI_LINK.enabled ? 'ON' : 'OFF'}*\n\nUso: !antilink on/off`);
            }
        }
        
        // ANTIFLOOD
        if (command === 'antiflood') {
            if (args[0] === 'on') {
                CONFIG.ANTI_FLOOD.enabled = true;
                await message.reply('✅ *ANTI-FLOOD ATIVADO*');
            } else if (args[0] === 'off') {
                CONFIG.ANTI_FLOOD.enabled = false;
                await message.reply('❌ *ANTI-FLOOD DESATIVADO*');
            } else {
                await message.reply(`ℹ️ *Anti-Flood: ${CONFIG.ANTI_FLOOD.enabled ? 'ON' : 'OFF'}*\n\nUso: !antiflood on/off`);
            }
        }
        
        // WELCOME
        if (command === 'welcome') {
            if (args[0] === 'on') {
                CONFIG.AUTO_WELCOME = true;
                await message.reply('✅ *BOAS-VINDAS ATIVADAS*');
            } else if (args[0] === 'off') {
                CONFIG.AUTO_WELCOME = false;
                await message.reply('❌ *BOAS-VINDAS DESATIVADAS*');
            } else {
                await message.reply(`ℹ️ *Boas-vindas: ${CONFIG.AUTO_WELCOME ? 'ON' : 'OFF'}*\n\nUso: !welcome on/off`);
            }
        }
        
        // ANTI-PALAVRÃO
        if (command === 'antipalavrao') {
            if (args[0] === 'on') {
                CONFIG.WORD_FILTER = true;
                await message.reply('✅ *FILTRO DE PALAVRÕES ATIVADO*');
            } else if (args[0] === 'off') {
                CONFIG.WORD_FILTER = false;
                await message.reply('❌ *FILTRO DE PALAVRÕES DESATIVADO*');
            } else {
                await message.reply(`ℹ️ *Filtro: ${CONFIG.WORD_FILTER ? 'ON' : 'OFF'}*\n\nUso: !antipalavrao on/off`);
            }
        }
        
    } catch (error) {
        // console.error('❌ ERRO:', error);
        await message.reply('⚠️ Ocorreu um erro ao processar o comando.');
    }
});

// ═══════════════════ INICIALIZAÇÃO ═══════════════════════════

client.initialize();

console.log('🚀 Iniciando NEXUS GUARD MEGA ULTIMATE...\n');
console.log('╔════════════════════════════════════╗');
console.log('║     NEXUS GUARD v4.0 MEGA ULTIMATE     ║');
console.log('╚════════════════════════════════════╝');
console.log('');
console.log('📊 Recursos:');
console.log('  ✅ IA Avançada (GROQ)');
console.log('  ✅ Jogos (RPG, Cassino, Quiz, Forca)');
console.log('  ✅ Economia Completa');
console.log('  ✅ Download de Mídia');
console.log('  ✅ Utilidades (Clima, Notícias, CEP)');
console.log('  ✅ Tradutor');
console.log('  ✅ Segurança Máxima');
console.log('  ✅ Sistema de XP/Level');
console.log('');
console.log(`👤 Criador: ${CONFIG.MEU_NOME}`);
console.log('⚡ Aguardando conexão...\n');

// ========== QR CODE WEB ==========
const QRCode = require('qrcode');

app.get('/qr', async (req, res) => {
    if (qrCodeData) {
        try {
            const qrImage = await QRCode.toDataURL(qrCodeData);
            res.send(`
                <html>
                <body style="display:flex;justify-content:center;align-items:center;height:100vh;background:#111;">
                    <div style="text-align:center;">
                        <h1 style="color:#25D366;">📱 NEXUS GUARD</h1>
                        <p style="color:white;">Escaneie com WhatsApp</p>
                        <img src="${qrImage}" style="width:400px;height:400px;"/>
                    </div>
                </body>
                </html>
            `);
        } catch (err) {
            res.send('Erro ao gerar QR Code');
        }
    } else {
        res.send('<h1 style="color:white;background:#111;padding:50px;">Aguardando QR Code... Atualize em alguns segundos</h1>');
    }
});