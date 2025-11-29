```javascript
class AkayModeSelector extends HTMLElement {
    connectedCallback() {
        const modes = JSON.parse(this.getAttribute('modes') || '["Mode 1", "Mode 2", "Mode 3"]');
        const active = this.getAttribute('active') || modes[0];
        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `\
            <style>
                .mode-selector {
                    display: flex;
                    gap: 0.5rem;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    padding: 0.25rem;
                }

                .mode-button {
                    flex: 1;
                    padding: 0.5rem 0.75rem;
                    border-radius: 8px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                    background: transparent;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.875rem;
                    text-align: center;
                }

                .mode-button.active {
                    background: rgba(6, 182, 212, 0.2);
                    color: #06b6d4;
                    box-shadow: 0 0 10px rgba(6, 182, 212, 0.2);
                }

                .mode-button:hover:not(.active) {
                    background: rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.9);
                }
            </style>
            
            <div class="mode-selector">
                ${modes.map(mode => `
                    <button class="mode-button ${mode === active ? 'active' : ''}">
                        ${mode}
                    </button>
                `).join('')}
            </div>
        `;
        
        // Add click event listeners
        setTimeout(() => {
            const buttons = this.shadowRoot.querySelectorAll('.mode-button');
            
            buttons?.forEach(button => {
                button.addEventListener('click', (e) => {
                    const mode = e.target.textContent.trim();
                    
                    // Update active state
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    document.dispatchEvent(new CustomEvent('settingChanged', {
                        detail: {
                            component: 'mode-selector',
                            name: 'performance-mode