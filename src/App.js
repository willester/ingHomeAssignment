import './components/waveAnimation';
import './components/header';
import './components/footer';
import './components/login';
import './components/popup';
import './components/userDetails';
import { useEffect, useRef } from 'react';

function App() {
    const mainContentRef = useRef(null);
    const dynamicContentRef = useRef(null);
    const hasInserted = useRef(false);

    useEffect(() => {
        const mainContentElement = mainContentRef.current;
        const dynamicContentElement = dynamicContentRef.current;

        if (!hasInserted.current && mainContentElement && dynamicContentElement) {
            const appHeader = document.createElement('app-header');
            const waveAnimation = document.createElement('wave-animation');
            const appFooter = document.createElement('app-footer');
            const popupDialog = document.createElement('popup-dialog');

            mainContentElement.insertBefore(appHeader, mainContentElement.firstChild);
            mainContentElement.appendChild(appFooter);
            mainContentElement.appendChild(popupDialog);
            mainContentElement.appendChild(waveAnimation);

            hasInserted.current = true;

            appHeader.addEventListener('login-clicked', () => {
                const loginComponent = document.createElement('login-component');
                dynamicContentElement.innerHTML = '';
                dynamicContentElement.appendChild(loginComponent);
                loginComponent.addEventListener('login-success', handleLoginSuccess);
            });

            appHeader.addEventListener('logout-success', () => {
                const loginComponent = dynamicContentElement.querySelector('login-component');
                if (loginComponent) {
                    loginComponent.remove();
                }
            });

            appHeader.addEventListener('navigate', (event) => {
                const { detail } = event;
                dynamicContentElement.innerHTML = ''; 

                if (detail === 'profile') {
                    const userDetails = document.createElement('user-details');
                    dynamicContentElement.appendChild(userDetails);
                } else {
                    dynamicContentElement.innerHTML = `<h1>${detail.charAt(0).toUpperCase() + detail.slice(1)} Component</h1>`;
                }
            });

            appFooter.addEventListener('show-popup', (event) => {
                const content = event.detail;
                popupDialog.open(content);
            });
        }

        return () => {
            const loginComponent = dynamicContentElement?.querySelector('login-component');
            if (loginComponent) {
                loginComponent.removeEventListener('login-success', handleLoginSuccess);
            }
        };
    }, []);

    const handleLoginSuccess = () => {
        const dynamicContentElement = dynamicContentRef.current;
        const loginComponent = dynamicContentElement?.querySelector('login-component');
        if (loginComponent) {
            loginComponent.remove();
        }

        const appHeader = mainContentRef.current?.querySelector('app-header');
        if (appHeader) {
            appHeader.render();
        }

        window.location.reload();
    };

    return (
        <div className="App">
            <div id="main-content" ref={mainContentRef}>
                <div id="dynamic-content" ref={dynamicContentRef}></div>
            </div>
        </div>
    );
}

export default App;
