// themes.js - Theme Management Module
export const THEMES = [
    { id: '', name: 'Alloy Blue', description: 'Clean & Technical' },
    { id: 'theme-enterprise', name: 'Enterprise', description: 'Dashboard Layout' },
    { id: 'theme-minimal', name: 'Startup Minimal', description: 'Big & Spacious' },
    { id: 'theme-developer', name: 'Developer Console', description: 'Terminal Style' }
];

export let currentThemeIndex = 0;

export function applyTheme(index) {
    const theme = THEMES[index];
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');
    
    // Remove all theme classes
    THEMES.forEach(t => { if (t.id) body.classList.remove(t.id); });
    
    // Apply new theme
    if (theme.id) body.classList.add(theme.id);
    
    // Preserve dark mode
    if (isDark) body.classList.add('dark-mode');
    
    // Show toast notification
    const toast = document.getElementById('theme-toast');
    if (toast) {
        toast.textContent = `Theme: ${theme.name} - ${theme.description}`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }
    
    // Save preference
    localStorage.setItem('alloy-theme-index', index);
    
    // Re-render to apply layout changes
    if (window.alloyDemo) {
        window.alloyDemo.render();
    }
}

export function cycleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % THEMES.length;
    applyTheme(currentThemeIndex);
}

export function getCurrentTheme() {
    return THEMES[currentThemeIndex]?.id || '';
}

// Initialize theme on load
export function initTheme() {
    const savedThemeIndex = parseInt(localStorage.getItem('alloy-theme-index') || 0);
    currentThemeIndex = savedThemeIndex;
    applyTheme(savedThemeIndex);
}