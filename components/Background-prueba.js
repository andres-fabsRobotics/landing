class Background extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.innerHTML = `
        <style>
        .footerContainer {
            width:100%
            height:100%;
        }
        .hexagon {
            position: relative;
            width: 100px; 
            height: 57.74px;
            background-color: #282828;
            margin: 28.87px 0;
            box-shadow: 0 0 20px rgba(255,174,0,0.6);
            border-left: solid 5px #333333;
            border-right: solid 5px #333333;
          }
          
          .hexagon:before,
          .hexagon:after {
            content: "";
            position: absolute;
            z-index: 1;
            width: 70.71px;
            height: 70.71px;
            -webkit-transform: scaleY(0.5774) rotate(-45deg);
            -ms-transform: scaleY(0.5774) rotate(-45deg);
            transform: scaleY(0.5774) rotate(-45deg);
            background-color: inherit;
            left: 9.6447px;
            box-shadow: 0 0 20px rgba(255,174,0,0.6);
          }
          
          .hexagon:before {
            top: -35.3553px;
            border-top: solid 7.0711px #333333;
            border-right: solid 7.0711px #333333;
          }
          
          .hexagon:after {
            bottom: -35.3553px;
            border-bottom: solid 7.0711px #333333;
            border-left: solid 7.0711px #333333;
          }
          
          /*cover up extra shadows*/
          .hexagon span {
            display: block;
            position: absolute;
            top:2.8867513459481287px;
            left: 0;
            width:90px;
            height:51.9615px;
            z-index: 2;
            background: inherit;
          }
          div:hover {
            background-color:rgba(236, 182, 84, 0.1);
            -webkit-transition: background-color 2s ease-out;
            -moz-transition: background-color 2s ease-out;
            -o-transition: background-color 2s ease-out;
            transition: background-color 2s ease-out;
          }
          
            
        </style>
        
        
        <div class="hexagon"><span></span></div>
       
          
           
        
        `;
    }
  }
  
  window.customElements.define("back-ground", Background);