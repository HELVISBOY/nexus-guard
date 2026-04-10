const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

// ═══════════════════════════════════════════════════════
//       NEXUS GUARD v3.0 - ULTIMATE EDITION COM IA
//           O Bot Mais Foda do WhatsApp
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
    VERSION: '3.0 ULTIMATE',
    PREFIX: '!',
    MEU_NUMERO: '5567996625282',
    
    // IA - GOOGLE GEMINI (GRÁTIS E ILIMITADO!)
    GEMINI_API_KEY: 'AIzaSyCNEZQFLngiA1QOdL38RxmvmGm3vDi1Se4', // Vou te ensinar a pegar
    IA_ENABLED: true,
    IA_NAME: 'NEXUS',
    
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
    ANTI_FAKE: true,
    AUTO_WELCOME: true,
    AUTO_BYE: true,
    
    // RECURSOS AVANÇADOS
    AUTO_STICKER: true,
    WORD_FILTER: true,
    bad_words: ['palavrão1', 'palavrão2'], // Adicione palavrões aqui
    
    // ECONOMIA/XP
    ECONOMY_ENABLED: true,
    XP_PER_MESSAGE: 5,
    DAILY_COINS: 100
};

// ═══════════════════ DADOS ═══════════════════════════

const admins = [
    '5567996625282@c.us',
    '5567996625282@lid',
    '146866574499886@lid'
];

const warnings = {};
const userMessages = {};
const userStats = {}; // XP, Level, Coins
const afkUsers = {};
const games = {};

// ═══════════════════ INICIALIZAR IA ═══════════════════════════

let genAI;
let model;

