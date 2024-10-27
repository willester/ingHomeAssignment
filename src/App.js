import './components/waveAnimation';
import './components/header';
import './components/footer';
import './components/login';
import './components/popup';
import { useEffect, useRef } from 'react';

function App() {
    const mainContentRef = useRef(null);
    const hasInserted = useRef(false);

    useEffect(() => {
        const mainContentElement = mainContentRef.current;

        if (!hasInserted.current && mainContentElement) {
            const appHeader = document.createElement('app-header');
            const waveAnimation = document.createElement('wave-animation');
            const appFooter = document.createElement('app-footer');
            const popupDialog = document.createElement('popup-dialog');

            mainContentElement.insertBefore(appHeader, mainContentElement.firstChild);
            mainContentElement.appendChild(waveAnimation);
            mainContentElement.appendChild(appFooter);
            mainContentElement.appendChild(popupDialog);

            hasInserted.current = true;

            appHeader.addEventListener('login-clicked', () => {
                const loginComponent = document.createElement('login-component');
                mainContentElement.insertBefore(loginComponent, waveAnimation);
                loginComponent.addEventListener('login-success', handleLoginSuccess);
            });

            appHeader.addEventListener('logout-success', () => {
                const loginComponent = mainContentElement.querySelector('login-component');
                if (loginComponent) {
                    loginComponent.remove();
                }
            });

            appHeader.addEventListener('navigate', (event) => {
                const { detail } = event;
                mainContentElement.innerHTML = `<h1>${detail.charAt(0).toUpperCase() + detail.slice(1)} Component</h1>`;
            });

            appFooter.addEventListener('show-popup', (event) => {
                const content = event.detail;
                popupDialog.open(content);
            });
        }

        return () => {
            const loginComponent = mainContentElement?.querySelector('login-component');
            if (loginComponent) {
                loginComponent.removeEventListener('login-success', handleLoginSuccess);
            }
        };
    }, []);

    const handleLoginSuccess = () => {
        const mainContentElement = mainContentRef.current;
        const loginComponent = mainContentElement?.querySelector('login-component');
        if (loginComponent) {
            loginComponent.remove();
        }

        const appHeader = mainContentElement?.querySelector('app-header');
        if (appHeader) {
            appHeader.render();
        }

        window.location.reload();
    };

    return (
        <div className="App">
            <div id="main-content" ref={mainContentRef}>
            </div>
        </div>
    );
}

export default App;
