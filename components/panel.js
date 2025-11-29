class AkayPanel extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title') || 'Panel';
        const icon = this.getAttribute('icon') || 'box';
        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `\
            <style>
                .panel {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 1.5rem;
                    transition: all 0.3s ease;
                    box-shadow: 
                        0 4px 20px rgba(0, 0, 0, 0.3),
                        0 0 0 1px rgba(255, 255, 255, 0.05);
                }

                .panel:hover {
                    border-color: rgba(6, 182, 212, 0.3);
                    box-shadow: 
                        0 8px 30px rgba(0, 0, 0, 0.4),
                        0 0 0 1px rgba(6, 182, 212, 0.1),
                        0 0 20px rgba(6, 182, 212, 0.1);
                }

                .panel-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                }

                .panel-title {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-weight: 600;
                    font-size: 1.125rem;
                    color: white;
                }

                .panel-icon {
                    color: #06b6d4;
                }

                .panel-content {
                    color: rgba(255, 255, 255, 0.8);
                }
            </style>
            
            <div class="panel">
                <div class="panel-header">
                    <div class="panel-title">
                        <i data-feather="${icon}" class="panel-icon"></i>
                        ${title}
                    </div>
                </div>
                <div class="panel-content">
                    <slot></slot>
                </div>
            </div>
        `;
        
        // Initialize Feather icons
        setTimeout(() => {
            if (window.feather) {
                window.feather.replace({ 
                    'stroke-width': 1.5,
                    width: 18,
                    height: 18
                });
            }
        }, 100);
    }
}

customElements.define('akay-panel', AkayPanel);