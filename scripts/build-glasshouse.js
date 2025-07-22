const fs = require('fs');
const path = require('path');
const marked = require('marked');

const CONTENT_DIR = 'test-content';
const TEMPLATE_FILE = '/gh-test-article.html';      

function extractMetadata(content) {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
    if (!frontmatterMatch) return { title: 'Untitled', date: 'no date', readTime: 'infinity', byline: 'A mysterious article', icon: 'N/A', tags: 'nope', excerpt: 'none here'};
}






/*function extractMetadata(content) {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
    if (!frontmatterMatch) return { title: 'Untitled', date: '', readTime: '5 min read' };
    
    const frontmatter = frontmatterMatch[1];
    const metadata = {};
    
    frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            metadata[key.trim()] = valueParts.join(':').trim();
        }
    });
    
    return {
        title: metadata.title || 'Untitled',
        date: metadata.date || '',
        readTime: metadata.readTime || '5 min read',
        excerpt: metadata.excerpt || '',
        icon: metadata.icon || 'seedling'
    };
}

// Function to convert markdown to HTML
function markdownToHtml(markdown) {
    return marked.parse(markdown);
}

// Function to generate article HTML
function generateArticleHtml(article, filename) {
    const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');
    const htmlContent = markdownToHtml(article.content);
    
    // Replace template placeholders with actual content
    let result = template
        .replace(/<title>.*?<\/title>/, `<title>${article.metadata.title}</title>`)
        .replace(/<h2>.*?<\/h2>/, `<h2>${article.metadata.title}</h2>`)
        .replace(/<div class="gh-body">[\s\S]*?<\/div>/, `<div class="gh-body">${htmlContent}</div>`);
    
    return result;
}

// Main build function
function buildGlasshouse() {
    const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md'));
    
    files.forEach(file => {
        const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
        const metadata = extractMetadata(content);
        const filename = path.basename(file, '.md');
        
        const article = {
            filename,
            metadata,
            content: content.replace(/^---\n[\s\S]*?\n---\n/, '') // Remove frontmatter
        };
        
        // Generate individual article HTML
        const articleHtml = generateArticleHtml(article, filename);
        fs.writeFileSync(`${filename}.html`, articleHtml);
        
        console.log(`Built ${filename}.html`);
    });
}

buildGlasshouse();*/