// this fetch help us to print data from HTML components
fetch('./components/stats.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('stats-container').innerHTML = html;
});
