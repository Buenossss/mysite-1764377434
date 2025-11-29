// Global state management
const AppState = {
    currentPage: 'aimassist-page',
    settings: {
        theme: 'dark',
        language: 'Français',
        autoLaunch: true
    },
    aimAssist: {
        showOverlay: true,
        fovSize: 50,
        smoothness: 3,
        mode: 'Équilibré',
        minBrightness: 110,
        redPurity: 40,
        trackingActive: true,
        brownMode: false,
        targetDetected: false
    }
};

// Utility functions
const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Save settings to localStorage
    saveSettings() {
        localStorage.setItem('akay-neoassist-settings', JSON.stringify(AppState.settings));
        localStorage.setItem('akay-neoassist-config', JSON.stringify(AppState.aimAssist));
        
        // Show save confirmation
        this.showToast('Configuration sauvegardée !', 'success');
    },

    // Load settings from localStorage
    loadSettings() {
        const savedSettings = localStorage.getItem('akay-neoassist-settings');
        const savedConfig = localStorage.getItem('akay-neoassist-config');
        
        if (savedSettings) {
            AppState.settings = { ...AppState.settings, ...JSON.parse(savedSettings) };
        document.dispatchEvent(new CustomEvent('settingsLoaded', { detail: AppState.settings }));
        }
        
        if (savedConfig) {
            AppState.aimAssist = { ...AppState.aimAssist, ...JSON.parse(savedConfig) };
            document.dispatchEvent(new CustomEvent('configLoaded', { detail: AppState.aimAssist }));
        }
    },

    // Show toast notification
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform translate-x-full`;
        
        const colors = {
            success: 'bg-green-500/20 border border-green-500/30 text-green-300',
            error: 'bg-red-500/20 border border-red-500/30 text-red-300',
            warning: 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-300',
            info: 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-300'
        };
        
        toast.className += ` ${colors[type] || colors.info}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
            toast.classList.add('translate-x-0');
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            toast.classList.remove('translate-x-0');
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    },

    // Initialize app
    init() {
        this.loadSettings();
        
        // Listen for save events
        document.addEventListener('saveSettings', () => {
            this.saveSettings();
        });
        
        // Listen for theme changes
        document.addEventListener('themeChanged', (e) => {
            AppState.settings.theme = e.detail.theme;
            this.applyTheme(e.detail.theme);
        });
        
        console.log('Akay NeoAssist Dashboard initialized');
    },

    // Apply theme to document
    applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.remove('bg-gradient-to-br', 'from-gray-900', 'to-black', 'text-white');
            document.body.classList.add('bg-gradient-to-br', 'from-gray-100', 'to-gray-300', 'text-gray-900');
        } else {
            document.body.classList.remove('bg-gradient-to-br', 'from-gray-100', 'to-gray-300', 'text-gray-900');
            document.body.classList.add('bg-gradient-to-br', 'from-gray-900', 'to-black', 'text-white');
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Utils.init();
});

// Export for use in components
window.AppState = AppState;
window.Utils = Utils;