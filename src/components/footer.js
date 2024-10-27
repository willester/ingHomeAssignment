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
                    position: fixed;
                    justify-content: space-around;
                    background-color: #007BFF;
                    padding-bottom: 3vh;
                    padding-top: 2.11vh;
                    color: white;
                    bottom: 0;
                    width: 100%;
                    z-index: 4;
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
                <lion-button id="cookies">Cookies</lion-button>
                <lion-button id="about">About</lion-button>
                <lion-button id="terms">Terms and Conditions</lion-button>
            </footer>
        `;
	}

	addEventListeners() {
		const cookiesButton = this.shadowRoot.getElementById('cookies');
		const aboutButton = this.shadowRoot.getElementById('about');
		const termsButton = this.shadowRoot.getElementById('terms');

		cookiesButton.addEventListener('click', () => this.showPopup('cookies'));
		aboutButton.addEventListener('click', () => this.showPopup('about'));
		termsButton.addEventListener('click', () => this.showPopup('terms'));
	}

	showPopup(type) {
		let content;
		switch (type) {
			case 'cookies':
				content = `Third-Party Cookies
                    In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website and deliver advertisements on our behalf. Third-party services may include analytics providers, advertising networks, and social media platforms.
                    
                    User Consent
                    By using our website, you consent to the use of cookies in accordance with this Cookies Information section. When you visit our site for the first time, you will be presented with a cookie consent banner that provides you with the option to accept or reject non-essential cookies.`;
				break;
			case 'about':
				content = `About the application
                    An economic credit application is a formal request for financing provided by individuals or businesses to lenders, such as banks, credit unions, or alternative finance companies. This application process enables borrowers to access funds for various purposes, including personal expenses, business operations, investments, or other financial needs.
                            
                    Purpose of the Application
                    The primary purpose of the credit application is to assess the borrower’s creditworthiness and ability to repay the loan. Lenders use the information provided to evaluate financial stability, risk, and the likelihood of repayment.`;
				break;
			case 'terms':
				content = `1. Acceptance of Terms
                    By accessing or using our services, you confirm that you are at least [Insert Age Requirement, e.g., 18 years old] and have the legal capacity to enter into these terms. If you are using the services on behalf of an organization, you represent that you have the authority to bind that organization to these terms.
                
                    2. User Responsibilities
                    You agree to:

                    Provide accurate and up-to-date information when creating an account or using our services.
                    Maintain the confidentiality of your account information and password.
                    Notify us immediately of any unauthorized use of your account or any other breach of security.
                    Use our services only for lawful purposes and in accordance with these terms.

                    3. Intellectual Property
                    All content, trademarks, and other intellectual property on our services are owned by or licensed to [Your Company Name]. You may not reproduce, distribute, modify, or create derivative works of any content without our prior written consent.
                    
                    4. Limitation of Liability
                    To the fullest extent permitted by law, [Your Company Name] shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits or revenue, arising from your use of our services.`;
				break;
			default:
				content = 'No content available.';
		}

		this.dispatchEvent(new CustomEvent('show-popup', { detail: content, bubbles: true, composed: true }));
	}
}

customElements.define('app-footer', AppFooter);
