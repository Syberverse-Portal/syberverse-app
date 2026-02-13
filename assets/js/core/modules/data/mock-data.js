// ============================================
// DATA: MOCK DATA FOR SYBERVERSE
// ============================================

export const mockMessages = [
    {
        id: 'msg_001',
        sender: 'CIPHER',
        content: 'Neural link established. Welcome to the network.',
        timestamp: new Date(Date.now() - 120000)
    },
    {
        id: 'msg_002',
        sender: 'GHOST',
        content: 'Payload is ready for extraction. Coordinates locked.',
        timestamp: new Date(Date.now() - 90000)
    },
    {
        id: 'msg_003',
        sender: 'CIPHER',
        content: 'Security protocols activated. All systems go.',
        timestamp: new Date(Date.now() - 60000)
    }
];

export const mockMissions = [
    {
        id: 'mission_001',
        title: 'DATA EXTRACTION',
        description: 'Retrieve encrypted files from corporate server',
        status: 'active',
        progress: 65,
        reward: 2500
    },
    {
        id: 'mission_002',
        title: 'FIREWALL BREACH',
        description: 'Bypass security system in industrial zone',
        status: 'pending',
        progress: 0,
        reward: 3500
    },
    {
        id: 'mission_003',
        title: 'SYSTEM INFILTRATION',
        description: 'Plant backdoor in government network',
        status: 'completed',
        progress: 100,
        reward: 5000
    }
];

export const mockInventory = [
    {
        id: 'item_001',
        name: 'ICE BREAKER v3.2',
        type: 'tool',
        rarity: 'rare',
        quantity: 1
    },
    {
        id: 'item_002',
        name: 'QUANTUM KEY',
        type: 'key',
        rarity: 'epic',
        quantity: 1
    },
    {
        id: 'item_003',
        name: 'PROXY SHELL',
        type: 'tool',
        rarity: 'uncommon',
        quantity: 3
    },
    {
        id: 'item_004',
        name: 'ENCRYPTION CHIP',
        
        type: 'component',
        rarity: 'rare',
        quantity: 5
    }
];
