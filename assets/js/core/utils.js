// ============================================
// CORE MODULE B: UTILITIES
// ============================================

// Format timestamp to readable time
export function formatTime(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
}

// Generate random number within range
export function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Typewriter effect for text
export function typewriterEffect(element, text, speed = 50) {
    return new Promise((resolve) => {
        element.textContent = '';
        let index = 0;
        
        function type() {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        
        type();
    });
}

// Delay function for async operations
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate random status values
export function generateSystemStatus() {
    return {
        cpu: randomBetween(15, 85),
        latency: randomBetween(5, 150),
        credits: randomBetween(1000, 10000)
    };
}

// Validate input
export function validateAlias(alias) {
    return alias.length >= 4 && alias.length <= 20;
}

export function validatePasscode(passcode) {
    return passcode.length >= 6;
}

// Format large numbers with commas
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}