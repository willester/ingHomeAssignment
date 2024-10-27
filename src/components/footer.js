import '@lion/ui/define/lion-button.js';

class AppFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    display: flex;
                    justify-content: space-around;
                    background-color: #007BFF;
                    padding: 1em;
                    color: white;
                    position: relative;
                    bottom: 0;
                    width: 100%;
                }
                lion-button {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                }
                lion-button:hover {
                    text-decoration: underline;
                }
            </style>
            <footer>
                <lion-button id="job">Job</lion-button>
                <lion-button id="about">About</lion-button>
                <lion-button id="terms">Terms and Conditions</lion-button>
            </footer>
        `;
    }

    addEventListeners() {
        const jobButton = this.shadowRoot.getElementById('job');
        const aboutButton = this.shadowRoot.getElementById('about');
        const termsButton = this.shadowRoot.getElementById('terms');

        jobButton.addEventListener('click', () => this.showPopup('job'));
        aboutButton.addEventListener('click', () => this.showPopup('about'));
        termsButton.addEventListener('click', () => this.showPopup('terms'));
    }

    showPopup(type) {
        let content;
        switch (type) {
            case 'job':
                content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.";
                break;
            case 'about':
                content = "A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z.";
                break;
            case 'terms':
                content = ":(";
                break;
            default:
                content = "No content available.";
        }

        this.dispatchEvent(new CustomEvent('show-popup', { detail: content, bubbles: true, composed: true }));
    }
}

customElements.define('app-footer', AppFooter);
