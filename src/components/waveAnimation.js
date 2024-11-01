class WaveAnimation extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = `
            <style>
                svg {
                    width: 100%;
                }
                .wave-container {
                    min-height: 25vh;
                    overflow: hidden;
                    top: 0;
                    position: absolute;
                    width: 100%;
                    z-index: 1;
                }
            </style>
            <div class="wave-container">
                <svg viewBox="0 0 1440 640" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <style type="text/css">
                            .wave {
                                animation: wave 8s linear infinite;
                            }

                            .wave1 {
                                animation: wave1 10s linear infinite;
                            }

                            .wave2 {
                                animation: wave2 12s linear infinite;
                            }

                            @keyframes wave {
                                0% { transform: translateX(0%); }
                                100% { transform: translateX(100%); }
                            }

                            @keyframes wave1 {
                                0% { transform: scaleY(1.2) translateX(0%); }
                                100% { transform: scaleY(1.2) translateX(100%); }
                            }

                            @keyframes wave2 {
                                0% { transform: scaleY(.8) translateX(0%); }
                                100% { transform: scaleY(.8) translateX(100%); }
                            }
                        </style>
                        <path id='sineWave' fill="#0099ff" fill-opacity="0.2" d="M0,160 C320,300,420,300,740,160 C1060,20,1120,20,1440,160 V0 H0" />
                    </defs>
                    <use class="wave" href="#sineWave" />
                    <use class="wave" x="-100%" href="#sineWave" />
                    <use class="wave1" href="#sineWave" />
                    <use class="wave1" x="-100%" href="#sineWave" />
                    <use class="wave2" href="#sineWave" />
                    <use class="wave2" x="-100%" href="#sineWave" />
                </svg>
            </div>
        `;
	}
}

customElements.define('wave-animation', WaveAnimation);