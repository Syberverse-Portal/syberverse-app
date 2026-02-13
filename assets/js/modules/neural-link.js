// ============================================
// MODULE A: NEURAL LINK (LOGIN SYSTEM)
// ============================================

import { authenticateUser, logoutUser } from '../core/state.js';
import { validateAlias, validatePasscode, delay } from '../core/utils.js';

export function initNeuralLink() {
    const aliasInput = document.getElementById('alias');
    const passcodeInput = document.getElementById('passcode');
    const initiateButton = document.getElementById('initiateButton');
    const logoutButton = document.getElementById('logoutButton');
    const statusMessage = document.getElementById('statusMessage');
    const neuralLink = document.getElementById('neural-link');
    const nexus = document.getElementById('nexus');
    
    // Safety checks
    if (!initiateButton) {
        console.error('initiateButton not found');
        return;
    }
    
    if (!aliasInput || !passcodeInput) {
        console.error('Input fields not found');
        return;
    }
    
    console.log('[NEURAL-LINK] Initializing...');
    
    // Prevent form submission
    const form = document.getElementById('authForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleInitiate();
        });
    }
    
    initiateButton.addEventListener('click', handleInitiate);
    
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
    
    // Allow Enter key to submit
    passcodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleInitiate();
        }
    });
    
    async function handleInitiate() {
        const alias = aliasInput.value.trim();
        const passcode = passcodeInput.value.trim();
        
        console.log('[NEURAL-LINK] Attempting login...');
        
        // Validation
        if (!validateAlias(alias)) {
            showStatus('ALIAS must be 4-20 characters', 'error');
            return;
        }
        
        if (!validatePasscode(passcode)) {
            showStatus('PASSCODE must be 6+ characters', 'error');
            return;
        }
        
        // Disable button
        initiateButton.disabled = true;
        
        try {
            showStatus('SCANNING NEURAL PATTERN...', 'scanning');
            await delay(1000);
            
            showStatus('DECRYPTING CREDENTIALS...', 'scanning');
            await delay(1000);
            
            showStatus('ESTABLISHING SECURE CONNECTION...', 'scanning');
            await delay(1000);
            
            // Authenticate user
            authenticateUser(alias);
            
            showStatus('NEURAL LINK ESTABLISHED ✓', 'success');
            await delay(500);
            
            // Transition to dashboard
            neuralLink.classList.add('hidden');
            nexus.classList.remove('hidden');
            
            console.log('[NEURAL-LINK] Login successful!');
            
        } catch (error) {
            showStatus('AUTHENTICATION FAILED', 'error');
            console.error('[NEURAL-LINK] Error:', error);
        } finally {
            initiateButton.disabled = false;
        }
    }
    
    function handleLogout() {
        console.log('[NEURAL-LINK] Logging out...');
        logoutUser();
        
        neuralLink.classList.remove('hidden');
        nexus.classList.add('hidden');
        
        showStatus('NEURAL LINK DISCONNECTED', 'info');
        
        aliasInput.value = '';
        passcodeInput.value = '';
        initiateButton.disabled = false;
    }
    
    function showStatus(message, type = 'info') {
        if (statusMessage) {
            statusMessage.textContent = message;
            statusMessage.className = `status-message ${type}`;
        }
    }
}
