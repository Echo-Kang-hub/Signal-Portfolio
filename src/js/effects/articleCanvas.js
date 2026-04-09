export class ArticleCanvas {
    constructor(canvas, type) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.type = type;
        this.time = 0;
        
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * 2;
        this.canvas.height = rect.height * 2;
        this.ctx.scale(2, 2);
        this.width = rect.width;
        this.height = rect.height;
    }

    animate() {
        this.ctx.fillStyle = '#0a0a0c';
        this.ctx.fillRect(0, 0, this.width, this.height);

        if (this.type === 1) {
            this.drawGridLight();
        } else if (this.type === 2) {
            this.drawConcentricWaves();
        } else if (this.type === 3) {
            this.drawParticleField();
        }

        this.time++;
        requestAnimationFrame(() => this.animate());
    }

    drawGridLight() {
        this.ctx.strokeStyle = 'rgba(212, 168, 83, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let x = 0; x < this.width; x += 30) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.height; y += 30) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }

        const lightX = (this.time * 2) % this.width;
        const gradient = this.ctx.createRadialGradient(lightX, this.height / 2, 0, lightX, this.height / 2, 80);
        gradient.addColorStop(0, 'rgba(212, 168, 83, 0.5)');
        gradient.addColorStop(1, 'rgba(212, 168, 83, 0)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawConcentricWaves() {
        for (let i = 0; i < 5; i++) {
            const radius = ((this.time + i * 40) % 200);
            this.ctx.beginPath();
            this.ctx.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = `rgba(78, 205, 196, ${0.3 - radius / 700})`;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
    }

    drawParticleField() {
        for (let i = 0; i < 30; i++) {
            const x = (Math.sin(this.time * 0.01 + i) * 0.5 + 0.5) * this.width;
            const y = (Math.cos(this.time * 0.01 + i * 0.7) * 0.5 + 0.5) * this.height;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(224, 122, 95, ${0.3 + Math.sin(this.time * 0.05 + i) * 0.2})`;
            this.ctx.fill();

            for (let j = i + 1; j < 30; j++) {
                const x2 = (Math.sin(this.time * 0.01 + j) * 0.5 + 0.5) * this.width;
                const y2 = (Math.cos(this.time * 0.01 + j * 0.7) * 0.5 + 0.5) * this.height;
                const dist = Math.sqrt((x - x2) ** 2 + (y - y2) ** 2);
                
                if (dist < 80) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y);
                    this.ctx.lineTo(x2, y2);
                    this.ctx.strokeStyle = `rgba(224, 122, 95, ${(1 - dist / 80) * 0.2})`;
                    this.ctx.stroke();
                }
            }
        }
    }
}