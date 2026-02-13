// ============================================
// MODULE A: NEURAL LINK (LOGIN SYSTEM)
// ============================================

import { authenticateUser, logoutUser } from '../core/state.js';
import { validateAlias, validatePasscode, delay, typewriterEffect } from '../core/utils.js';

const neuralLinkContainer = document.getElementById('neural-link');
const aliasInput = document.getElementById('alias');
const passcodeInput = document.getElementById('passcode');
const initiateButton = document.getElementById('initiateButton');
const scannerOverlay = document.getElementById('scannerOverlay');
const statusMessage = document.getElementById('statusMessage');
const logoutButton = document.getElementById('logoutButton');

let isScanning = false;

export function initNeuralLink() {
    initiateButton.addEventListener('click', handleInitiateLink);
    logoutButton.addEventListener('click', handleLogout);
    
    // Allow Enter key to submit
    passcodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleInitiateLink();
        }
    });
}

async function handleInitiateLink() {
    const alias = aliasInput.value.trim();
    const passcode = passcodeInput.value.trim();
    
    // Validation
    if (!validateAlias(alias)) {
        showStatus('ALIAS must be 4-20 characters', 'error');
        return;
    }
    
    if (!validatePasscode(passcode)) {
        showStatus('PASSCODE must be 6+ characters', 'error');
        return;
    }
    
    // Disable button during auth
    initiateButton.disabled = true;
    isScanning = true;
    
    try {
        // Show scanner animation
        scannerOverlay.classList.add('active');
        showStatus('SCANNING NEURAL PATTERN...', 'scanning');
        
        await delay(1500);
        
        showStatus('DECRYPTING CREDENTIALS...', 'scanning');
        await delay(1000);
        
        showStatus('ESTABLISHING SECURE CONNECTION...', 'scanning');
        await delay(1000);
        
        // Simulate successful authentication
        authenticateUser(alias);
        
        showStatus('NEURAL LINK ESTABLISHED ✓', 'success');
        await delay(500);
        
        // Transition to dashboard
        neuralLinkContainer.classList.add('hidden');
        document.getElementById('nexus').classList.remove('hidden');
        
        // Clear inputs
        aliasInput.value = '';
        passcodeInput.value = '';
        
    } catch (error) {
        showStatus('AUTHENTICATION FAILED', 'error');
        console.error('Auth error:', error);
    } finally {
        scannerOverlay.classList.remove('active');
        initiateButton.disabled = false;
        isScanning = false;
    }
}

function handleLogout() {
    logoutUser();
    
    neuralLinkContainer.classList.remove('hidden');
    document.getElementById('nexus').classList.add('hidden');
    
    showStatus('NEURAL LINK DISCONNECTED', 'info');
    
    // Reset scanner
    scannerOverlay.classList.remove('active');
    aliasInput.value = '';
    passcodeInput.value = '';
}

function showStatus(message, type = 'info') {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
}

export { handleInitiateLink, handleLogout };