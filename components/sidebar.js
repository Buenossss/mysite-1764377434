class AkaySidebar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `\
            <style>
                .sidebar {
                    position: fixed;
                    left: 0;
                    top: 64px;
                    bottom: 0;
                    width: 256px;
                    background: rgba(17, 24, 39, 0.8);
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                    border-right: 1px solid rgba(255, 255, 255, 0.1);
                    z-index: 999;
                    transform: translateX(-100%);
                    transition: transform 0.3s ease-in-out;
                }

                .sidebar.open {
                    transform: translateX(0);
                }

                .sidebar-content {
                    padding: 1.5rem 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .sidebar-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1rem;
                    border-radius: 8px;
                    color: rgba(255, 255, 255, 0.7);
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-weight: 500;
                }

                .sidebar-item:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.9);
                }

                .sidebar-item.active {
                    background: rgba(6, 182, 212, 0.2);
                    color: #06b6d4;
                    box-shadow: 0 0 10px rgba(6, 182, 212, 0.2);
                }

                .sidebar-toggle {
                    position: fixed;
                    top: 76px;
                    left: 1rem;
                    z-index: 1001;
                    background: rgba(6, 182, 212, 0.2);
                    border: 1px solid rgba(6, 182, 212, 0.3);
                    color: #06b6d4;
                    padding: 0.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    display: none;
                }

                @media (max-width: 768px) {
                    .sidebar-toggle {
                        display: block;
                    }
                }
            </style>
            
            <div class="sidebar-toggle">
                <i data-feather="menu"></i>
            </div>
            
            <aside class="sidebar">
                <div class="sidebar-content">
                    <a href="#" class="sidebar-item active" data-target="aimassist-page">
                        <i data-feather="target"></i>
                        🎯 AimAssist
                    </a>
                    <a href="#" class="sidebar-item" data-target="parametres-page">
                        <i data-feather="settings"></i>
                        ⚙️ Paramètres
                    </a>
                    <div style="margin-top: auto; padding-top: 2rem;">
                        <a href="#" class="sidebar-item">
                            <i data-feather="help-circle"></i>
                            Aide
                        </a>
                        <a href="#" class="sidebar-item">
                            <i data-feather="log-out"></i>
                            Quitter
                        </a>
                    </div>
                </div>
            </aside>
        `;
        
        // Initialize sidebar toggle
        setTimeout(() => {
            const sidebar = this.shadowRoot.querySelector('.sidebar');
            const toggle = this.shadowRoot.querySelector('.sidebar-toggle');
            const items = this.shadowRoot.querySelectorAll('.sidebar-item');
            
            toggle?.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
            
            items?.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = item.getAttribute('data-target');
                    
                    // Update active state
                    items.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    
                    // Dispatch navigation event
                    document.dispatchEvent(new CustomEvent('navigateTo', { 
                        detail: { target } 
                    }));
                    
                    // Close sidebar on mobile after selection
                    if (window.innerWidth < 768) {
                        sidebar.classList.remove('open');
                    }
                });
            });
            
            // Initialize Feather icons
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

customElements.define('akay-sidebar', AkaySidebar);