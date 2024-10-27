import './components/waveAnimation';
import './components/header';
import './components/footer';
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

            mainContentElement.insertBefore(appHeader, mainContentElement.firstChild);
            mainContentElement.appendChild(waveAnimation);
            mainContentElement.appendChild(appFooter);

            hasInserted.current = true;

            appHeader.addEventListener('navigate', (event) => {
                const { detail } = event;
                mainContentElement.innerHTML = `<h1>${detail.charAt(0).toUpperCase() + detail.slice(1)} Component</h1>`;
            });

           
        }

    }, []);

    return (
        <div className="App">
            <div id="main-content" ref={mainContentRef}>
            </div>
        </div>
    );
}

export default App;
