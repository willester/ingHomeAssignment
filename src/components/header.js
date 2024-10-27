import '@lion/button/define.js';

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
              `
            : `
                <lion-button id="login">Login</lion-button>
              `;

        this.shadowRoot.innerHTML = `
            <header style="display: flex; justify-content: space-around; background-color: #007BFF; padding: 1em;">
                ${buttons}
            </header>
        `;
    }

    checkLoginStatus() {
        return localStorage.getItem('isLogged') === 'true'; // Check login status in local storage
    }

    addEventListeners() {
        const buttons = this.shadowRoot.querySelectorAll('lion-button');
        buttons.forEach(button => {
            button.addEventListener('click', () => this.handleButtonClick(button.id));
        });
    }

    handleButtonClick(buttonId) {
        const mainContent = document.getElementById('main-content');

        switch (buttonId) {
            case 'home':
                mainContent.innerHTML = '<h1>Home Component</h1>';
                break;
            case 'profile':
                mainContent.innerHTML = '<h1>Profile Component</h1>';
                break;
            case 'login':
                mainContent.innerHTML = '<h1>Login Component</h1>';
                localStorage.setItem('isLogged', 'true');
                this.render(); // Re-render header
                break;
            default:
                break;
        }
    }
}

customElements.define('app-header', AppHeader);