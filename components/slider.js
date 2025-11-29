class AkaySlider extends HTMLElement {
    connectedCallback() {
        const label = this.getAttribute('label') || 'Slider';
        const min = this.getAttribute('min') || 0;
        const max = this.getAttribute('max') || 100;
        const value = this.getAttribute('value') || 50;
        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `\
            <style>
                .slider-container {
                    padding: 0.75rem 0;
                }

                .slider-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                }

                .slider-label {
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.9);
                }

                .slider-value {
                    font-weight: 600;
                    color: #06b6d4;
                    font-size: 0.875rem;
                }

                .slider-input {
                    width: 100%;
                    height: 6px;
                    border-radius: 3px;
                    background: rgba(255, 255, 255, 0.1);
                    outline: none;
                    -webkit-appearance: none;
                }

                .slider-input::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #06b6d4;
                    cursor: pointer;
                    box-shadow: 
                        0 0 0 2px rgba(6, 182, 212, 0.3),
                        0 2px 8px rgba(0, 0, 0, 0.4);
                    transition: all 0.2s ease;
                }

                .slider-input::-webkit-slider-thumb:hover {
                    box-shadow: 
                        0 0 0 2px rgba(6, 182, 212, 0.5),
                        0 4px 12px rgba(0, 0, 0, 0.5);
                    transform: scale(1.1);
                }

                .slider-input::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #06b6d4;
                    cursor: pointer;
                    border: none;
                    box-shadow: 
                        0 0 0 2px rgba(6, 182, 212, 0.3),
                        0 2px 8px rgba(0, 0, 0, 0.4);
                }

                .slider-input::-webkit-slider-track {
                    width: 100%;
                    height: 6px;
                    cursor: pointer;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                }
            </style>
            
            <div class="slider-container">
                <div class="slider-header">
                    <span class="slider-label">${label}</span>
                    <span class="slider-value">${value}</span>
                </div>
                <input 
                    type="range" 
                    min="${min}" 
                    max="${max}" 
                    value="${value}"
                    class="slider-input"
                >
            </div>
        `;
        
        // Add input event listener
        setTimeout(() => {
            const slider = this.shadowRoot.querySelector('.slider-input');
            const valueDisplay = this.shadowRoot.querySelector('.slider-value');
            
            slider?.addEventListener('input', (e) => {
                const newValue = e.target.value;
                valueDisplay.textContent = newValue;
                
                const settingName = label.toLowerCase().replace(/[^a-z0-9]/g, '-');
                document.dispatchEvent(new CustomEvent('settingChanged', {
                    detail: {
                        component: 'slider',
                        name: settingName,
                        value: parseInt(newValue)
                    }
                }));
            });
        }, 100);
    }
}

customElements.define('akay-slider', AkaySlider);