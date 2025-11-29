class AkayToggle extends HTMLElement {
    connectedCallback() {
        const label = this.getAttribute('label') || 'Toggle';
        const checked = this.getAttribute('checked') === 'true';
        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `\
            <style>
                .toggle-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.75rem 0;
                }

                .toggle-label {
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.9);
                }

                .toggle {
                    position: relative;
                    display: inline-block;
                    width: 52px;
                    height: 28px;
                }

                .toggle input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                    border-radius: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .slider:before {
                    position: absolute;
                    content: "";
                    height: 20px;
                    width: 20px;
                    left: 4px;
                    bottom: 3px;
                    background: rgba(255, 255, 255, 0.6);
                    transition: all 0.3s ease;
                    border-radius: 50%;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }

                input:checked + .slider {
                    background: rgba(6, 182, 212, 0.3);
                    border-color: rgba(6, 182, 212, 0.5);
                    box-shadow: 
                        0 0 10px rgba(6, 182, 212, 0.3),
                        inset 0 0 10px rgba(6, 182, 212, 0.1);
                }

                input:checked + .slider:before {
                    transform: translateX(24px);
                    background: #06b6d4;
                    box-shadow: 0 0 10px rgba(6, 182, 212, 0.8);
                }
            </style>
            
            <div class="toggle-container">
                <span class="toggle-label">${label}</span>
                <label class="toggle">
                    <input type="checkbox" ${checked ? 'checked' : ''}>
                    <span class="slider"></span>
                </label>
            </div>
        `;
        
        // Add change event listener
        setTimeout(() => {
            const checkbox = this.shadowRoot.querySelector('input');
            checkbox?.addEventListener('change', (e) => {
                const settingName = label.toLowerCase().replace(/[^a-z0-9]/g, '-');
                document.dispatchEvent(new CustomEvent('settingChanged', {
                    detail: {
                        component: 'toggle',
                        name: settingName,
                        value: e.target.checked
                    }
                }));
            });
        }, 100);
    }
}

customElements.define('akay-toggle', AkayToggle);