export default class Logo extends HTMLElement {
    constructor() {
      super()
    }
  
    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: "open" })
      shadowRoot.innerHTML = `
        <style>
        :host {
          display:block;
        }
        .logoContainer {
          height:15vh;
          margin-left:15px;
          margin-top: 15px;
          position:absolute;
          font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          z-index:100;
        }
        .logo {
          width:100%;
          

        }
        .texto {
            text-align:center;
            width:100%;
            height:100%;
            font-size:1.5rem;
            text-transform:uppercase;
        }
       
        </style>
        <div class='logoContainer'>
          <div>
             <?xml  version="1.0" encoding="UTF-8"?>
             <svg class='logo' enable-background="new 0 0 595.28 841.89" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                 <circle cx="50" cy="50" r="50" fill="#edb755"/>
                 <path d="m12.11 65.21v-25l21.65-12.5 21.65 12.5v25l-21.65 12.5-21.65-12.5 21.65-12.5" fill="none" stroke="#000">
                     <animateTransform additive="sum" attributeName="transform" attributeType="xml" dur="5.0s" from="360 33.76 52.71" repeatCount="indefinite" to="0 33.76 52.71" type="rotate"/>
                 </path>
                 <circle cx="33.76" cy="52.71" r="2.5" fill="#fff" stroke="#000"/>
                 <path d="m66.24 22.29 21.65 12.5v25l-21.65 12.5-21.65-12.5v-25l21.65-12.5v25" fill="none" stroke="#000">
                     <animateTransform additive="sum" attributeName="transform" attributeType="xml" dur="5.0s" from="0 66.24 47.29" repeatCount="indefinite" to="360 66.24 47.29" type="rotate"/>
                 </path>
                 <circle cx="66.24" cy="47.29" r="2.5" fill="#fff" stroke="#000"/>
             </svg>
          </div>
          <div class='texto'>
            <p>Fabs Robotics</p>

          </div>
        </div>
        `;
    }
  }
  
  customElements.define("fabs-logo", Logo);
  