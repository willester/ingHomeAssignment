class PopupDialog extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isOpen = false;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                :host([open]) {
                    display: flex;
                }
                .dialog {
                    background: white;
                    padding: 20px;
                    border-radius: 5px;
                    max-width: 500px;
                    text-align: center;
                    position: relative;
                }
                .close-button {
                    margin-top: 20px;
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
            </style>
            <div class="dialog">
                <div id="content">Default Content</div>
                <button class="close-button">Close</button>
            </div>
        `;

        this.shadowRoot.querySelector('.close-button').addEventListener('click', () => {
            this.close();
        });
    }

    open(content) {
        this.shadowRoot.getElementById('content').innerText = content;
        this.isOpen = true;
        this.setAttribute('open', '');
    }

    close() {
        this.isOpen = false;
        this.removeAttribute('open');
    }
}

customElements.define('popup-dialog', PopupDialog);
