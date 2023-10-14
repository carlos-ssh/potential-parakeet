// this fetch help us to print data from HTML components
fetch('./components/header.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('header-container').innerHTML = html;
});
