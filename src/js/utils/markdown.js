export class MarkdownParser {
    static parse(markdown) {
        let html = markdown
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
                const language = lang || 'code';
                return `<pre><div class="code-header"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span><span class="code-lang">${language}</span></div><code class="language-${language}">${code.trim()}</code></pre>`;
            })
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
            .replace(/^\- (.*$)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(?!<[hupol]|<ul|<pre)/gm, '<p>');
        
        html = html.replace(/<\/ul>\n<ul>/g, '');
        
        setTimeout(() => {
            if (window.hljs) {
                document.querySelectorAll('.post-body pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
            }
        }, 0);
        
        return html;
    }
}