// ============================================
// MODULE C: COMMS (ENCRYPTED CHAT)
// ============================================

import { getState, subscribe, addMessage } from '../core/state.js';
import { formatTime } from '../core/utils.js';

const commsPanel = document.getElementById('comms');
const toggleComms = document.getElementById('toggleComms');
const messageList = document.getElementById('messageList');
const messageInput = document.getElementById('messageInput');
const sendMessage = document.getElementById('sendMessage');

// Initialize comms module
export function initComms() {
    if (!toggleComms || !sendMessage) return;
    
    toggleComms.addEventListener('click', toggleCommsPanel);
    sendMessage.addEventListener('click', handleSendMessage);
    
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    }
    
    // Subscribe to state changes
    subscribe(updateMessages);
}

// Toggle comms panel visibility
function toggleCommsPanel() {
    if (commsPanel) {
        commsPanel.classList.toggle('open');
    }
}

// Handle sending message
function handleSendMessage() {
    if (!messageInput || !messageList) return;
    
    const content = messageInput.value.trim();
    
    if (content.length === 0) return;
    
    const newMessage = {
        id: `msg_${Date.now()}`,
        sender: 'YOU',
        content: content,
        timestamp: new Date()
    };
    
    addMessage(newMessage);
    messageInput.value = '';
    
    // Auto scroll to bottom
    messageList.scrollTop = messageList.scrollHeight;
}

// Update messages from state
function updateMessages(state) {
    if (state && state.messages && messageList) {
        renderMessages(state.messages);
    }
}

// Render messages
function renderMessages(messages) {
    if (!messageList) return;
    
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
            messageList.scrollTop = messageList.scrollHeight;
        }
    });
}

export { toggleCommsPanel, handleSendMessage };
