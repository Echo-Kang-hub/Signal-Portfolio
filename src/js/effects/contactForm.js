export class ContactForm {
    static init() {
        const form = document.getElementById('contactForm');
        
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('.submit-btn');
            const originalText = btn.textContent;
            btn.textContent = '信号已发送';
            btn.style.background = 'var(--gradient-cool)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'var(--gradient-warm)';
                form.reset();
            }, 2000);
        });
    }
}