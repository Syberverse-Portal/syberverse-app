// ============================================
// CORE MODULE A: STATE MANAGEMENT
// ============================================

let appState = {
    user: {
        alias: '',
        isAuthenticated: false
    },
    missions: [],
    inventory: [],
    messages: [],
    systemStatus: {
        cpu: 0,
        latency: 0,
        credits: 5000
    }
};

// Subscribers for state changes
let subscribers = [];

// Subscribe to state changes
export function subscribe(callback) {
    subscribers.push(callback);
}

// Notify all subscribers
function notifySubscribers() {
    subscribers.forEach(callback => callback(appState));
}

// Get current state
export function getState() {
    return { ...appState };
}

// Update state
export function setState(updates) {
    appState = { ...appState, ...updates };
    notifySubscribers();
}

// Add message
export function addMessage(message) {
    appState.messages.push(message);
    notifySubscribers();
}

// Authenticate user
export function authenticateUser(alias) {
    appState.user = {
        alias: alias,
        isAuthenticated: true
    };
    notifySubscribers();
}

// Logout user
export function logoutUser() {
    appState.user = {
        alias: '',
        isAuthenticated: false
    };
    appState.messages = [];
    notifySubscribers();
}

// Update system status
export function updateSystemStatus(updates) {
    appState.systemStatus = {
        ...appState.systemStatus,
        ...updates
    };
    notifySubscribers();
}

// Export state for debugging
export { appState };