import { css, html, LitElement } from 'lit';
import '@lion/ui/define/lion-button.js';
import '@lion/ui/accordion.js';

class HomePage extends LitElement {
	static styles = css`
		#hero {
			position: relative;
			height: 87.5vh;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
		}
		#hero h1 {
			font-size: 3em;
			margin: 0;
		}
		#hero p {
			font-size: 1.5em;
			margin: 10px 0 20px;
		}
		.cta-button {
			padding: 10px 20px;
			background: #28a745;
			color: white;
			border: none;
			border-radius: 5px;
			cursor: pointer;
			text-decoration: none;
		}
		svg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			opacity: 0.6;
			transform: scaleX(1.041);
		}
	`;

	render() {
		return html`
			<section id="hero">
				<svg viewBox="0 0 800 600" preserveAspectRatio="none">
					<defs>
						<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" style="stop-color:#ECBF55; stop-opacity:1" />
							<stop offset="100%" style="stop-color:#F7933A; stop-opacity:1" />
						</linearGradient>
					</defs>
					<path fill="url(#gradient)" d="M0 300 Q 150 100 300 300 T 600 300 Q 750 500 800 300 L 800 600 L 0 600 Z" />
				</svg>
				<h1>Welcome to the Finance Side</h1>
				<p>Your journey to financial literacy starts here.</p>
			</section>
		`;
	}
}

customElements.define('home-page', HomePage);
