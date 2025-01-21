class Bola {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radio = radioBola;
      this.color = colorBola;
      this.velocidadX = (Math.random() - 0.5) * 0.8;
      this.velocidadY = (Math.random() - 0.5) * 0.8;
    }
  
    dibujar() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  
    mover() {
      this.x += this.velocidadX;
      this.y += this.velocidadY;
  
      // Rebote en los bordes
      if (this.x + this.radio > canvas.width || this.x - this.radio < 0) {
        this.velocidadX = -this.velocidadX;
      }
      if (this.y + this.radio > canvas.height || this.y - this.radio < 0) {
        this.velocidadY = -this.velocidadY;
      }
    }
  }