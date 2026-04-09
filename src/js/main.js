import { SignalWave } from './effects/signalWave.js';
import { MouseParticles } from './effects/mouseParticles.js';
import { DemoParticles } from './effects/demoParticles.js';
import { ScrollObserver } from './effects/scrollObserver.js';
import { Navigation } from './effects/navigation.js';
import { ContactForm } from './effects/contactForm.js';
import { SmoothScroll } from './effects/smoothScroll.js';
import { PostModal, renderPosts } from './effects/postModal.js';
import { experimentsData, timelineData } from './data/content.js';
import { userConfig } from './data/config.js';

class App {
    constructor() {
        this.config = userConfig;
        this.init();
    }

    async init() {
        this.updatePageContent();
        this.initNavigation();
        this.initSignalWave();
        this.initMouseParticles();
        this.renderPosts();
        this.renderExperiments();
        this.initDemoParticles();
        this.renderTimeline();
        this.initScrollObserver();
        this.initPostModal();
        this.initContactForm();
        this.initSmoothScroll();
        this.initResizeHandler();
    }

    updatePageContent() {
        if (this.config.siteName) {
            document.title = this.config.siteName;
            const logo = document.querySelector('.logo');
            if (logo) logo.textContent = this.config.siteName;
        }
        
        if (this.config.hero) {
            const heroTag = document.querySelector('.hero-tag');
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            
            if (heroTag) heroTag.textContent = this.config.hero.tag;
            if (heroTitle) heroTitle.innerHTML = `${this.config.hero.title}<br><span class="highlight">${this.config.hero.highlight}</span>`;
            if (heroSubtitle) heroSubtitle.textContent = this.config.hero.subtitle;
        }
        
        if (this.config.contact) {
            const contactInfo = document.querySelector('.contact-info h3');
            const contactDesc = document.querySelector('.contact-info p');
            const contactEmail = document.querySelector('.contact-link[href^="mailto"]');
            
            if (contactInfo) contactInfo.textContent = this.config.contact.title;
            if (contactDesc) contactDesc.textContent = this.config.contact.description;
            if (contactEmail) contactEmail.href = `mailto:${this.config.contact.email}`;
        }
        
        if (this.config.footer) {
            const footerText = document.querySelector('.footer-bottom p');
            if (footerText) footerText.textContent = this.config.footer.copyright;
        }
    }

    initNavigation() {
        Navigation.init();
    }

    initSignalWave() {
        const canvas = document.getElementById('signalCanvas');
        if (canvas) {
            new SignalWave(canvas);
        }
    }

    initMouseParticles() {
        const canvas = document.getElementById('mouseParticles');
        if (canvas) {
            new MouseParticles(canvas);
        }
    }

    renderPosts() {
        renderPosts();
    }

    initPostModal() {
        PostModal.init();
    }

    initDemoParticles() {
        const canvas = document.getElementById('demoCanvas');
        if (canvas) {
            new DemoParticles(canvas);
        }
    }

    renderTimeline() {
        const wrapper = document.getElementById('timelineWrapper');
        if (!wrapper) return;

        timelineData.forEach(item => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.innerHTML = `
                <span class="timeline-year">${item.year}</span>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-desc">${item.desc}</p>
            `;
            wrapper.appendChild(timelineItem);
        });
    }

    initScrollObserver() {
        ScrollObserver.init();
    }

    initContactForm() {
        ContactForm.init();
    }

    initSmoothScroll() {
        SmoothScroll.init();
    }

    initResizeHandler() {
        window.addEventListener('resize', () => {
            const demoCanvas = document.getElementById('demoCanvas');
            if (demoCanvas) {
                demoCanvas.dispatchEvent(new CustomEvent('resize'));
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});