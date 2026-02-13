// ============================================
// SYBERVERSE - MOCK DATA
// ============================================

export const mockMissions = [
    {
        id: 1,
        title: "DATA HEIST",
        description: "Infiltrate corporate mainframe",
        progress: 45,
        status: "ACTIVE",
        reward: 500
    },
    {
        id: 2,
        title: "NETWORK BREACH",
        description: "Bypass security protocols",
        progress: 70,
        status: "ACTIVE",
        reward: 750
    },
    {
        id: 3,
        title: "SYSTEM TAKEOVER",
        description: "Seize control of AI cluster",
        progress: 20,
        status: "ACTIVE",
        reward: 1200
    },
    {
        id: 4,
        title: "CODE CRACKING",
        description: "Decrypt classified encryption",
        progress: 0,
        status: "PENDING",
        reward: 400
    }
];

export const mockInventory = [
    {
        id: 'inv_1',
        name: 'CRYPTO_KEY',
        type: 'software',
        icon: 'fa-key',
        rarity: 'rare'
    },
    {
        id: 'inv_2',
        name: 'DATA_SHARD',
        type: 'data',
        icon: 'fa-database',
        rarity: 'common'
    },
    {
        id: 'inv_3',
        name: 'EXPLOIT_PACK',
        type: 'software',
        icon: 'fa-bomb',
        rarity: 'epic'
    },
    {
        id: 'inv_4',
        name: 'FIREWALL_TOOL',
        type: 'software',
        icon: 'fa-shield',
        rarity: 'rare'
    },
    {
        id: 'inv_5',
        name: 'NEURAL_CACHE',
        type: 'hardware',
        icon: 'fa-microchip',
        rarity: 'legendary'
    },
    {
        id: 'inv_6',
        name: 'MEMORY_CORE',
        type: 'hardware',
        icon: 'fa-memory',
        rarity: 'common'
    }
];

export const mockMessages = [
    {
        id: 'msg_1',
        sender: 'GHOST_PROTOCOL',
        content: 'Neural link initialized. Welcome back.',
        timestamp: new Date(Date.now() - 300000),
        hasTypewriter: true
    },
    {
        id: 'msg_2',
        sender: 'SYSTEM_ADMIN',
        content: 'Security breach detected on Section 7. Investigating...',
        timestamp: new Date(Date.now() - 180000),
        hasTypewriter: false
    },
    {
        id: 'msg_3',
        sender: 'FIXER_ZERO',
        content: 'Got a job for you. Interested?',
        timestamp: new Date(Date.now() - 60000),
        hasTypewriter: true
    }
];

export default {
    mockMissions,
    mockInventory,
    mockMessages
};