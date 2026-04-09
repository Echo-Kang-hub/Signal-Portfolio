export class DemoParticles {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mouseX = 0;
        this.mouseY = 0;
        this.particles = [];
        this.lastTime = performance.now();
        this.frameCount = 0;
        this.fps = 0;
        
        this.init();
    }

    init() {
        this.resize();
        this.initParticles();
        
        window.addEventListener('resize', () => {
            this.resize();
            this.initParticles();
        });

        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseleave', () => this.handleMouseLeave());
        
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

    initParticles() {
        this.particles = [];
        
        for (let i = 0; i < 200; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: 2 + Math.random() * 3,
                baseSize: 2 + Math.random() * 3,
                color: `hsl(${30 + Math.random() * 30}, 70%, 60%)`
            });
        }
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    }

    handleMouseLeave() {
        this.mouseX = -1000;
        this.mouseY = -1000;
    }

    animate() {
        this.ctx.fillStyle = '#0a0a0c';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.drawGrid();

        this.particles.forEach(p => this.updateParticle(p));

        this.drawConnections();

        if (this.mouseX > 0 && this.mouseY > 0) {
            this.drawMouseGlow();
        }

        this.updateStats();

        requestAnimationFrame(() => this.animate());
    }

    drawGrid() {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        this.ctx.lineWidth = 1;
        
        for (let x = 0; x < this.width; x += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.height; y += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }
    }

    updateParticle(p) {
        if (this.mouseX > 0 && this.mouseY > 0) {
            const dx = this.mouseX - p.x;
            const dy = this.mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {
                const force = (150 - dist) / 150;
                p.vx += dx * force * 0.01;
                p.vy += dy * force * 0.01;
                p.size = p.baseSize + force * 4;
            } else {
                p.size += (p.baseSize - p.size) * 0.1;
            }
        }

        p.x += p.vx;
        p.y += p.vy;

        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.x < 0 || p.x > this.width) p.vx *= -1;
        if (p.y < 0 || p.y > this.height) p.vy *= -1;
        p.x = Math.max(0, Math.min(this.width, p.x));
        p.y = Math.max(0, Math.min(this.height, p.y));

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.fill();
    }

    drawConnections() {
        this.ctx.strokeStyle = 'rgba(212, 168, 83, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 60) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    drawMouseGlow() {
        const gradient = this.ctx.createRadialGradient(this.mouseX, this.mouseY, 0, this.mouseX, this.mouseY, 100);
        gradient.addColorStop(0, 'rgba(78, 205, 196, 0.2)');
        gradient.addColorStop(1, 'rgba(78, 205, 196, 0)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    updateStats() {
        this.frameCount++;
        const now = performance.now();
        if (now - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = now;
        }

        const particleCountEl = document.getElementById('particleCount');
        const fpsEl = document.getElementById('fps');
        
        if (particleCountEl) particleCountEl.textContent = this.particles.length;
        if (fpsEl) fpsEl.textContent = this.fps;
    }
}