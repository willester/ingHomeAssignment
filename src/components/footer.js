import '@lion/ui/define/lion-icon.js';

class AppFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <footer style="display: flex; flex-direction: column; align-items: center; background-color: #333; color: white; padding: 1em;">
                <div style="display: flex; gap: 1em;">
                    <lion-icon .icon="twitter" @click="${this.handleIconClick('https://twitter.com')}"></lion-icon>
                    <lion-icon .icon="discord" @click="${this.handleIconClick('https://discord.com')}"></lion-icon>
                    <lion-icon .icon="facebook" @click="${this.handleIconClick('https://facebook.com')}"></lion-icon>
                </div>
                <nav style="margin-top: 1em; display: flex; gap: 2em;">
                    <a href="#careers" style="color: white;">Careers</a>
                    <a href="#about" style="color: white;">About</a>
                    <a href="#terms" style="color: white;">Terms and Conditions</a>
                </nav>
            </footer>
        `;
    }

    handleIconClick(url) {
        window.open(url, '_blank');
    }
}

customElements.define('app-footer', AppFooter);