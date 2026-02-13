// ============================================
// SYBERVERSE - FUNCTIONAL STATE STORE
// ============================================

const initialState = {
    user: {
        id: '',
        alias: '',
        level: 1,
        credits: 0,
        reputation: 'UNKNOWN'
    },
    auth: {
        isAuthenticated: false,
        loginAttempts: 0,
        lastLoginTime: null
    },
    missions: [],
    inventory: [],
    messages: []
};

// Create a reactive state object
let appState = { ...initialState };

// Subscribers for state changes
const subscribers = new Set();

// Subscribe to state changes
export function subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
}

// Notify all subscribers
function notifySubscribers(newState) {
    subscribers.forEach(callback => callback(newState));
}

// Get current state
export function getState() {
    return JSON.parse(JSON.stringify(appState)); // Deep copy
}

// Update state with immutability
export function setState(updates) {
    appState = {
        ...appState,
        ...updates
    };
    notifySubscribers(appState);
}

// Authenticate user
export function authenticateUser(alias, passcode) {
    // Simple validation for demo
    if (alias.length > 3 && passcode.length > 5) {
        const newState = {
            ...appState,
            user: {
                id: `USER_${Date.now()}`,
                alias: alias.toUpperCase(),
                level: Math.floor(Math.random() * 10) + 1,
                credits: Math.floor(Math.random() * 5000) + 1000,
                reputation: ['WANTED', 'NEUTRAL', 'TRUSTED'][Math.floor(Math.random() * 3)]
            },
            auth: {
                isAuthenticated: true,
                loginAttempts: 0,
                lastLoginTime: new Date().toISOString()
            }
        };
        setState(newState);
        return true;
    }
    return false;
}

// Logout user
export function logoutUser() {
    setState({
        ...initialState,
        auth: { isAuthenticated: false, loginAttempts: 0, lastLoginTime: null }
    });
}

// Add mission
export function addMission(mission) {
    const newState = {
        ...appState,
        missions: [...appState.missions, mission]
    };
    setState(newState);
}

// Update mission progress
export function updateMissionProgress(missionId, progress) {
    const newState = {
        ...appState,
        missions: appState.missions.map(m => 
            m.id === missionId ? { ...m, progress } : m
        )
    };
    setState(newState);
}

// Add inventory item
export function addInventoryItem(item) {
    const newState = {
        ...appState,
        inventory: [...appState.inventory, item]
    };
    setState(newState);
}

// Add message
export function addMessage(message) {
    const newState = {
        ...appState,
        messages: [...appState.messages, message]
    };
    setState(newState);
}

export default {
    getState,
    setState,
    subscribe,
    authenticateUser,
    logoutUser,
    addMission,
    updateMissionProgress,
    addInventoryItem,
    addMessage
};