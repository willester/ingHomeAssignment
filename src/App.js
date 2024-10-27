import React, { useEffect } from 'react';
import './AppHeader';
import './AppFooter';
import './WaveAnimation';

const App = () => {
    useEffect(() => {
        // Register the custom elements when the component mounts
        const appHeader = document.createElement('app-header');
        document.body.insertBefore(appHeader, document.getElementById('main-content'));

        const appFooter = document.createElement('app-footer');
        document.body.appendChild(appFooter);

        const waveAnimation = document.createElement('wave-animation');
        document.body.insertBefore(waveAnimation, appFooter);
    }, []);

    return (
        <div>
            <div id="main-content">
                {/* Main content will be dynamically replaced */}
            </div>
        </div>
    );
};

export default App;