class AkayNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `\
            <style>
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 64px;
                    background: rgba(17, 24, 39, 0.8);
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 1.5rem;
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-weight: 700;
                    font-size: 1.25rem;
                    color: white;
                }

                .logo-icon {
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, #06b6d4, #3b82f6);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .nav-tabs {
                    display: flex;
                    gap: 0.5rem;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    padding: 0.25rem;
                }

                .nav-item {
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                    background: transparent;
                    color: rgba(255, 255, 255, 0.7);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                }

                .nav-item.active {
                    background: rgba(6, 182, 212, 0.2);
                    color: #06b6d4;
                    box-shadow: 0 0 10px rgba(6, 182, 212, 0.3);
                }

                .nav-item:hover:not(.active) {
                    background: rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.9);
                }

                @media (max-width: 768px) {
                    .navbar {
                        padding: 0 1rem;
                    }

                    .logo-text {
                        display: none;
                    }
                }
            </style>
            <nav class="navbar">
                <div class="logo">
                    <div class="logo-icon">
                        <i data-feather="target"></i>
                    </div>
                    <span class="logo-text">Akay NeoAssist</span>
                </div>
                
                <div class="nav-tabs">
                    <button class="nav-item active" data-target="aimassist-page">
                        <i data-feather="target"></i>
                        🎯 AimAssist
                    </button>
                    <button class="nav-item" data-target="parametres-page">
                        <i data-feather="settings"></i>
                        ⚙️ Paramètres
                    </button>
                </div>
            </nav>
        `;
        
        // Initialize Feather icons
        setTimeout(() => {
            if (window.feather) {
                window.feather.replace({ 
                    'stroke-width': 1.5,
                    width: 16,
                    height: 16
                });
            }
        }, 100);
    }
}

customElements.define('akay-navbar', AkayNavbar);