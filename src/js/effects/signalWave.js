export class SignalWave {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.time = 0;
        
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 12, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const waves = [
            { y: this.canvas.height * 0.3, amp: 50, freq: 0.008, speed: 0.02, color: 'rgba(212, 168, 83, 0.15)' },
            { y: this.canvas.height * 0.5, amp: 40, freq: 0.012, speed: 0.025, color: 'rgba(78, 205, 196, 0.12)' },
            { y: this.canvas.height * 0.7, amp: 60, freq: 0.006, speed: 0.015, color: 'rgba(224, 122, 95, 0.1)' }
        ];

        waves.forEach(wave => {
            this.ctx.beginPath();
            this.ctx.moveTo(0, wave.y);

            for (let x = 0; x < this.canvas.width; x += 2) {
                const y = wave.y + 
                    Math.sin(x * wave.freq + this.time * wave.speed) * wave.amp +
                    Math.sin(x * wave.freq * 2 + this.time * wave.speed * 1.5) * wave.amp * 0.3;
                this.ctx.lineTo(x, y);
            }

            this.ctx.strokeStyle = wave.color;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = wave.color;
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        });

        for (let i = 0; i < 5; i++) {
            const x = (this.time * 50 + i * this.canvas.width / 5) % this.canvas.width;
            const y = this.canvas.height * 0.5 + Math.sin(x * 0.01 + this.time * 0.02) * 40;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, 4, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(212, 168, 83, 0.8)';
            this.ctx.fill();

            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 30);
            gradient.addColorStop(0, 'rgba(212, 168, 83, 0.3)');
            gradient.addColorStop(1, 'rgba(212, 168, 83, 0)');
            this.ctx.beginPath();
            this.ctx.arc(x, y, 30, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        }

        this.time++;
        requestAnimationFrame(() => this.animate());
    }
}