// ============================================
// SYBERVERSE - MAIN APPLICATION FILE
// ============================================

console.log('[APP] Starting SYBERVERSE...');

import { initNeuralLink } from './modules/neural-link.js';
import { initNexus } from './modules/nexus.js';
import { initComms } from './modules/comms.js';

console.log('[APP] Modules imported');

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    console.log('[APP] DOM Ready - Initializing modules...');
    
    try {
        initNeuralLink();
        console.log('[APP] Neural Link initialized');
        
        initNexus();
        console.log('[APP] Nexus initialized');
        
        initComms();
        console.log('[APP] Comms initialized');
        
        console.log('[APP] All systems online!');
    } catch (error) {
        console.error('[APP] Initialization error:', error);
    }
}
