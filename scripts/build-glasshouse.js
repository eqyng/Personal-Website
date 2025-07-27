const fs = require('fs');
const path = require('path');
const marked = require('marked');

const CONTENT_DIR = 'test-content';
const TEMPLATE_FILE = 'gh-test-article.html';      

function extractMetadata(content) {
    const metadataBlock = content.match(/^---\n([\s\S]*?)\n---\n/);
    if (!metadataBlock) //default values where NO metadata exists
        return { 
            title: 'untitled', 
            date: 'no date', 
            readTime: 'infinity', 
            byline: 'a mysterious article', 
            icon: 'n/a', 
            tags: 'nope', 
            excerpt: 'none here'
        };
    } 
        //default values where SOME metadata exists
        const metadata = metadataBlock[1];
        const data = {};

        metadata.split('\n').forEach
        (line => 
            {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) 
                {
                data[key.trim()] = valueParts.join(':').trim();
                }
            }
        );

        return { //default values where SOME metadata exists
            title: data.title || 'untitled',
            date: data.date || 'no date',
            readTime: data.readTime || 'infinity',
            byline: data.byline || 'a mysterious article',
            icon: data.icon || 'n/a',
            tags: data.tags || 'nope',
            excerpt: data.excerpt || 'none here',
        };

function markdownToHtml(markdown) { //Function to convert markdown to HTML
    return marked.parse(markdown);
}

function generateArticleHtml(article, filename) { // Function to generate article HTML
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

buildGlasshouse();