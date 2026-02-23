function loadPage(pageUrl) {
    const container = document.getElementById('content-area');
    console.log('Loading page:', pageUrl);
    fetch(pageUrl)
        .then(response => {
            if (!response.ok) throw new Error('Page not found');
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
        })
        .catch(error => {
            container.innerHTML = "<p>Error loading page.</p>";
            console.error(error);
        });
}