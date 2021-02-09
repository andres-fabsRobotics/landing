export default class Footer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.innerHTML = `
        <style>
        .footerContainer {
            position:absolute;
            bottom:0;
            width:100%;
            height:15%;
            background-color: #091118;
        }
            
        </style>
        
        <div class='footerContainer'>
        soy el footer
          
           77
        </div>
        `;
    }
  }
  
  window.customElements.define("foo-ter", Footer);
  