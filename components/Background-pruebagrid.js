class Hexagon extends HTMLElement {
  constructor(){
    super();
    let shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `
    <style>
      :host{
        display: block;
      }
      #container{
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 3;
        
        
      }
      
      #background{
        position: absolute;
        top: -25%;
        height: 150%;
        z-index: 1;
        border-radius: 50%;
        transition: all 0.6s ease;
        opacity:0;
        background: radial-gradient(circle, rgba(236, 182, 84,1) 50%, rgba(236, 182, 84,0) 75%)
      }
    </style>
    <div id="background"></div>
    <div id="container">
      <slot></slot>
    </div>
    `;
  }
  connectedCallback(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      // true for mobile device
      console.log("mobile device");
    }else{
      // false for not mobile device
      console.log("not mobile device");
    }
    const width = window.getComputedStyle(this).getPropertyValue('width');
    const height = window.getComputedStyle(this).getPropertyValue('height');
    const style = document.createElement('style');
    style.innerHTML = `
      #background{
        width: calc( 3 * ${height} / 2);
        left: calc( ( ${width} - ( 3 * ${height} / 2 ) ) / 2 );
      }
    `;
    this.shadowRoot.appendChild(style);
    this.setPath(width,height);
    this.drawGradient();
    this.clickOnElement()
  }
  setPath(width,height){
    width = parseFloat(width.substring(0, width.length - 2));
    height = parseFloat(height.substring(0, height.length - 2));

    let side = height/2;
    let apothem = side*Math.cos(Math.PI/6)/2;
    let style = document.createElement('style');
    style.innerHTML = `
      #container{
        clip-path: polygon(0 ${side/2}px, 50% 0, 100% ${side/2}px, 100% ${3*side/2}px, 50% 100%, 0 ${3*side/2}px);
      }
    `;
    this.shadowRoot.appendChild(style);

  }
  drawGradient(){

   const hex = this.shadowRoot.getElementById('container')
   const circleBackground = this.shadowRoot.getElementById('background')
   hex.addEventListener('mouseover', e => {
     circleBackground.style = `
     opacity:1;
   `
   })
   hex.addEventListener('mouseout', e => {
    circleBackground.style = `
    opacity:0;
   `
  })
   
  }
  clickOnElement() {
    const hex = this.shadowRoot.getElementById('container')
    hex.addEventListener('click', e => {
      console.log(e)
    })

  }


  
  
}

export default class Backgrid extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `
    <style>
      :host{
        display: block;
      }        
      #container{
        width: 100%;
        height: 100%;
        background-color: grey;
      }
    </style>
    <div id="container"></div>
     `;
  } 


  connectedCallback(){
    this.drawGrid();
  }

  drawGrid(){
     //screen
     let height = window.getComputedStyle(this).getPropertyValue('height');
     let width = window.getComputedStyle(this).getPropertyValue('width');
     
     // hex size

     //resizing
     const computeWidth = parseFloat(width.substring(0, width.length - 2))
     const computeHeight = parseFloat(height.substring(0, height.length - 2))
     console.log(computeWidth, computeHeight);
     let hexH = parseFloat(height.substring(0, height.length - 2))/7;
     if(computeWidth > 1300) hexH = parseFloat(height.substring(0, height.length - 2))/4;
     if(computeWidth < 1300 && computeWidth > 1000) hexH = parseFloat(height.substring(0, height.length - 2))/5;
    
     
    
    let hexW = hexH*Math.cos(Math.PI/6); 

    let side = hexH/2;
    let apothem = hexW/2;
    let wmargin = 10;
    let hmargin = wmargin*Math.tan(Math.PI/3)/2; 

    width = parseFloat(width.substring(0, width.length - 2))+hexW;
    height = parseFloat(height.substring(0, height.length - 2))+hexH;

   

    
    //let widthN = parseInt((Math.sqrt(Math.pow(apothem,2)+2*apothem*margin+8*apothem*width+Math.pow(margin,2)+4*margin*width)+(apothem+margin))/(4*apothem+2*margin));
    //let widthN = parseInt((Math.sqrt(Math.pow(apothem,2)+8*apothem*width+4*margin*width)+apothem)/(4*apothem+2*margin));
    //let widthN = parseInt((4*width)/(9*apothem));
    let heightN = parseInt((height-(2*side))/((3*side/2) + hmargin));
    let widthN = parseInt((width-apothem)/(2*apothem + wmargin));

    // draw Hexes
    for (let j = 0; j < heightN; j++) {
      for (let i = 0; i < widthN; i++) {
        //if(i == widthN+1 && j%2 == 1) break;
        //if(j == 0 && i == 0) break;
        if(j == 0 && i == 0) {
          null
        } else if (j == 0 && i == 1) {
          null
        }else if (j == 1 && i == 0) {
          null
        } else if (j == 2 && i == 0) {
          null
        } else if (j == 0 && i == 2) {
          null
        } else if (j == 1 && i == 1) {
          null
        } else if (j == 2 && i == 1) {
          null
        } else  {
          let hex = document.createElement('fabs-hexagon');
          let content = document.createElement('div');
          content.style = `
            width: 100%;
            height: 100%;
            background-color: rgba(255,255,255,1);
            z-index: 2;
           
          `
          content.className = `hex${i}${j}`
          hex.style = `
            position: absolute;
            top: ${(j*3*side/2)+j*hmargin-side}px;
            left: ${(i*2*apothem)+(j%2)*apothem+i*wmargin-apothem+(j%2)*(wmargin/2)}px;
            width: ${hexW}px;
            height: ${hexH}px;
          `;
          hex.appendChild(content);
          this.shadowRoot.getElementById('container').appendChild(hex);
        }
     
        
      }
    }
  }

 

}

window.customElements.define("back-grid", Backgrid);
window.customElements.define("fabs-hexagon", Hexagon);
