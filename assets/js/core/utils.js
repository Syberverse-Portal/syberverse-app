// ============================================
// SYBERVERSE - UTILITY FUNCTIONS
// ============================================

// Format time as HH:MM:SS
export function formatTime(date) {
    return date.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Format currency
export function formatCurrency(amount) {
    return `¤${amount.toLocaleString()}`;
}

// Generate random ID
export function generateId() {
    return `ID_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

// Simulate glitch effect
export function triggerGlitch(element, duration = 500) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'glitch-skew 3s infinite';
    }, 10);
}

// Create typewriter effect
export function typewriterEffect(element, text, speed = 50) {
    return new Promise((resolve) => {
        let index = 0;
        element.textContent = '';
        
        const interval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

// Simulate network latency data
export function generateLatencyData(points = 20) {
    return Array.from({ length: points }, () => 
        Math.floor(Math.random() * 150) + 20
    );
}

// Format file size
export function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Debounce function
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Random between min and max
export function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
    formatTime,
    formatCurrency,
    generateId,
    triggerGlitch,
    typewriterEffect,
    generateLatencyData,
    formatFileSize,
    debounce,
    throttle,
    randomBetween
};