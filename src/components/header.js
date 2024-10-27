import '@lion/ui/define/lion-icon.js';
import '@lion/ui/define/lion-button.js';

class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        const isLogged = this.checkLoginStatus();
        const buttons = isLogged
            ? `
                <lion-button id="home">Home</lion-button>
                <lion-button id="profile">Profile</lion-button>
                <lion-button id="logout">Logout</lion-button>
              `
            : `
                <lion-button id="login">Login</lion-button>
              `;

        this.shadowRoot.innerHTML = `
            <style>
                header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #007BFF;
                    padding: 1em;
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
                .button-container {
                    flex-grow: 1;
                    display: flex;
                    justify-content: space-around;
                }
            </style>
            <header>
                <div class="button-container">
                    ${buttons}
                </div>
            </header>
        `;
    }

    checkLoginStatus() {
        return localStorage.getItem('isLogged') === 'true';
    }

    addEventListeners() {
        const buttons = this.shadowRoot.querySelectorAll('lion-button');
        buttons.forEach(button => {
            button.removeEventListener('click', this.handleButtonClick);
            button.addEventListener('click', this.handleButtonClick.bind(this));
        });
    }

    handleButtonClick(event) {
        const buttonId = event.target.id;

        switch (buttonId) {
            case 'home':
            case 'profile':
            case 'login':
                this.dispatchEvent(new CustomEvent('login-clicked', { bubbles: true, composed: true }));
                break;
            case 'logout':
                this.handleLogout();
                break;
            default:
                break;
        }
    }

    handleLogout() {
        localStorage.setItem('isLogged', 'false');
        this.render();
        this.dispatchEvent(new CustomEvent('logout-success', { bubbles: true, composed: true }));

        window.location.reload();
    }
}

customElements.define('app-header', AppHeader);