if (CONFIG.IA_ENABLED && CONFIG.GEMINI_API_KEY !== 'AIzaSyCNEZQFLngiA1QOdL38RxmvmGm3vDi1Se4') {
    genAI = new GoogleGenerativeAI(CONFIG.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log('🧠 IA Gemini inicializada!');
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

// Sistema de XP/Level
const addXP = (userId, groupId) => {
    if (!CONFIG.ECONOMY_ENABLED) return;
    
    const key = `${groupId}_${userId}`;
    if (!userStats[key]) {
        userStats[key] = { xp: 0, level: 1, coins: 0, messages: 0 };
    }
    
    userStats[key].xp += CONFIG.XP_PER_MESSAGE;
    userStats[key].messages++;
    
    const xpNeeded = userStats[key].level * 100;
    if (userStats[key].xp >= xpNeeded) {
        userStats[key].level++;
        userStats[key].xp = 0;
        return userStats[key].level;
    }
    return null;
};

const getUserStats = (userId, groupId) => {
    const key = `${groupId}_${userId}`;
    return userStats[key] || { xp: 0, level: 1, coins: 0, messages: 0 };
};

// IA - Gemini
const askAI = async (question) => {
    if (!model) return 'IA não configurada. Configure a API Key do Google Gemini.';
    
    try {
        const result = await model.generateContent(`Você é ${CONFIG.IA_NAME}, um assistente inteligente e prestativo. Responda de forma objetiva e amigável em português do Brasil:\n\n${question}`);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Erro na IA:', error);
        return 'Desculpe, tive um erro ao processar sua pergunta.';
    }
};

// ═══════════════════ EVENTOS ═══════════════════════════

const startTime = Date.now();

client.on('qr', (qr) => {
    console.log('\n╔═══════════════════════════════════════╗');
    console.log('║   🤖 NEXUS GUARD v3.0 ULTIMATE 🤖   ║');
    console.log('╚═══════════════════════════════════════╝\n');
    console.log('📱 Escaneie o QR Code:\n');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('\n╔═══════════════════════════════════════╗');
    console.log('║    ✅ NEXUS GUARD ULTIMATE ONLINE! ✅  ║');
    console.log('╚═══════════════════════════════════════╝');
    console.log(`📊 Versão: ${CONFIG.VERSION}`);
    console.log(`🧠 IA: ${CONFIG.IA_ENABLED ? 'ATIVADA' : 'DESATIVADA'}`);
    console.log(`🔐 Segurança: MÁXIMA`);
    console.log(`⚡ Anti-Flood: ${CONFIG.ANTI_FLOOD.enabled ? 'ON' : 'OFF'}`);
    console.log(`🔗 Anti-Link: ${CONFIG.ANTI_LINK.enabled ? 'ON' : 'OFF'}`);
    console.log(`🤬 Filtro de Palavrões: ${CONFIG.WORD_FILTER ? 'ON' : 'OFF'}`);
    console.log(`💰 Sistema de Economia: ${CONFIG.ECONOMY_ENABLED ? 'ON' : 'OFF'}`);
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

📋 *!regras* - Ver regras do grupo
🤖 *!comandos* - Ver todos os comandos
🧠 *!ia [pergunta]* - Falar com a IA

Divirta-se! ⚡`, {
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
        
        await chat.sendMessage(`👋 *${contact.pushname || contact.id.user}* saiu do grupo.\n\nAté mais! 😢`);
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
        
        // XP por mensagem
        const levelUp = addXP(authorId, chat.id._serialized);
        if (levelUp) {
            await message.reply(`🎉 *LEVEL UP!*\n@${authorId.split('@')[0]} subiu para o nível *${levelUp}*! 🚀`, {
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
        
        // Auto-Sticker (imagem vira figurinha)
        if (CONFIG.AUTO_STICKER && message.hasMedia && text === '!s') {
            const media = await message.downloadMedia();
            await client.sendMessage(chat.id._serialized, media, { sendMediaAsSticker: true });
            return;
        }
        
        // ═══════════════════ COMANDOS ═══════════════════════════
        
        if (!text.startsWith(CONFIG.PREFIX)) return;
        
        const args = text.slice(CONFIG.PREFIX.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        
        console.log(`⚡ Comando: ${command} | Admin: ${isAdminUser} | Grupo: ${chat.name}`);
        
        // ─────────────── IA COMMANDS ───────────────
        
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
            await message.reply(`🤖 *${CONFIG.IA_NAME}:*\n\n${response}`);
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
✅ Status: Online`);
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
🤖 Bot: NEXUS GUARD v${CONFIG.VERSION}`);
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
                const userId = key.split('_')[1];
                rankText += `${i + 1}º - Lvl ${stats.level} | ${stats.messages} msgs\n`;
            }
            
            rankText += `\n🤖 NEXUS GUARD v${CONFIG.VERSION}`;
            await message.reply(rankText);
        }
        
        if (command === 'daily' || command === 'diario') {
            const key = `${chat.id._serialized}_${authorId}`;
            if (!userStats[key]) {
                userStats[key] = { xp: 0, level: 1, coins: 0, messages: 0, lastDaily: 0 };
            }
            
            const now = Date.now();
            const lastDaily = userStats[key].lastDaily || 0;
            const cooldown = 24 * 60 * 60 * 1000; // 24 horas
            
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
        
        if (command === 'comandos' || command === 'help' || command === 'menu') {
            if (isAdminUser) {
                await message.reply(`╔═══════════════════════╗
║  🤖 NEXUS GUARD ${CONFIG.VERSION}  ║
╚═══════════════════════╝

👑 *COMANDOS ADMIN*

*🛡️ Moderação:*
!ban @user - Remove
!kick @user - Remove
!warn @user - Avisar (${CONFIG.MAX_WARNS}x=ban)
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

*🧠 IA & Diversão:*
!ia [pergunta] - Perguntar IA
!s - Fazer figurinha (responda imagem)

*📊 Economia/XP:*
!perfil [@user] - Ver perfil
!top - Ranking do grupo
!daily - Coletar moedas diárias

*ℹ️ Info:*
!info - Info do grupo
!ping - Status
!regras - Regras

═══════════════════════
🤖 NEXUS GUARD - Powered by AI`);
            } else {
                await message.reply(`╔═══════════════════╗
║  🤖 COMANDOS  ║
╚═══════════════════╝

*🧠 IA:*
!ia [pergunta] - Falar com IA
!s - Fazer figurinha

*📊 Perfil:*
!perfil [@user] - Ver perfil
!top - Ver ranking
!daily - Coletar moedas

*ℹ️ Info:*
!ping - Status do bot
!regras - Ver regras
!comandos - Esta mensagem

═══════════════════════
⚡ NEXUS GUARD v${CONFIG.VERSION}`);
            }
        }
        
        // ─────────────── COMANDOS ADMIN ───────────────
        
        if (!isAdminUser) {
            if (['ban', 'kick', 'warn', 'promote', 'demote', 'todos', 'antilink', 'antiflood', 'welcome', 'antipalavrao'].includes(command)) {
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

🤖 NEXUS GUARD v${CONFIG.VERSION}`;
            
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
        console.error('❌ ERRO:', error);
        await message.reply('⚠️ Ocorreu um erro ao processar o comando.');
    }
});

// ═══════════════════ INICIALIZAÇÃO ═══════════════════════════

client.initialize();

console.log('🚀 Iniciando NEXUS GUARD ULTIMATE...\n');