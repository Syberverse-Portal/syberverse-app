// ============================================
// MODULE B: NEXUS (DASHBOARD)
// ============================================

import { getState, subscribe, updateSystemStatus } from '../core/state.js';
import { randomBetween, formatNumber } from '../core/utils.js';

const statusMonitor = document.getElementById('statusMonitor');
const activeMissions = document.getElementById('activeMissions');
const theDeck = document.getElementById('theDeck');

export function initNexus() {
    renderStatusMonitor();
    renderMissions();
    renderInventory();
    
    // Update system status every 2 seconds
    setInterval(() => {
        updateSystemStatus({
            cpu: randomBetween(10, 90),
            latency: randomBetween(5, 200),
            credits: randomBetween(4000, 6000)
        });
    }, 2000);
    
    // Subscribe to state changes
    subscribe((state) => {
        if (state && state.systemStatus) {
            renderStatusMonitor();
        }
    });
}

function renderStatusMonitor() {
    if (!statusMonitor) return;
    
    const state = getState();
    const { cpu, latency, credits } = state.systemStatus;
    
    statusMonitor.innerHTML = `
        <div class="status-item">
            <div class="status-label">CPU USAGE</div>
            <div class="status-bar">
                <div class="status-fill" style="width: ${cpu}%"></div>
            </div>
            <div class="status-value">${cpu}%</div>
        </div>
        <div class="status-item">
            <div class="status-label">NETWORK LATENCY</div>
            <div class="status-bar">
                <div class="status-fill" style="width: ${Math.min(latency / 2, 100)}%"></div>
            </div>
            <div class="status-value">${latency}ms</div>
        </div>
        <div class="status-item">
            <div class="status-label">CREDITS</div>
            <div class="status-value">${formatNumber(credits)}</div>
        </div>
    `;
}

function renderMissions() {
    if (!activeMissions) return;
    activeMissions.innerHTML = '';
    
    const missions = [
        { title: 'DATA EXTRACTION', description: 'Retrieve encrypted files', status: 'active', progress: 65 },
        { title: 'FIREWALL BREACH', description: 'Bypass security system', status: 'pending', progress: 0 },
        { title: 'SYSTEM INFILTRATION', description: 'Plant backdoor', status: 'completed', progress: 100 }
    ];
    
    missions.forEach(mission => {
        const missionEl = document.createElement('div');
        missionEl.className = 'mission-item';
        missionEl.innerHTML = `
            <div class="mission-header">
                <div class="mission-title">${mission.title}</div>
                <div class="mission-status ${mission.status}">${mission.status.toUpperCase()}</div>
            </div>
            <div class="mission-description">${mission.description}</div>
            <div class="mission-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${mission.progress}%"></div>
                </div>
                <div class="progress-text">${mission.progress}%</div>
            </div>
        `;
        activeMissions.appendChild(missionEl);
    });
}

function renderInventory() {
    if (!theDeck) return;
    theDeck.innerHTML = '';
    
    const inventory = [
        { name: 'ICE BREAKER v3.2', type: 'tool', quantity: 1 },
        { name: 'QUANTUM KEY', type: 'key', quantity: 1 },
        { name: 'PROXY SHELL', type: 'tool', quantity: 3 },
        { name: 'ENCRYPTION CHIP', type: 'component', quantity: 5 }
    ];
    
    inventory.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'inventory-item';
        itemEl.innerHTML = `
            <div class="item-name">${item.name}</div>
            <div class="item-type">${item.type}</div>
            <div class="item-quantity">x${item.quantity}</div>
        `;
        theDeck.appendChild(itemEl);
    });
}

export { renderStatusMonitor, renderMissions, renderInventory };
