const main = document.querySelector('main');

window.addEventListener('load', () =>{
    updateNews();
});


const updateNews = () => {
    const url = `http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=489383a1f0a647bc876947861625fa60`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => main.innerHTML = data.articles.map(createArticle).join('\n'));
}

const createArticle = article => {
    return ` 
    <div class="article"
        <a href="${article.url}">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}">
            <p>${article.description}</p>
        </a>
    </div>`;
}