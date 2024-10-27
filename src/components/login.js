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
                #submit {
                    float: right;
                    padding-right: 10px;
                    margin-right: 10px;
                }
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
                .login-component {
                    padding: 10px;
                }
                .error-message {
                    color: red;
                    margin-top: 10px;
                }
                label{
                    margin-top: 10px;
                }
                input {
                    padding: 10px;
                    overflow: visible;
                    border: 1px solid #cdcdcd;
                    border-radius: 4px
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
            </style>
            <div class="login-container">
                <h2 style="text-align:center">Login</h2>
                <form id="login-form">
                    <div class="login-component">
                        <input type="text" id="username" name="username" placeholder="Username" required>
                        <br>
                    </div>
                    <div class="login-component">
                        <input type="password" id="password" name="password" placeholder="Password" required>
                        <br>
                    </div>
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
        event.preventDefault();
        const username = this.shadowRoot.getElementById('username').value;
        const password = this.shadowRoot.getElementById('password').value;

        if (username === 'test' && password === 'test') {
            localStorage.setItem('isLogged', 'true');
            this.dispatchEvent(new CustomEvent('login-success', { bubbles: true, composed: true }));
            this.errorMessage = '';
        } else {
            this.errorMessage = 'Sorry, it seems that a user with the inserted credentials does not exist.';
        }

        this.render();
    }
}

customElements.define('login-component', LoginComponent);
