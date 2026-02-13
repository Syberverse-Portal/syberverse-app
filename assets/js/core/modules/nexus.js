// ============================================
// MODULE B: NEXUS (DASHBOARD)
// ============================================

import { getState, subscribe, updateMissionProgress } from '../core/state.js';
import { mockMissions, mockInventory } from '../data/mock-data.js';
import { randomBetween } from '../core/utils.js';

const nexus = document.getElementById('nexus');
const missionList = document.getElementById('missionList');
const inventoryGrid = document.getElementById('inventoryGrid');
const userAliasDisplay = document.getElementById('userAliasDisplay');
const userLevel = document.getElementById('userLevel');
const userCredits = document.getElementById('userCredits');
const logoutBtn = document.getElementById('logoutBtn');
const cpuUsage = document.getElementById('cpuUsage');
const cpuValue = document.getElementById('cpuValue');
const latencyGraph = document.getElementById('latencyGraph');

// Initialize dashboard
export function initNexus() {
    // Subscribe to state changes
    subscribe(updateDashboard);
    
    // Initial render
    updateDashboard(getState());
    
    // Start simulations
    simulateCPUUsage();
    simulateLatencyGraph();
    
    // Setup event listeners
    logoutBtn.addEventListener('click', handleLogout);
}

// Update dashboard with state
function updateDashboard(state) {
    if (state.auth.isAuthenticated) {
        userAliasDisplay.textContent = state.user.alias;
        userLevel.textContent = state.user.level;
        userCredits.textContent = state.user.credits.toLocaleString();
        
        renderMissions(mockMissions);
        renderInventory(mockInventory);
    }
}

// Render missions
function renderMissions(missions) {
    missionList.innerHTML = '';
    missions.forEach(mission => {
        const missionEl = document.createElement('li');
        missionEl.className = 'mission-item';
        missionEl.innerHTML = `
            <div class="mission-title">${mission.title}</div>
            <div class="mission-progress">${mission.description}</div>
            <div class="mission-bar">
                <div class="mission-bar-fill" style="width: ${mission.progress}%"></div>
            </div>
            <div class="mission-progress">${mission.progress}% Complete</div>
        `;
        missionList.appendChild(missionEl);
    });
    
    // Update mission count
    document.getElementById('missionCount').textContent = missions.length;
}

// Render inventory
function renderInventory(items) {
    inventoryGrid.innerHTML = '';
    items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'inventory-item';
        itemEl.innerHTML = `
            <i class="fas ${item.icon}"></i>
            <div class="inventory-item-name">${item.name}</div>
        `;
        itemEl.addEventListener('click', () => {
            console.log('Item selected:', item.name);
        });
        inventoryGrid.appendChild(itemEl);
    });
    
    // Update inventory count
    document.getElementById('inventoryCount').textContent = items.length;
}

// Simulate CPU usage
function simulateCPUUsage() {
    setInterval(() => {
        const usage = randomBetween(20, 95);
        cpuUsage.style.width = usage + '%';
        cpuValue.textContent = usage + '%';
    }, 2000);
}

// Simulate latency graph
function simulateLatencyGraph() {
    const ctx = latencyGraph.getContext('2d');
    const width = latencyGraph.width;
    const height = latencyGraph.height;
    
    function drawGraph() {
        // Clear canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, width, height);
        
        // Draw grid
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i < width; i += 30) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }
        
        // Generate random data points
        const dataPoints = [];
        for (let i = 0; i < 20; i++) {
            dataPoints.push(randomBetween(20, 150));
        }
        
        // Draw line graph
        ctx.strokeStyle = '#00ff41';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        dataPoints.forEach((value, index) => {
            const x = (index / dataPoints.length) * width;
            const y = height - (value / 200) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Draw points
        ctx.fillStyle = '#00ff41';
        dataPoints.forEach((value, index) => {
            const x = (index / dataPoints.length) * width;
            const y = height - (value / 200) * height;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    // Update graph every 3 seconds
    drawGraph();
    setInterval(drawGraph, 3000);
}

// Handle logout
function handleLogout() {
    // This will be implemented with state management
    location.reload();
}

export { renderMissions, renderInventory };