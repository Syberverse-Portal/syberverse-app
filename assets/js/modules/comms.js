// ============================================
// MODULE C: COMMS (ENCRYPTED CHAT)
// ============================================

import { getState, subscribe, addMessage } from '../core/state.js';
import { mockMessages } from '../data/mock-data.js';
import { formatTime } from '../core/utils.js';

const commsPanel = document.getElementById('comms');
const toggleComms = document.getElementById('toggleComms');
const messageList = document.getElementById('messageList');
const messageInput = document.getElementById('messageInput');
const sendMessage = document.getElementById('sendMessage');

// Initialize comms module
export function initComms() {
    toggleComms.addEventListener('click', toggleCommsPanel);
    sendMessage.addEventListener('click', handleSendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });
    
    // Subscribe to state changes
    subscribe(updateMessages);
    
    // Load mock messages
    renderMessages(mockMessages);
}

// Toggle comms panel visibility
function toggleCommsPanel() {
    commsPanel.classList.toggle('open');
}

// Handle sending message
function handleSendMessage() {
    const content = messageInput.value.trim();
    
    if (content.length === 0) return;
    
    const newMessage = {
        id: `msg_${Date.now()}`,
        sender: 'YOU',
        content: content,
        timestamp: new Date(),
        hasTypewriter: false
    };
    
    addMessage(newMessage);
    renderMessages(getState().messages.length > 0 ? getState().messages : mockMessages);
    messageInput.value = '';
    
    // Auto scroll to bottom
    messageList.scrollTop = messageList.scrollHeight;
}

// Update messages from state
function updateMessages(state) {
    if (state.messages.length > 0) {
        renderMessages(state.messages);
    }
}

// Render messages
function renderMessages(messages) {
    // Keep existing messages, add new ones
    const existingIds = new Set(
        Array.from(messageList.querySelectorAll('.message')).map(el => el.dataset.id)
    );
    
    messages.forEach(message => {
        if (!existingIds.has(message.id)) {
            const messageEl = document.createElement('div');
            messageEl.className = 'message';
            messageEl.dataset.id = message.id;
            messageEl.innerHTML = `
                <div class="message-header">
                    <span class="message-sender">${message.sender}</span>
                    <span class="message-time">${formatTime(message.timestamp)}</span>
                </div>
                <div class="message-content">${message.content}</div>
            `;
            messageList.appendChild(messageEl);
            
            // Auto-scroll to new message
            messageList.scrollTop = messageList.scrollHeight;
        }
    });
}

// Load initial mock messages
function loadInitialMessages() {
    mockMessages.forEach(msg => {
        const messageEl = document.createElement('div');
        messageEl.className = 'message';
        messageEl.dataset.id = msg.id;
        messageEl.innerHTML = `
            <div class="message-header">
                <span class="message-sender">${msg.sender}</span>
                <span class="message-time">${formatTime(msg.timestamp)}</span>
            </div>
            <div class="message-content">${msg.content}</div>
        `;
        messageList.appendChild(messageEl);
    });
}

// Initialize with mock messages
loadInitialMessages();

export { toggleCommsPanel, handleSendMessage };