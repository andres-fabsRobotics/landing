export default class Navbar extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" })
    shadowRoot.innerHTML = `
      <style>
      .container {
        width: 100%;
        height:20%;
      }
      .containerLogo {
        width:100%;
        height:50%;
        text-align:center;
        display:flex;
        justify-content:space-between;
        align-items:center;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
      }
      .containerButtons {
        width:100%;
        height:50%;
        display:flex;
        justify-content:space-between;
        align-items:center;
      }
      .logo {
        width:30%;
        top:0;
        left:0;
        height:100%;
      }
      .spirit {
        width:70%;
        color:#a21715;
      }
      .mybutton {
        height:100%;
        width:100%;
        background: #a21715;
        color: white;
        border:none;
      }
          
      </style>
      
      <div class='container'>
        <div class='containerLogo'>
          <img class='logo' src='components/3dmodels/Beefeater-Logo.png' />
          <div class='spirit'>
            <h2>Spirit of London</h2>  
            <h3>Since 1820</h3>
          </div>
        </div>
        <div class='containerButtons'>
        <button class='mybutton'>Mundo</button>
        <button class='mybutton'>Beefeater</button>
        <button class='mybutton'>Light</button>
        <button class='mybutton'>Pink</button>
        <button class='mybutton'>24</button>

        </div>
      </div>
      `;
  }
}

customElements.define("nav-bar", Navbar);
