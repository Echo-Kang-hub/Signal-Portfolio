import { MarkdownParser } from '../utils/markdown.js';
import { getAllPosts, getPostBySlug } from '../data/posts.js';

export class PostModal {
    static init() {
        this.modal = document.getElementById('postModal');
        this.overlay = this.modal.querySelector('.post-modal-overlay');
        this.closeBtn = this.modal.querySelector('.post-modal-close');
        this.postTag = document.getElementById('postTag');
        this.postDate = document.getElementById('postDate');
        this.postTitle = document.getElementById('postTitle');
        this.postBody = document.getElementById('postBody');
        
        this.bindEvents();
    }

    static bindEvents() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    static open(slug) {
        const post = getPostBySlug(slug);
        if (!post) return;
        
        this.postTag.textContent = post.tag;
        this.postDate.textContent = post.date;
        this.postTitle.textContent = post.title;
        this.postBody.innerHTML = MarkdownParser.parse(post.content);
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    static close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

export function renderPosts() {
    const posts = getAllPosts();
    const grid = document.getElementById('articlesGrid');
    if (!grid) {
        console.error('articlesGrid not found');
        return;
    }
    
    console.log('Rendering', posts.length, 'posts');
    grid.innerHTML = '';
    
    posts.forEach((post, index) => {
        const card = document.createElement('article');
        card.className = 'article-card reveal';
        card.innerHTML = `
            <div class="article-media">
                <canvas id="articleCanvas${index + 1}"></canvas>
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span class="article-tag">${post.tag}</span>
                    <span class="article-date">${post.date}</span>
                </div>
                <h3 class="article-title">${post.title}</h3>
                <p class="article-excerpt">${post.excerpt}</p>
            </div>
        `;
        
        card.addEventListener('click', () => PostModal.open(post.slug));
        
        grid.appendChild(card);
        
        setTimeout(() => {
            const canvas = document.getElementById(`articleCanvas${index + 1}`);
            if (canvas) {
                import('../effects/articleCanvas.js').then(module => {
                    new module.ArticleCanvas(canvas, (index % 3) + 1);
                });
            }
        }, 100);
    });
}