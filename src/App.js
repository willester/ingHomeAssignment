import './components/waveAnimation';
import './components/header';
import './components/footer';
import './components/login';
import './components/popup';
import './components/userDetails';
import './components/home';
import { useEffect, useRef } from 'react';

function App() {
	const mainContentRef = useRef(null);
	const dynamicContentRef = useRef(null);
	const hasInserted = useRef(false);

	useEffect(() => {
		const mainContentElement = mainContentRef.current;
		const dynamicContentElement = dynamicContentRef.current;
		dynamicContentElement.style = `z-index: 2;position: relative; width: 98vw;height: 85vh;`;

		if (!hasInserted.current && mainContentElement && dynamicContentElement) {
			const appHeader = document.createElement('app-header');
			const waveAnimation = document.createElement('wave-animation');
			const appFooter = document.createElement('app-footer');
			const popupDialog = document.createElement('popup-dialog');

			mainContentElement.appendChild(waveAnimation);
			mainContentElement.insertBefore(appHeader, mainContentElement.firstChild);
			mainContentElement.appendChild(appFooter);
			mainContentElement.appendChild(popupDialog);

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
				} else if (detail === 'home') {
					const home = document.createElement('home-page');
					dynamicContentElement.appendChild(home);
				} else {
					dynamicContentElement.innerHTML = `<h1>${detail.charAt(0).toUpperCase() + detail.slice(1)} Component</h1>`;
				}
			});

			appHeader.addEventListener('dark-mode', () => {
				const darkModeStyleElem = document.querySelector('style#darkModeStyle');
				const isDarkMode = darkModeStyleElem !== null;
				const css = 'body {filter: invert(0.9) hue-rotate(0deg);} *::part(image){filter: invert(0.9) hue-rotate(0deg);}';
				const style = document.createElement('style');
				style.setAttribute('id', 'darkModeStyle');
				style.appendChild(document.createTextNode(css));
				if (isDarkMode) {
					document.body.removeChild(darkModeStyleElem);
				} else {
					document.body.appendChild(style);
				}
			});

			let rainbowInterval;
			appHeader.addEventListener('rainbow', () => {
				const darkModeStyleElem = document.querySelector('style#darkModeStyle');
				const isDarkMode = darkModeStyleElem !== null;
				const css = 'body {filter: invert(0.9) hue-rotate(0deg);} *::part(image){filter: invert(0.9) hue-rotate(0deg);}';
				const style = document.createElement('style');
				style.setAttribute('id', 'darkModeStyle');
				style.appendChild(document.createTextNode(css));

				if (isDarkMode) {
					document.body.removeChild(darkModeStyleElem);

					clearInterval(rainbowInterval);
				} else {
					document.body.appendChild(style);
					rainbowInterval = setInterval(function () {
						const radian = Math.random() * 361;
						const previousValue = parseFloat(style.innerHTML.split('hue-rotate(')[1].split('deg)')[0]);
						style.innerHTML = `body {filter: invert(0.9) hue-rotate(${(radian + 20 * previousValue) / 21}deg);} *::part(image){filter: invert(0.9) hue-rotate(${
							(radian + 20 * previousValue) / 21
						}deg);}`;
					}, 200);
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
