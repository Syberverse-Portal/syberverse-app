// ============================================
// MODULE A: NEURAL LINK (AUTHENTICATION)
// ============================================

import { authenticateUser } from '../core/state.js';

const authForm = document.getElementById('authForm');
const userAliasInput = document.getElementById('userAlias');
const passcodeInput = document.getElementById('passcodeSequence');
const authFeedback = document.getElementById('authFeedback');
const neuralLink = document.getElementById('neural-link');
const nexus = document.getElementById('nexus');

// Initialize authentication module
export function initNeuralLink() {
    authForm.addEventListener('submit', handleAuthSubmit);
}

// Handle authentication
async function handleAuthSubmit(e) {
    e.preventDefault();
    
    const alias = userAliasInput.value.trim();
    const passcode = passcodeInput.value.trim();
    
    // Show processing state
    showFeedback('SCANNING BIOMETRIC DATA...', 'processing');
    
    // Simulate scan delay
    await simulateScan(2000);
    
    // Authenticate
    if (authenticateUser(alias, passcode)) {
        showFeedback('✓ ACCESS GRANTED - NEURAL LINK ESTABLISHED', 'success');
        
        // Wait before transitioning
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Transition to dashboard
        transitionToDashboard();
    } else {
        showFeedback('✗ SECURITY BREACH - INVALID CREDENTIALS', 'error');
        triggerAuthError();
    }
}

// Show feedback message
function showFeedback(message, type) {
    authFeedback.textContent = message;
    authFeedback.className = `auth-feedback show ${type}`;
}

// Simulate biometric scan
function simulateScan(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

// Trigger error animation
function triggerAuthError() {
    passcodeInput.value = '';
    userAliasInput.focus();
}

// Transition to dashboard
function transitionToDashboard() {
    neuralLink.classList.add('hidden');
    nexus.classList.remove('hidden');
    document.body.setAttribute('data-system-state', 'active');
}

// Export functions for external use
export { showFeedback, transitionToDashboard };