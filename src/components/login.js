import '@lion/ui/define/lion-icon.js';
import '@lion/ui/define/lion-button.js';

class LoginComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.errorMessage = '';
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .login-container {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: white;
                    padding: 2em;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    z-index: 10;
                }
                lion-button {
                    background: #007BFF;
                    border: none;
                    color: white;
                    border-radius: 5px;
                    cursor: pointer;
                }
                lion-button:hover {
                    opacity: 0.8;
                }
                .error-message {
                    color: red;
                    margin-top: 10px;
                }
            </style>
            <div class="login-container">
                <h2>Login</h2>
                <form id="login-form">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                    <br>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                    <br>
                    <lion-button id="submit">Login</lion-button>
                    <div class="error-message" id="error-message">${this.errorMessage}</div>
                </form>
            </div>
        `;
        this.addEventListeners();
    }

    addEventListeners() {
        const submitButton = this.shadowRoot.getElementById('submit');
        submitButton.removeEventListener('click', this.handleLoginClick);
        submitButton.addEventListener('click', this.handleLoginClick);
    }

    handleLoginClick(event) {
        event.preventDefault(); // Prevent form submission
        const username = this.shadowRoot.getElementById('username').value;
        const password = this.shadowRoot.getElementById('password').value;

        // Dummy authentication check for demonstration purposes
        if (username === 'test' && password === 'test') {
            localStorage.setItem('isLogged', 'true');
            this.dispatchEvent(new CustomEvent('login-success', { bubbles: true, composed: true }));
            this.errorMessage = ''; // Clear error message on success
        } else {
            this.errorMessage = 'Sorry, it seems that a user with the inserted credentials does not exist.'; // Set error message
        }

        this.render(); // Re-render to display the updated error message or clear it
    }
}

customElements.define('login-component', LoginComponent);
