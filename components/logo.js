export default class Logo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
        <style>
        :host {
          display:block;
        }
        .logoContainer {
          width:50%;
          height:20%;
          width: 300px;
          height: auto;
          margin-left:20px;
          margin-top: -30px;
          position:absolute;
          font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          z-index:100;
        }
        .logo {
          width:100%;
          

        }
       
       
        </style>
        <div class='logoContainer'>
            <img class = "logo" src = "../components/3dmodels/_LOGO_OFICIAL_Mesa de trabajo 1.png" />
        </div>

        </div>
        `;
  }
}

customElements.define("fabs-logo", Logo);
