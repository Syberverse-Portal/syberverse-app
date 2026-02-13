console.log('[APP] Modules loading...');

import { initNeuralLink } from './modules/neural-link.js';
import { initNexus } from './modules/nexus.js';
import { initComms } from './modules/comms.js';

console.log('[APP] Initializing Neural Link...');
initNeuralLink();

console.log('[APP] Initializing Nexus...');
initNexus();

console.log('[APP] Initializing Comms...');
initComms();

console.log('[APP] All systems online!');
