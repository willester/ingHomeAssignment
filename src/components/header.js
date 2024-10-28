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
                <lion-button id="dark-mode">Dark Mode</lion-button>
                <lion-button id="rainbow">Rainbow background</lion-button>
                <lion-button id="logout">Logout</lion-button>
              `
			: `
                <div id="ctp-credit">
                    <img src='https://png.pngtree.com/png-vector/20231001/ourmid/pngtree-attractive-bald-man-face-head-isolated-png-image_10055661.png' />
                    CTPCredit
                </div>
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
                    z-index: 2;
                    position: relative;
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
                    align-items: center;
                }
                #ctp-credit {
                    display: flex;
                    align-items: center;
                    margin-right: auto;
                    color: white;
                    font-size: 1.5em;
                }
                #ctp-credit img {
                    width: 2.5rem;
                    height: 2.5rem;
                    margin-right: 8px;
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
		buttons.forEach((button) => {
			button.removeEventListener('click', this.handleButtonClick);
			button.addEventListener('click', this.handleButtonClick.bind(this));
		});
	}

	handleButtonClick(event) {
		const buttonId = event.target.id;

		switch (buttonId) {
			case 'home':
			case 'profile':
				this.dispatchEvent(new CustomEvent('navigate', { detail: buttonId, bubbles: true, composed: true }));
				break;
			case 'login':
				this.dispatchEvent(new CustomEvent('login-clicked', { bubbles: true, composed: true }));
				break;
			case 'logout':
				this.handleLogout();
				break;
			case 'dark-mode':
				this.dispatchEvent(new CustomEvent('dark-mode', { bubbles: true, composed: true }));
				break;
			case 'rainbow':
				this.dispatchEvent(new CustomEvent('rainbow', { bubbles: true, composed: true }));
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
