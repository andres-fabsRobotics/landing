class Hexagon extends HTMLElement {
  constructor(){
    super();
    let shadow = this.attachShadow({mode: 'open'});
    this.hoverActive = true;
    this.hola = "hola";
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
        background: radial-gradient(circle, rgba(100,100,90, 1) 50%, rgba(100,100,90, 0) 75%)
      }
    </style>
    <div id="background"></div>
    <div id="container">
      <slot></slot>
    </div>
    `;
  }
  connectedCallback(){
    const width = window.getComputedStyle(this).getPropertyValue('width');
    const height = window.getComputedStyle(this).getPropertyValue('height');
    const style = document.createElement('style');
    style.innerHTML = `
      #background{
        width: calc( 3 * ${height} / 2);
        left: calc( ( ${width} - ( 3 * ${height} / 2 ) ) / 2 );
      }
    `;
    this.shadowRoot.appendChild(style)
    this.setPath(width,height)
    this.drawGradient()
    this.clickOnElement()
    this.isMobile()
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
   if(this.hoverActive) hex.addEventListener('mouseover', e => {
     circleBackground.style = `
     opacity:1;
   `
   })
   hex.addEventListener('mouseout', e => {
    if(this.hoverActive) circleBackground.style = `
    opacity:0;
   `
  })
   
  }
  clickOnElement() {
    const hex = this.shadowRoot.getElementById('container')
    hex.addEventListener('click', e => {
      console.log(e.className)
    })

  }

  isMobile(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      // true for mobile device
      const hex = this.shadowRoot.getElementById('container')
      console.log(hex)
    }else{
      // false for not mobile device
      console.log("not mobile device");
    }
  }
  sayHellow(){
    console.log("hokla");
  }
  set hover(value){
    console.log("lo cambio");
    this.hoverActive = value;
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
        background-color: white ;
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
     
  
     let hexH = 200
     
    
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
    console.log(heightN, widthN);

    // draw Hexes
    for (let j = 0; j < heightN+2; j++) {
      for (let i = 0; i < widthN+2; i++) {
        //if(i == widthN+1 && j%2 == 1) break;
        //if(j == 0 && i == 0) break;
        if(j == 0 && i == 0) {
          this.drawHex(j,i,hexH,hexW,apothem,wmargin,hmargin,side,"white");
        } else if (j == 0 && i == 1) {
          this.drawHex(j,i,hexH,hexW,apothem,wmargin,hmargin,side,"white");
        }else if (j == 1 && i == 0) {
          this.drawHex(j,i,hexH,hexW,apothem,wmargin,hmargin,side,"white");
        } else if (j == 2 && i == 0) {
          this.drawHex(j,i,hexH,hexW,apothem,wmargin,hmargin,side,"white");
        } else if (j == 0 && i == 2) {
          this.drawHex(j,i,hexH,hexW,apothem,wmargin,hmargin,side,"white");
        } else if (j == 1 && i == 1) {
          this.drawHex(j,i,hexH,hexW,apothem,wmargin,hmargin,side,"white");
        } else if (j >= heightN) {
          this.drawHex(j,i,hexH,hexW,apothem,wmargin,hmargin,side,"white");
        } else  {
          this.drawHex(j,i,hexH,hexW,apothem,wmargin,hmargin,side,"rgb(237,183,85)");
        }
     
        
      }
    }
  }

  drawHex(j,i,hexH,hexW,apothem,wmargin,hmargin,side,color){
    let hex = document.createElement('fabs-hexagon');
    let content = document.createElement('div');
    content.style = `
      width: 100%;
      height: 100%;
      background-color: ${color};
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
    if(color == "white") {
      console.log(hex.hola);
      hex.hover = false;
    }
    this.shadowRoot.getElementById('container').appendChild(hex);
  }
 

}

customElements.define("back-grid", Backgrid);
customElements.define("fabs-hexagon", Hexagon);
