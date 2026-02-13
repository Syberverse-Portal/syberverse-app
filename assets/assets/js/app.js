// ============================================
// SYBERVERSE - MAIN APPLICATION FILE
// ============================================

import { initNeuralLink } from './modules/neural-link.js';
import { initNexus } from './modules/nexus.js';
import { initComms } from './modules/comms.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('[SYBERVERSE] Initializing Neural Link...');
    initNeuralLink();
    
    console.log('[SYBERVERSE] Initializing Nexus...');
    initNexus();
    
    console.log('[SYBERVERSE] Initializing Comms...');
    initComms();
    
    console.log('[SYBERVERSE] All systems online!');
});
